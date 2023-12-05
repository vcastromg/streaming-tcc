import { Box, Button, Card, CardHeader, Typography } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface IProps {
  name: string
  logo?: string
  color: string
  isLoggedIn: boolean
  onSelect: () => void
  enabled: boolean
  onLogout: () => void
  messageCloseToButtons?: string
}

const ServiceCard = (pProps: IProps) => (
  <Card sx={{display: 'flex', flexDirection: 'column', height: '100%', background: pProps.color, width: '100%'}}>
    <CardHeader
      title={pProps.name}
      subheader={pProps.isLoggedIn ?
        <div style={{display: 'flex', alignItems: 'center'}}>Conectado <CheckCircleOutlineIcon style={{marginLeft: 4}}/>
        </div> : 'Desconectado'}
    />
    <Box display="flex" justifyContent="end" alignItems="center" padding="1rem">
      {
        pProps.isLoggedIn &&
          <Button variant="text" size="small" onClick={pProps.onLogout}>Desconectar</Button>
      }
      {
        <Typography>{pProps.messageCloseToButtons}</Typography>
      }
      <Button
        variant="contained"
        onClick={pProps.onSelect}
        style={{marginLeft: '1rem'}}
        disabled={!pProps.enabled}
      >
        {pProps.isLoggedIn ? 'Escolher' : 'Login'}
      </Button>
    </Box>
  </Card>
)

export default ServiceCard