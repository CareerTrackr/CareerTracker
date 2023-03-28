import { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

function App() {
  return (
    <div>
      <Button variant="contained">delete me<DeleteIcon></DeleteIcon></Button>
      
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </div>
  )
}

function WrappedApp() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}

export default WrappedApp;
