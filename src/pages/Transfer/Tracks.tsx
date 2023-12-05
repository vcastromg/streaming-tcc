import { useEffect, useState } from "react";
import useTransferStore from "../../data/stores/transferStore";
import { ITrack } from "../../data/types/ITrack";
import { CircularProgress, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import PreviousAndNextButtons from "../../components/molecules/PreviousAndNextButtons";

const Tracks = () => {
  const [vIsLoading, vSetLoading] = useState<boolean>(true)
  const [vTracks, vSetTracks] = useState<ITrack[]>([])
  const [vSelectedTracksIds, vSetSelectedTracksIds] = useState<string[]>([])

  const columns: GridColDef<ITrack>[] = [
    {
      headerName: 'Título',
      field: 'title',
      flex: 1
    },
    {
      headerName: 'Artista(s)',
      field: 'artists',
      flex: 1,
      valueGetter: (params) => params.value.join(', ')
    },
    {
      headerName: 'Álbum',
      field: 'album',
      flex: 1
    },
    {
      headerName: 'Duração',
      field: 'length',
      valueGetter: (params) => {
        if (params.value !== undefined) {
          const vDate = new Date(Date.UTC(0, 0, 0, 0, 0, 0, params.value))
          const vParts = [vDate.getUTCMinutes(), vDate.getUTCSeconds()]
          return vParts.map(s => String(s).padStart(2, '0')).join(':')
        }

        return '-'
      }
    },
  ]

  useEffect(() => {
    const vPlaylistId = useTransferStore.getState().selectedPlaylist?.id
    const vGetTracks = useTransferStore.getState().originService?.getPlaylistTracks
    if (vGetTracks !== undefined) {
      vGetTracks(vPlaylistId!, 0)
        .then(pResult => {
          vSetTracks(pResult.tracks)
          vSetSelectedTracksIds(pResult.tracks.map(track => track.id))
          vSetLoading(false)
        })
    }
  }, [])

  return (
    <>
      <PreviousAndNextButtons
        isDisabled={vIsLoading}
        isNextButtonDisabled={vSelectedTracksIds.length === 0}
        previousAction={() => useTransferStore.getState().setCurrentStep(1)}
        nextAction={() => {
          vSetLoading(true)
          useTransferStore.getState().setSelectedTracks(vTracks.filter(pTrack => vSelectedTracksIds.includes(pTrack.id)))
          useTransferStore.getState().setCurrentStep(3)
        }}
      />
      {vIsLoading ? <CircularProgress/> :
        <>
          <Typography variant="body1" style={{margin: '0 0 1rem'}}>
            {`${vSelectedTracksIds.length} faixas selecionadas`}
          </Typography>
          <DataGrid
            rows={vTracks}
            columns={columns}
            hideFooterPagination
            checkboxSelection
            rowSelectionModel={vSelectedTracksIds}
            onRowSelectionModelChange={(pSelection) => vSetSelectedTracksIds(pSelection as string[])}
          />
        </>
      }
    </>
  )
}

export default Tracks