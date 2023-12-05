// import {Button} from "antd";
import transferStore from "../../data/stores/transferStore";
import useTransferStore from "../../data/stores/transferStore";
import { IStreamingService } from "../../data/types/IStreamingService";
import { Typography } from "@mui/material";
import PreviousAndNextButtons from "../../components/molecules/PreviousAndNextButtons";
import ServicesCards from "../../components/molecules/ServicesCards";


const DestinationService = () => {
  const vSetDestinationService = (pService: IStreamingService) => {
    transferStore.getState().setDestinationService(pService)
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <PreviousAndNextButtons
        previousAction={() => useTransferStore.getState().setCurrentStep(2)}
      />
      <Typography variant="h6" component="p" style={{marginBottom: '1rem'}}>Para onde as faixas serão
        transferidas?</Typography>
      <ServicesCards isSelectingOriginService={false}/>
      {/*<Button*/}
      {/*  onClick={() => {*/}
      {/*    vSetDestinationService(deezerService)*/}
      {/*    useTransferStore.getState().setCurrentStep(4)*/}
      {/*  }}*/}
      {/*  style={{boxShadow: '0px 0px 25px 0px rgba(255, 0, 0, 0.5)', margin: '2rem 0', minWidth: '8rem'}}*/}
      {/*>*/}
      {/*  Deezer*/}
      {/*</Button>*/}
      {/*<Button*/}
      {/*  onClick={() => {*/}
      {/*    vSetDestinationService(spotifyService)*/}
      {/*    useTransferStore.getState().setCurrentStep(1)*/}
      {/*  }}*/}
      {/*  style={{boxShadow: '0px 0px 25px 0px rgba(29,185,84,0.5)', margin: '2rem 0', minWidth: '8rem'}}*/}
      {/*>*/}
      {/*  Spotify*/}
      {/*</Button>*/}
    </div>
  )
}

export default DestinationService