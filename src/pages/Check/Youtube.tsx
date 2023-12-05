import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import youtubeService from "../../data/services/youtubeService";
import { Card, Modal } from "@mui/material";
import AuthenticatingModal from "../../components/atoms/AuthenticatingModal";

const Youtube = () => {
  const [searchParams, _] = useSearchParams();
  const [vIsLoading, vSetLoading] = useState<boolean>(true)
  const [vIsThereAnyError, vSetError] = useState<boolean>(false)

  useEffect(() => {
    window.location.href = window.location.href.replace('#', '?')
    const vToken: string | null = searchParams.get('access_token')

    if (vToken !== null) {
      youtubeService.login(vToken)
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

export default Youtube
