import React, { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import { Sidebar } from "./components/Sidebar.js";
import { PageOptions } from "../types.js";

function App() {
  const [showHomepage, setShowHomepage] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearchFilter, setShowSearchFilter] = useState(false);
  

  return (

      <Sidebar 
        showApplications={showApplications} setShowApplications ={setShowApplications}
        showNotes={showNotes} setShowNotes={setShowNotes}
        showNotifications={showNotifications} setShowNotifications={setShowNotifications}
        showSearchFilter={showSearchFilter} setShowSearchFilter={setShowSearchFilter}
      />

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
