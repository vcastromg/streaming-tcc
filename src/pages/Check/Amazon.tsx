import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import amazonService from "../../data/services/amazonService";


const Amazon = () => {
  const vNavigate = useNavigate()
  const [searchParams, _] = useSearchParams();

  useEffect(() => {
    const vCode: string | null = searchParams.get('code')
    if (vCode !== null) {
      amazonService.login(vCode)
        .then(() => {
          // void message.info('Amazon Music conectada')
          vNavigate('/transfer')
        })
        .catch(() => {
          // void message.info('Erro ao conectar Amazon Music :(')
        })
    }
  }, [])

  return (
    <>
      Eitaaa
    </>
  )
}

export default Amazon
