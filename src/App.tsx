import React, { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import { Sidebar } from "./components/Sidebar.js";

function App() {
  const [showHomepage, setShowHomepage] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearchFilter, setShowSearchFilter] = useState(false);
  

  return (
    <div>
      Hello TX!
      <Sidebar></Sidebar>
    </div>
  )
}

function WrappedApp() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  )
}

export default WrappedApp;
