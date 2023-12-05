import React, { useEffect, useRef, useState } from 'react';
import { Outlet } from "react-router-dom";
import useThemeStore from "./data/stores/themeStore";
import { Container, Stack } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from "./components/molecules/Header";
import { brown, lightBlue } from "@mui/material/colors";
import { SnackbarProvider } from "notistack";

// @ts-ignore
import FOG from 'vanta/src/vanta.fog'
import Footer from "./components/molecules/Footer";

const App = () => {
  const vIsDark = useThemeStore(state => state.isDark)

  const [vVantaEffect, vSetVantaEffect] = useState(null)
  const vRef = useRef(null)

  const darkTheme = createTheme({
    palette: {
      primary: brown,
      secondary: lightBlue,
      mode: vIsDark ? 'dark' : 'light',
    },
    typography: {
      fontFamily: [
        'Lato', 'monospace'
      ].join(','),
    },
  });

  useEffect(() => {
    let vColors

    if (vIsDark) {
      vColors = {
        highlightColor: '#3f3331',
        midtoneColor: '#382722',
        lowlightColor: '#110c0a',
        baseColor: '#211613',
      }
    } else {
      vColors = {
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        highlightColor: '#ffffff',
        midtoneColor: '#f2f2f2',
        lowlightColor: '#000',
        baseColor: '#ededed',
        blurFactor: 0.42,
        speed: 0.10,
        zoom: 0.30
      }
    }

    vSetVantaEffect(
      FOG({
        el: vRef.current,
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        blurFactor: 0.51,
        speed: 0.10,
        zoom: 0.30,
        ...vColors
      })
    )

    return () => {
      if (vVantaEffect !== null) {
        // @ts-ignore
        vVantaEffect.destroy()
      }
    }
  }, [vIsDark, vVantaEffect])

  return (
    <ThemeProvider theme={darkTheme}>
      <div ref={vRef} style={{height: '100%', position: 'fixed', width: '100%', zIndex: -1}}>
      </div>
      <SnackbarProvider anchorOrigin={{vertical: 'top', horizontal: 'center'}} style={{marginTop: 72}}/>
      <CssBaseline/>
      <Stack sx={{height: '100%'}}>
        <Header/>
        <Container sx={{flex: 1}}>
          <Outlet/>
        </Container>
        <Footer />
      </Stack>
    </ThemeProvider>
  );
}

export default App;
