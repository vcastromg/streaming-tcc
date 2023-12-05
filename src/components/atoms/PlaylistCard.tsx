import { Box, Button, Card, CardHeader, CardMedia, Typography } from "@mui/material";
import { IPlaylist } from "../../data/types/IPlaylist";

interface IProps extends IPlaylist {
  onTransfer: () => void
}

const PlaylistCard = (pProps: IProps) => (
  <Card sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
    <CardHeader
      title={pProps.title}
      sx={{flex: 1, alignItems: 'start'}}
      // subheader={`${pProps.howManyTracks} faixas`}
    />
    <CardMedia
      sx={{
        height: {xs: '20rem', md: '12rem'},
        backgroundSize: 'contain',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative'
      }}
      image={pProps.imageUrl ?? ''}
    />
    <Box display="flex" justifyContent="end" alignItems="center" padding="1rem">
      <Typography component="span">{`${pProps.howManyTracks} faixas`}</Typography>
      <Button
        variant="contained"
        onClick={pProps.onTransfer} style={{marginLeft: '1rem'}}
      >
        Transferir
      </Button>
    </Box>
  </Card>
)

export default PlaylistCard