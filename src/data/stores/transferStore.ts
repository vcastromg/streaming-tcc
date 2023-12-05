import { create } from "zustand";
import { IStreamingService } from "../types/IStreamingService";
import { IPlaylist } from "../types/IPlaylist";
import { ITrack } from "../types/ITrack";

interface ITransferStore {
  currentStep: number
  setCurrentStep: (pStep: number) => void

  originService: IStreamingService | null
  setOriginService: (pService: IStreamingService) => void

  destinationService: IStreamingService | null
  setDestinationService: (pService: IStreamingService) => void

  selectedPlaylist: IPlaylist | null
  setSelectedPlaylist: (pPlaylist: IPlaylist) => void

  selectedTracks: ITrack[] | null
  setSelectedTracks: (pPlaylist: ITrack[]) => void
}

const useTransferStore = create<ITransferStore>()((set) => ({
  currentStep: 0,
  setCurrentStep: (pStep) => set((state) => ({
    currentStep: pStep
  })),

  originService: null,
  setOriginService: (pService) => set((state) => ({
    originService: pService
  })),

  destinationService: null,
  setDestinationService: (pService) => set((state) => ({
    destinationService: pService
  })),

  selectedPlaylist: null,
  setSelectedPlaylist: (pService) => set((state) => ({
    selectedPlaylist: pService
  })),

  selectedTracks: null,
  setSelectedTracks: (pService) => set((state) => ({
    selectedTracks: pService
  })),
}))

export default useTransferStore
