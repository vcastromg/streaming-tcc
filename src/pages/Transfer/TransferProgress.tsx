import { useEffect, useState } from "react";
import useTransferStore from "../../data/stores/transferStore";
import { IPlaylist } from "../../data/types/IPlaylist";
import { Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Typography } from "@mui/material";


const TransferProgress = () => {
  const [vIds, vSetIds] = useState<string[]>([])
  const [vRetrievedSongsIdsQuantity, vSetRetrievedSongsIdsQuantity] = useState<number>(0)
  const [vIsRetrievingTrackIds, vSetRetrievingTrackIds] = useState<boolean>(true)
  const [vIsCreatingNewPlaylist, vSetCreatingNewPlaylist] = useState<boolean>(false)
  const [vIsAddingTracks, vSetAddingTracks] = useState<boolean>(false)
  const [vIsRecoveringPlaylist, vSetRecoveringPlaylist] = useState<boolean>(false)
  const [vIsItDone, vSetItDone] = useState<boolean>(false)

  const [vNewPlaylist, vSetNewPlaylist] = useState<IPlaylist | null>(null)
  const vSelectedTracks = useTransferStore.getState().selectedTracks

  const vCalculateProgressPercentage = (): number => {
    if (vIsRetrievingTrackIds) {
      return Number((vRetrievedSongsIdsQuantity / vSelectedTracks!.length * (1 / 3) * 100).toFixed(0))
    }
    if (vIsCreatingNewPlaylist) {
      return 33
    }
    if (vIsAddingTracks) {
      return 66
    }
    if (vIsRecoveringPlaylist) {
      return 99
    }
    if (vIsItDone) {
      return 100
    }

    return 0
  }

  const vAddIdToState = (pId: string) => {
    const vNewIds = vIds
    vNewIds.push(pId)
    vSetIds(vNewIds)
    vSetRetrievedSongsIdsQuantity(vNewIds.length)
  }

  useEffect(() => {
    const vTransfer = async () => {
      for (let cTrack of vSelectedTracks!) {
        if (cTrack.isrc) {
          await useTransferStore.getState().destinationService?.getInternalSongId(cTrack.isrc)
            .then(pResult => {
              if (pResult !== null) {
                vAddIdToState(pResult)
              }
            })
        }
      }

      vSetRetrievingTrackIds(false)
      vSetCreatingNewPlaylist(true)

      const vPlaylistName = useTransferStore.getState().selectedPlaylist?.title
      const vNewPlaylistResponse = await useTransferStore.getState().destinationService?.createNewPlaylist(vPlaylistName!)

      vSetCreatingNewPlaylist(false)
      vSetAddingTracks(true)

      await useTransferStore.getState().destinationService?.addTracksToPlaylist(vNewPlaylistResponse!, vIds)

      vSetAddingTracks(false)
      vSetRecoveringPlaylist(true)

      const vPlaylistResponse = await useTransferStore.getState().destinationService?.getPlaylistById(vNewPlaylistResponse!)
      vSetNewPlaylist(vPlaylistResponse!)

      vSetRecoveringPlaylist(false)
      vSetItDone(true)

    }
    void vTransfer()
  }, [])

  return (
    <div style={{marginTop: '3rem'}}>
      {/*<Button onClick={() => useTransferStore.getState().setCurrentStep(3)}>Retornar</Button>*/}
      <div style={{display: 'flex', alignItems: 'center', justifyContent: "center"}}>
        Recuperar faixas no serviço
        destino {`${vRetrievedSongsIdsQuantity}/${vSelectedTracks?.length}`}
        {vIsRetrievingTrackIds && <CircularProgress style={{marginLeft: '1rem'}} size={20}/>}
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: "center"}}>
        Criar nova playlist {vIsCreatingNewPlaylist && <CircularProgress style={{marginLeft: '1rem'}} size={20}/>}
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: "center"}}>
        Adicionar músicas
        recuperadas {vIsAddingTracks && `${vRetrievedSongsIdsQuantity}/${vIds.length}`} {vIsAddingTracks &&
          <CircularProgress style={{marginLeft: '1rem'}} size={20}/>}
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: "center", flexDirection: 'column'}}>
        <CircularProgress color={vNewPlaylist ? "success" : "secondary"} variant="determinate"
                          value={vCalculateProgressPercentage()} style={{marginTop: '3rem'}} size={80}/>
        {
          vNewPlaylist &&
            <Card
              // bordered={false}
                title={vNewPlaylist.title}
              // cover={<img alt={vNewPlaylist.title ?? ''} src={vNewPlaylist.imageUrl ?? ''} />}
                style={{margin: '3rem 0', width: '20rem'}}
            >
                <CardMedia
                    sx={{height: '20rem'}}
                    image={vNewPlaylist.imageUrl}
                    title={vNewPlaylist.title}
                />
                <CardContent>
                    <Typography variant="h5" component="div">{vNewPlaylist.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`${vNewPlaylist.howManyTracks} faixas`}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button href={vNewPlaylist.url} style={{marginLeft: '1rem'}}>Ver playlist
                        no {useTransferStore.getState().destinationService?.title}</Button>
                </CardActions>
            </Card>
        }
      </div>
    </div>
  )
}

export default TransferProgress