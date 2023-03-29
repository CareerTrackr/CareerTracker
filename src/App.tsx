import React, { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Sidebar } from "./components/Sidebar.js";
import { DarkMode } from '../types.js';

function App ({setDarkMode}: DarkMode) {
  const [showHomepage, setShowHomepage] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearchFilter, setShowSearchFilter] = useState(false);

  return (
    //<Header setDarkMode={setDarkMode}/> include dark mode option in header 
    <Sidebar 
      showApplications={showApplications} setShowApplications ={setShowApplications}
      showNotes={showNotes} setShowNotes={setShowNotes}
      showNotifications={showNotifications} setShowNotifications={setShowNotifications}
      showSearchFilter={showSearchFilter} setShowSearchFilter={setShowSearchFilter}
    />
  )
}

function WrappedApp() {
  const [darkMode, setDarkMode] = useState('dark');

  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <HashRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <App setDarkMode={setDarkMode}/>
      </ThemeProvider>
      
    </HashRouter>
  )
}

export default WrappedApp;
