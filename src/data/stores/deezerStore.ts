import { create } from "zustand";
import { persist } from 'zustand/middleware'

interface IDeezerStore {
  isAuthenticated: boolean
  validUntil: number | null
  token: string
  checkIfItIsAuthenticated: () => boolean
  setAuthenticated: (token: string, validUntil: number) => void
  logout: () => void
}

const useDeezerStore = create<IDeezerStore>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      token: '',
      validUntil: null,
      checkIfItIsAuthenticated: () => {
        return get().isAuthenticated
      },
      setAuthenticated: (token, validUntil) => set((state) => ({
        token: token, validUntil: validUntil, isAuthenticated: true
      })),
      logout: () => set(() => ({
        token: '', isAuthenticated: false, validUntil: null
      }))
    }),
    {
      name: 'deezer-store'
    }
  )
)

export default useDeezerStore
