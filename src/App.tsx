import { useState } from 'react';
import { HashRouter } from 'react-router-dom';

function App() {
  return <div>Hello Matty X&apos;s Mentor Familys</div>;
}

function WrappedApp() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}

export default WrappedApp;
