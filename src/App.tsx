import React, { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import { DarkMode } from '../types.js';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Homepage } from './views/Homepage.js';
import { Applications } from './views/Applications.js';
import { Sidebar } from "./components/Sidebar.js";
import  Header  from './components/Header';

function App ({setDarkMode}: DarkMode) {
  const [showHomepage, setShowHomepage] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearchFilter, setShowSearchFilter] = useState(false);


  return showHomepage ? (
    <div>
      <Homepage></Homepage>
    </div>
  ) : (
    <div>
      <Header/>
      <Sidebar 
        showApplications={showApplications} setShowApplications ={setShowApplications}
        showNotes={showNotes} setShowNotes={setShowNotes}
        showNotifications={showNotifications} setShowNotifications={setShowNotifications}
        showSearchFilter={showSearchFilter} setShowSearchFilter={setShowSearchFilter}
      ></Sidebar>
      {
        showApplications ? <Applications/> : <></>
      }
    </div>

  )
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
        <CssBaseline/>
        <App setDarkMode={setDarkMode}/>
      </ThemeProvider>
    </HashRouter>
  );
}

export default WrappedApp;
