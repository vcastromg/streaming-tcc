import { create } from "zustand";
import { persist } from 'zustand/middleware'

interface IYoutubeStore {
  isAuthenticated: boolean
  validUntil: number | null
  token: string
  checkIfItIsAuthenticated: () => boolean
  setAuthenticated: (token: string, validUntil: number) => void
  logout: () => void
}

const useYoutubeStore = create<IYoutubeStore>()(
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
      name: 'youtube-store'
    }
  )
)

export default useYoutubeStore
