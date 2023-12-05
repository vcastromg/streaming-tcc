import React from 'react';
import { GitHub } from "@mui/icons-material";
import { Box, Button } from '@mui/material';

const Footer = () =>
  <Box display="flex" justifyContent="center">
    <Button variant="text" size="small" href="https://github.com/vcastromg/streaming-tcc" target="_blank">
      <GitHub sx={{marginRight: '.5rem', fontSize: '1rem'}}/>
      Streaming TCC
    </Button>
  </Box>

export default Footer;