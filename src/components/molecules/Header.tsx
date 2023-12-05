import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { AppBar, Box, Button, Container, IconButton, Menu, Stack, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import useThemeStore from "../../data/stores/themeStore";
import { DarkMode, LightMode } from "@mui/icons-material";

interface IHeaderRoute {
  label: string;
  path: string;
}

const mHeaderRoutes = {
  home: {
    label: 'Início',
    path: '/',
  },
  transfer: {
    label: 'Transferir',
    path: '/transfer',
  },
  manage: {
    label: 'Gerenciar',
    path: '/manage',
  }
}

const mGetRoutesArray = (): IHeaderRoute[] => {
  const vKeys = Object.keys(mHeaderRoutes);
  return vKeys.map(key => {
    // @ts-ignore
    const vRoute: IHeaderRoute = mHeaderRoutes[key];
    return {
      label: vRoute.label,
      path: vRoute.path,
    }
  });
}

const Header = () => {
  const vIsDark = useThemeStore(state => state.isDark)
  const vSetDark = useThemeStore(state => state.setDark)

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const vNavigate = useNavigate()

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters style={{justifyContent: 'space-between'}}>
            <Typography
              variant="h4"
              noWrap
              component="h1"
              sx={{
                letterSpacing: {
                  xs: 2,
                  sm: 4,
                  md: 6
                },
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                fontWeight: 'bolder',
                fontSize: {
                  xs: 24,
                  sm: 36,
                  md: 48
                }
              }}
            >
              Streaming TCC
            </Typography>
            <Typography
              variant="caption"
              noWrap
              sx={{
                letterSpacing: {
                  xs: 2,
                  sm: 4,
                  md: 6
                },
                position: 'absolute',
                left: '50%',
                bottom: 0,
                transform: 'translateX(-50%)',
                fontWeight: 'bolder'
              }}
            >
              BETA
            </Typography>
            <Box sx={{display: {xs: 'flex', md: 'none'}}}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: {xs: 'block', md: 'none'},
                }}
              >
                {mGetRoutesArray().map((page, index) => (
                  <MenuItem key={index} onClick={() => {
                    vNavigate(page.path)
                    handleCloseNavMenu()
                  }}>
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
              {mGetRoutesArray().map((page, index) => (
                <Button
                  key={index}
                  onClick={() => vNavigate(page.path)}
                  sx={{my: 2, color: 'white', display: 'block'}}
                >
                  {page.label}
                </Button>
              ))}
            </Box>
            <Stack direction="row" spacing={1}>
              <IconButton onClick={() => vSetDark(!vIsDark)} title={vIsDark ? 'Modo claro' : 'Modo escuro'}>
                {vIsDark ? <DarkMode/> : <LightMode/>}
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

export default Header;