import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import deezerService from "../../data/services/deezerService";
import { Card, Modal } from "@mui/material";
import AuthenticatingModal from "../../components/atoms/AuthenticatingModal";

const Deezer = () => {
  const [searchParams, _] = useSearchParams();
  const [vIsLoading, vSetLoading] = useState<boolean>(true)
  const [vIsThereAnyError, vSetError] = useState<boolean>(false)

  useEffect(() => {
    const vCode: string | null = searchParams.get('code')
    if (vCode !== null) {
      deezerService.login(vCode)
        .catch(e => {
          vSetError(true)
          console.error(e)
        })
        .finally(() => {
          window.close() // this may fail
          vSetLoading(false)
        })
    }
  }, [searchParams])

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
          <AuthenticatingModal isLoading={vIsLoading} isThereAnyError={vIsThereAnyError}/>
        </Card>
      </Modal>
    </>
  )
}

export default Deezer
