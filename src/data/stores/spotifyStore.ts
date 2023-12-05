import { create } from "zustand";
import { persist } from 'zustand/middleware'
import moment from "moment";

interface ISpotifyStore {
  isAuthenticated: boolean
  validUntil: string | null
  token: string
  refreshToken: string
  checkIfItIsAuthenticated: () => boolean
  setAuthenticated: (token: string, refreshToken: string, validUntil: string) => void
  logout: () => void
}

const useSpotifyStore = create<ISpotifyStore>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      token: '',
      refreshToken: '',
      validUntil: null,
      checkIfItIsAuthenticated: () => {
        const vValidUntil = get().validUntil
        const vIsValid = vValidUntil != null && moment().toISOString() < vValidUntil
        if (!vIsValid) {
          set(() => ({
            isAuthenticated: false
          }))
        }

        return vIsValid
      },
      setAuthenticated: (token, refreshToken, validUntil) => set((state) => ({
        token: token, refreshToken: refreshToken, validUntil: validUntil, isAuthenticated: true
      })),
      logout: () => set(() => ({
        token: '', refreshToken: '', isAuthenticated: false, validUntil: null
      }))
    }),
    {
      name: 'spotify-store'
    }
  )
)

export default useSpotifyStore
