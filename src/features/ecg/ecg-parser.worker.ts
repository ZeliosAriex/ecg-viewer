import Papa from 'papaparse'

const parseEcgData = (url: string) => {
  Papa.parse(url, {
    download: true,
    dynamicTyping: true, // Converts numeric and boolean data to their type
    fastMode: true,
    header: true, // First row of parsed data will be interpreted as field names
    delimiter: '', // Auto-detects delimiter
    skipEmptyLines: true,
    chunkSize: 1024 * 82, // Sets chunk size to 82 KB
    worker: true, // Enables web worker

    step: (results) => {
      // Posting each row of parsed data back to main thread
      self.postMessage(results)
    },

    complete: ({ meta }) => {
      // Posting metadata once parsing is complete
      self.postMessage(meta)

      // Closing the worker after parsing is complete
      self.close()
    },
  })
}

self.onmessage = (e: MessageEvent) => {
  if (typeof e.data === 'string' && e.data.trim() !== '') {
    // Ensuring received data is string (url)
    parseEcgData(e.data)
  } else {
    // Posting error back if received data is not as expected
    self.postMessage({ error: 'Invalid data received by worker' })
  }
}

export {}
