import { Box, Grid } from "@mui/material";
import ServiceCard from "../atoms/ServiceCard";
import { IStreamingService } from "../../data/types/IStreamingService";
import transferStore from "../../data/stores/transferStore";
import useTransferStore from "../../data/stores/transferStore";
import spotifyService from "../../data/services/spotifyService";
import amazonService from "../../data/services/amazonService";
import deezerService from "../../data/services/deezerService";
import streamingServicesAuthUrl from "../../utils/streamingServicesAuthUrl";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import useSpotifyStore from "../../data/stores/spotifyStore";
import useDeezerStore from "../../data/stores/deezerStore";
import deezerStore from "../../data/stores/deezerStore";
import youtubeService from "../../data/services/youtubeService";
import useYoutubeStore from "../../data/stores/youtubeStore";
import youtubeStore from "../../data/stores/youtubeStore";

interface IProps {
  isSelectingOriginService: boolean
}

// @ts-ignore
window.loginCallback = () =>
  enqueueSnackbar('That was easy!', {
    variant: "success"
  })

const ServicesCards = (pProps: IProps) => {
  const vUpdateSpotifyStore = () => {
    useSpotifyStore.persist.rehydrate();
    useDeezerStore.persist.rehydrate();
    useYoutubeStore.persist.rehydrate();
  };

  const vSetOriginService = (pService: IStreamingService) => {
    transferStore.getState().setOriginService(pService)
  }

  const vSetDestinationService = (pService: IStreamingService) => {
    transferStore.getState().setDestinationService(pService)
  }

  const vIsSpotifyLoggedIn = useSpotifyStore(state => state.isAuthenticated)
  const vIsDeezerLoggedIn = useDeezerStore(state => state.isAuthenticated)
  const vIsYoutubeLoggedIn = useYoutubeStore(state => state.isAuthenticated)
  const [vIsAmazonLoggedIn, vSetAmazonLoggedIn] = useState(false)

  useEffect(() => {
    document.addEventListener("visibilitychange", vUpdateSpotifyStore);
    window.addEventListener("focus", vUpdateSpotifyStore);
    return () => {
      document.removeEventListener("visibilitychange", vUpdateSpotifyStore);
      window.removeEventListener("focus", vUpdateSpotifyStore);
    };
  }, []);

  return (
    <Box sx={{width: '100%'}}>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={4}>
          <ServiceCard
            name="Spotify"
            enabled
            color="rgb(164 227 176 / 12%)"
            isLoggedIn={vIsSpotifyLoggedIn}
            messageCloseToButtons={""}
            onSelect={() => {
              if (pProps.isSelectingOriginService) {
                if (vIsSpotifyLoggedIn) {
                  vSetOriginService(spotifyService)
                  useTransferStore.getState().setCurrentStep(1)
                } else {
                  window.open(streamingServicesAuthUrl.SPOTIFY)
                }
              } else {
                if (vIsSpotifyLoggedIn) {
                  vSetDestinationService(spotifyService)
                  useTransferStore.getState().setCurrentStep(4)
                } else {
                  // @ts-ignore
                  window.open(streamingServicesAuthUrl.SPOTIFY)
                }
              }
            }}
            onLogout={() => useSpotifyStore.getState().logout()}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <ServiceCard
            name="Deezer"
            enabled
            color="#ff009230"
            isLoggedIn={vIsDeezerLoggedIn}
            onSelect={() => {
              if (pProps.isSelectingOriginService) {
                if (vIsDeezerLoggedIn) {
                  vSetOriginService(deezerService)
                  useTransferStore.getState().setCurrentStep(1)
                } else {
                  window.open(streamingServicesAuthUrl.DEEZER)
                }
              } else {
                if (vIsDeezerLoggedIn) {
                  vSetDestinationService(deezerService)
                  useTransferStore.getState().setCurrentStep(4)
                } else {
                  window.open(streamingServicesAuthUrl.DEEZER)
                }
              }
            }}
            onLogout={() => deezerStore.getState().logout()}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <ServiceCard
            name="Amazon"
            enabled={false}
            color="#81a1d633"
            isLoggedIn={vIsAmazonLoggedIn}
            messageCloseToButtons="Indisponível"
            onSelect={() => {
              if (pProps.isSelectingOriginService) {
                if (vIsAmazonLoggedIn) {
                  vSetOriginService(amazonService)
                  useTransferStore.getState().setCurrentStep(1)
                } else {
                  window.open(streamingServicesAuthUrl.AMAZON)
                }
              } else {
                if (vIsAmazonLoggedIn) {
                  vSetDestinationService(amazonService)
                  useTransferStore.getState().setCurrentStep(4)
                } else {
                  window.open(streamingServicesAuthUrl.AMAZON)
                }
              }
            }}
            onLogout={() => {
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <ServiceCard
            name="YouTube"
            enabled
            color="#FF000033"
            isLoggedIn={vIsYoutubeLoggedIn}
            onSelect={() => {
              if (pProps.isSelectingOriginService) {
                if (vIsYoutubeLoggedIn) {
                  vSetOriginService(youtubeService)
                  useTransferStore.getState().setCurrentStep(1)
                } else {
                  window.open(streamingServicesAuthUrl.YOUTUBE)
                }
              } else {
                if (vIsYoutubeLoggedIn) {
                  vSetDestinationService(youtubeService)
                  useTransferStore.getState().setCurrentStep(4)
                } else {
                  window.open(streamingServicesAuthUrl.YOUTUBE)
                }
              }
            }}
            onLogout={() => youtubeStore.getState().logout()}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default ServicesCards