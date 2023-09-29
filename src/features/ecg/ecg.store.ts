import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { type Domain, type EcgData } from '@/features/ecg/ecg.types.ts'

interface EcgState {
  loading: boolean
  data: EcgData[]
  domain: Domain
  domainStep: number
}

interface EcgActions {
  setLoading: (loading: EcgState['loading']) => void
  setData: (data: EcgState['data']) => void
  nextDomain: () => void
  prevDomain: () => void
}

type StateAndActions = EcgState & EcgActions

const initialState: EcgState = {
  loading: false,
  data: [],
  domain: [0, 10],
  domainStep: 10,
}

const useEcgStore = create(
  immer<StateAndActions>((set, get) => ({
    ...initialState,

    setLoading: (loading) => {
      set({ loading })
    },

    setData: (data) => {
      set({ data })
    },

    nextDomain: () => {
      const { domain: currentDomain, domainStep: step } = get()
      const newDomain: Domain = [
        currentDomain[0] + step,
        currentDomain[1] + step,
      ]
      set({ domain: newDomain })
    },

    prevDomain: () => {
      const { domain: currentDomain, domainStep: step } = get()
      const newDomain: Domain = [
        currentDomain[0] - step,
        currentDomain[1] - step,
      ]

      // Validate that the new domain does not go below 0.
      if (newDomain[0] >= 0) {
        set({ domain: newDomain })
      }
    },
  })),
)

export default useEcgStore
