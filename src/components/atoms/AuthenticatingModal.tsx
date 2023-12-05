import { Card, CircularProgress, Modal, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Error } from "@mui/icons-material";

interface IProps {
  isLoading: boolean
  isThereAnyError: boolean
}

const AuthenticatingModal = (pProps: IProps) => {
  let vContent
  if (pProps.isLoading) {
    vContent =
      <>
        <CircularProgress/>
        <Typography variant="h6" component="h2">
          Autenticando
        </Typography>
        <Typography>
          Só mais um momento...
        </Typography>
      </>
  } else if (pProps.isThereAnyError) {
    vContent =
      <>
        <Error fontSize="large" color="warning"/>
        <Typography variant="h6" component="h2">
          Ocorreu um erro
        </Typography>
        <Typography>
          Você pode fechar essa aba e tentar novamente
        </Typography>
      </>
  } else {
    vContent =
      <>
        <CheckCircleIcon fontSize="large" color="success"/>
        <Typography variant="h6" component="h2">
          Tudo certo
        </Typography>
        <Typography>
          Você pode fechar essa aba
        </Typography>
      </>
  }

  return (
    <>
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          padding: '2rem'
        }}>
          {vContent}
        </Card>
      </Modal>
    </>
  )
}

export default AuthenticatingModal