import { create } from "zustand";
import { persist } from 'zustand/middleware'

interface IThemeStore {
  isDark: boolean
  setDark: (pValue: boolean) => void
  fontSize: number
  setFontSize: (pValue: number) => void
}

const useThemeStore = create<IThemeStore>()(
  persist(
    (set) => ({
      isDark: true,
      setDark: (pValue) => set((state) => ({
        isDark: pValue
      })),
      fontSize: 16,
      setFontSize: (pValue) => set((state) => ({
        fontSize: pValue
      })),
    }),
    {
      name: 'theme-store'
    }
  )
)

export default useThemeStore
