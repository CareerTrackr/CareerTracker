import React, { useState, useEffect } from 'react';
import { Box, Fade, Typography, Button } from '@mui/material';
import { ButtonProps } from '@mui/material/Button';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import LoginIcon from '@mui/icons-material/Login';
import { indigo } from '@mui/material/colors';
import { ShowHomepageOptions } from '../../types';

export default function Homepage({
  setShowHomepage,
}: ShowHomepageOptions): JSX.Element {
  const [showLogin, setShowLogin] = useState(false);

  const shortQuotes = [
    "'The secret of getting ahead is getting started.' - Mark Twain",
    "'The best time to plant a tree was 20 years ago. The second best time is now.' - Chinese Proverb",
    "'It's hard to beat a person who never gives up.' - Babe Ruth",
    "'I believe in you.' - Matthew Xing",
    "'Whatever you are, be a good one.' - Abraham Lincoln",
    "'Your passion is waiting for your courage to catch up.' - Isabelle Lafleche",
    "'If you’re offered a seat on a rocket ship, don’t ask what seat! Just get on.' - Sheryl Sandberg",
    "'How wonderful it is that nobody need wait a single moment before starting to improve the world.' - Anne Frank",
    "'Great things are done by a series of small things brought together.' - Vincent Van Gogh",
    "'You can waste your lives drawing lines. Or you can live your life crossing them.' - Shonda Rhimes",
    "'If opportunity doesn’t knock, build a door.' - Kurt Cobain",
    "'Life is like a chess move - make your next move your very best.' - Matt Matias",
    "'Never stop doing your best just because someone doesn’t give you credit.' - Lyrikal",
    "'We can do anything we want to if we stick to it long enough.' - Helen Keller",
    "'You don't fail until you give up.' - Jess Davila",
    "'You do you.' - Mariko Iwata",
    "'It's who you know. So make yourself someone they know.' - Victor He",
    "'Better than late than never.' - Pei Chu",
  ];

  useEffect(() => {
    // show login button after 2 seconds
    setTimeout(() => {
      setShowLogin(true);
    }, 2000);
  }, []);

  const welcomeTheme = createTheme({
    typography: {
      fontFamily: ['Alkatra', 'cursive'].join(','),
    },
  });

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(indigo[500]),
    borderColor: 'white',
    '&:hover': {
      backgroundColor: indigo[800],
      borderColor: 'white',
    },
  }));

  function handleLogin() {
    // hide homepage upon logging in
    setShowHomepage(false);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box className="diagonal-hero-bg">
        <Box className="stars">
          <Box className="small" />
          <Box className="medium" />
          <Box className="big" />
        </Box>
      </Box>
      <ThemeProvider theme={welcomeTheme}>
        <Fade in timeout={2000}>
          <Typography variant="h1">Welcome</Typography>
        </Fade>
        {showLogin ? (
          <Fade in timeout={2000}>
            <ColorButton
              size="large"
              variant="outlined"
              startIcon={<LoginIcon />}
              sx={{ textTransform: 'none' }}
              onClick={() => handleLogin()}
            >
              <Typography variant="h6">
                {shortQuotes[Math.floor(Math.random() * shortQuotes.length)]}
              </Typography>
            </ColorButton>
          </Fade>
        ) : (
          <Fade in={false}>
            <ColorButton size="large">
              <Typography variant="h6">InvisPlaceholder</Typography>
            </ColorButton>
          </Fade>
        )}
      </ThemeProvider>
    </Box>
  );
}
