import React, { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Homepage } from './views/Homepage.js';
import { Applications } from './views/Applications.js';
import { Sidebar } from './components/Sidebar.js';
import Header from './components/Header';
import { DarkMode } from '../types.js';

function App({ setDarkMode, darkMode }: DarkMode) {
  const [showHomepage, setShowHomepage] = useState(true);
  const [showApplications, setShowApplications] = useState(true);
  const [showNotes, setShowNotes] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearchFilter, setShowSearchFilter] = useState(false);

  return showHomepage ? (
    <div>
      <Homepage setShowHomepage={setShowHomepage}></Homepage>
    </div>
  ) : (
    <Box>
      <Header setDarkMode={setDarkMode} darkMode={darkMode} />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar
          showApplications={showApplications}
          setShowApplications={setShowApplications}
          showNotes={showNotes}
          setShowNotes={setShowNotes}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          showSearchFilter={showSearchFilter}
          setShowSearchFilter={setShowSearchFilter}
        ></Sidebar>
        {showApplications ? <Applications /> : <></>}
      </Box>
    </Box>
  );
}

function WrappedApp() {
  const [darkMode, setDarkMode] = useState(true);

  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <HashRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App setDarkMode={setDarkMode} darkMode={darkMode} />
      </ThemeProvider>
    </HashRouter>
  );
}

export default WrappedApp;
