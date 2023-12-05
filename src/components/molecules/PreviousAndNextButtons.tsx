import { Box, Button } from "@mui/material";

interface IProps {
  isDisabled?: boolean
  isNextButtonDisabled?: boolean
  previousAction?: () => void
  nextAction?: () => void
}

const PreviousAndNextButtons = (pProps: IProps) => (
  <Box sx={{margin: '2rem 0'}}>
    {
      pProps.previousAction && (
        <Button
          disabled={pProps.isDisabled}
          variant="outlined"
          onClick={pProps.previousAction}
          sx={{marginRight: 2}}
        >
          Anterior
        </Button>
      )
    }
    {
      pProps.nextAction && (
        <Button
          disabled={pProps.isDisabled || pProps.isNextButtonDisabled}
          variant="contained"
          onClick={pProps.nextAction}
        >
          Próximo
        </Button>
      )
    }
  </Box>
)

export default PreviousAndNextButtons