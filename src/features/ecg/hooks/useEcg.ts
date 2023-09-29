import { useCallback, useEffect, useRef } from 'react'

import { FILE_DATA_PATH } from '@/config'
import useEcgStore from '@/features/ecg/ecg.store.ts'
import {
  type Domain,
  type EcgData,
  type ParsedEcgData,
} from '@/features/ecg/ecg.types.ts'

const useEcg = () => {
  // References to the current domain data, data setter, and domain manipulation functions
  const { data, domain, setData, loading, setLoading, nextDomain, prevDomain } =
    useEcgStore()

  // Reference to the current Worker instance to enable its termination when needed
  const workerRef = useRef<Worker | null>(null)

  // Function to terminate the current worker, if exists
  const terminateWorker = useCallback(() => {
    if (workerRef.current != null) {
      workerRef.current.terminate()
      workerRef.current = null
    }
  }, [])

  // Wrapper for nextDomain function, terminating the worker before calling nextDomain
  const wrappedNextDomain = useCallback(() => {
    terminateWorker()
    nextDomain()
  }, [terminateWorker, nextDomain])

  // Wrapper for prevDomain function, terminating the worker before calling prevDomain
  const wrappedPrevDomain = useCallback(() => {
    terminateWorker()
    prevDomain()
  }, [terminateWorker, prevDomain])

  const parseEcgData = useCallback(
    ({ selectedDomain }: { selectedDomain: Domain }) => {
      // Before initializing a new worker, existing worker is terminated
      terminateWorker()
      const cacheData: EcgData[] = []

      // Initializing a Web Worker to parse ECG Data
      const worker = new Worker(
        new URL('../ecg-parser.worker.ts', import.meta.url),
        { type: 'module' },
      )

      // Storing reference to the current worker
      workerRef.current = worker
      setLoading(true)
      worker.postMessage(FILE_DATA_PATH)

      // Handle messages from the worker, process data and terminate worker when needed
      worker.onmessage = (event) => {
        try {
          const receivedData = event.data.data as ParsedEcgData
          const [domainStart, domainEnd] = selectedDomain
          const timestamp = receivedData.Time
          // If timestamp is beyond domainEnd, finalize the process and terminate the worker
          if (timestamp >= domainEnd) {
            setData(cacheData)
            setLoading(false)
            terminateWorker()
          }
          // If timestamp is within selectedDomain, add data to cacheData
          if (timestamp >= domainStart && timestamp < domainEnd) {
            cacheData.push({
              time: receivedData.Time,
              value: receivedData['1'],
            })
          }
        } catch (error) {
          console.error('Error processing worker data:', error)
          setLoading(false)
          terminateWorker()
        }
      }

      // Handling errors from the worker and terminate it
      worker.onerror = (error) => {
        console.error('Worker Error:', error)
        setLoading(false)
        terminateWorker()
      }
    },
    [domain, setData, setLoading, terminateWorker],
  )

  // Effect to trigger parseEcgData and cleanup afterward
  useEffect(() => {
    parseEcgData({ selectedDomain: domain })
    return () => {
      // Ensure to terminate worker on component unmount or when dependencies change
      terminateWorker()
    }
  }, [parseEcgData, domain, terminateWorker])

  return {
    loading,
    data,
    domain,
    nextDomain: wrappedNextDomain,
    prevDomain: wrappedPrevDomain,
  }
}

export default useEcg
