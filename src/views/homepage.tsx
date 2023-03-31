import React from "react";
import { Box, Fade, Typography, Button } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LoginIcon from '@mui/icons-material/Login';

export const Homepage = () => {
  const welcomeTheme = createTheme({
    typography: {
      fontFamily: [
        'Alkatra',
        'cursive',
      ].join(','),
    }
  })


  return (
    
    <Box sx={{display: "flex", height: "100vh", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
      <ThemeProvider theme={welcomeTheme}>
        <Fade in={true} timeout={2000}>
          <Typography variant="h1">
            Welcome
          </Typography>
        </Fade>
        <Fade in={true} timeout={4000}>
          <Button variant="contained" startIcon={<LoginIcon/>}>
            Login
          </Button>
        </Fade>
      </ThemeProvider>
    </Box>
  )
}