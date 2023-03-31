import React, {useState, useEffect} from "react";
import { Box, Fade, Typography, Button } from "@mui/material";
import { ButtonProps } from "@mui/material/Button";
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import LoginIcon from '@mui/icons-material/Login';
import { indigo } from '@mui/material/colors';
import { showHomepageOptions } from "../../types";

export const Homepage: React.FunctionComponent<showHomepageOptions> = ({setShowHomepage}) => {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowLogin(true);
    }, 2000)
  }, [])

  const welcomeTheme = createTheme({
    typography: {
      fontFamily: [
        'Alkatra',
        'cursive',
      ].join(','),
    }
  })

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(indigo[500]),
    borderColor: "white",
    '&:hover': {
      backgroundColor: indigo[800],
      borderColor: "white"
    },
  }));

  function handleLogin() {
    //temporarily set showing the homepage to be false
    setShowHomepage(false);
  }

  return (
    
    <Box sx={{display: "flex", height: "100vh", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
      <Box className="diagonal-hero-bg">
        <Box className="stars">
          <Box className="small"></Box>
          <Box className="medium"></Box>
          <Box className="big"></Box>
        </Box>
      </Box>
      <ThemeProvider theme={welcomeTheme}>
        <Fade in={true} timeout={2000}>
          <Typography variant="h1">
            Welcome
          </Typography>
        </Fade>
        {showLogin ? (
          <Fade in={true} timeout={2000}>
            <ColorButton size="large" variant="outlined" startIcon={<LoginIcon/>} onClick={handleLogin}>
              Login
            </ColorButton>
          </Fade>
        ) : <Fade in={false} ><ColorButton size="large">InvisPlaceholder</ColorButton></Fade>}
      </ThemeProvider>
    </Box>
  )
}