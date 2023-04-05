import React, { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import { DarkMode } from '../types.js';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Homepage } from './views/Homepage.js';
import { Applications } from './views/Applications.js';
import { Sidebar } from './components/Sidebar.js';
import Header from './components/Header';
import Notes from './pages/Notes';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import 'bootstrap/dist/css/bootstrap.min.css';

function App({ setDarkMode }: DarkMode) {
  const [showHomepage, setShowHomepage] = useState(true);
  const [showApplications, setShowApplications] = useState(true);
  const [showNotes, setShowNotes] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearchFilter, setShowSearchFilter] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return showHomepage ? (
    <div>
      <Homepage setShowHomepage={setShowHomepage}></Homepage>
    </div>
  ) : (
    <div>
      <div>
        <Header />
        <Tooltip title="Menu">
          <label>
            <MenuIcon className="menuIcon" onClick={toggleSidebar} />
          </label>
        </Tooltip>
      </div>

      {showSidebar && (
        <div>
          <Sidebar
            showApplications={showApplications}
            setShowApplications={setShowApplications}
            showNotes={showNotes}
            setShowNotes={setShowNotes}
            showNotifications={showNotifications}
            setShowNotifications={setShowNotifications}
            showSearchFilter={showSearchFilter}
            setShowSearchFilter={setShowSearchFilter}
          />
        </div>
      )}
      {showApplications ? <Applications /> : <></>}
      {showNotes ? <Notes /> : <></>}
    </div>
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
        <App setDarkMode={setDarkMode} />
      </ThemeProvider>
    </HashRouter>
  );
}

export default WrappedApp;
