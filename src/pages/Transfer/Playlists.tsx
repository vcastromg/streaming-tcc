import { useEffect, useState } from "react";
import PlaylistCard from "../../components/atoms/PlaylistCard";
import useTransferStore from "../../data/stores/transferStore";
import { IPlaylist } from "../../data/types/IPlaylist";
import { CircularProgress, Grid } from "@mui/material";
import PreviousAndNextButtons from "../../components/molecules/PreviousAndNextButtons";

const Playlists = () => {
  const [vIsLoading, vSetLoading] = useState<boolean>(true)
  const [vPlaylists, vSetPlaylists] = useState<IPlaylist[]>([])
  useEffect(() => {
    const vGetPlaylists = useTransferStore.getState().originService?.getPlaylists
    if (vGetPlaylists !== undefined) {
      vGetPlaylists()
        .then(pResult => {
          vSetPlaylists(pResult)
          vSetLoading(false)
        })
    }
  }, [])

  return (
    <>
      <PreviousAndNextButtons
        isDisabled={vIsLoading}
        previousAction={() => useTransferStore.getState().setCurrentStep(0)}
      />
      {vIsLoading ? <CircularProgress/> :
        <Grid container spacing={4}>
          {
            vPlaylists.map(cPlaylist => (
              <Grid item xs={12} md={4} xl={4} key={cPlaylist.id}>
                <PlaylistCard
                  {...cPlaylist}
                  onTransfer={() => {
                    useTransferStore.getState().setSelectedPlaylist(cPlaylist)
                    useTransferStore.getState().setCurrentStep(2)
                  }}
                />
              </Grid>
            ))
          }
        </Grid>
      }
    </>
  )
}

export default Playlists