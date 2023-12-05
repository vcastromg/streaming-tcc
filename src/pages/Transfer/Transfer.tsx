// import {Steps} from "antd"
import useTransferStore from "../../data/stores/transferStore";
import OriginService from "./OriginService";
import Playlists from "./Playlists";
import Tracks from "./Tracks";
import DestinationService from "./DestinationService";
import TransferProgress from "./TransferProgress";
import { Step, StepLabel, Stepper } from "@mui/material";

const Transfer = () => {
  const vCurrentStep = useTransferStore(state => state.currentStep)
  const vOriginServiceName = useTransferStore(state => state.originService?.title)
  const vSelectedPlaylistName = useTransferStore(state => state.selectedPlaylist?.title)
  const vTracksQuantity = useTransferStore(state => state.selectedTracks)?.length
  const vDestinationServiceName = useTransferStore(state => state.destinationService?.title)
  const vSteps = [
    {
      title: 'Origem',
      description: vOriginServiceName
    },
    {
      title: 'Playlist',
      description: vSelectedPlaylistName
    },
    {
      title: 'Músicas',
      description: vTracksQuantity ? `${vTracksQuantity} faixas` : null
    },
    {
      title: 'Destino',
      description: vDestinationServiceName
    },
    {
      title: 'Transferir'
    },
  ]
  return (
    <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <Stepper
        activeStep={vCurrentStep}
        sx={{marginTop: 8}}
      >
        {vSteps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.title}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div style={{margin: '0 2rem', width: '100%'}}>
        {vCurrentStep === 0 && <OriginService/>}
        {vCurrentStep === 1 && <Playlists/>}
        {vCurrentStep === 2 && <Tracks/>}
        {vCurrentStep === 3 && <DestinationService/>}
        {vCurrentStep === 4 && <TransferProgress/>}
      </div>
    </div>
  )
}

export default Transfer