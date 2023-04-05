import { useState } from 'react';
import logo from '../assets/CareerTracker.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  const openProfile = () => {
    // use React router to route to profile page
    setOpen(false);
  };

  const openSettings = () => {
    // use React router to route to settings page
    setOpen(false);
  };

  const logOff = () => {
    // log off
    setOpen(false);
  };

  return (
    <div className="header">
      <img src={logo} />
      <div className="dropdown">
        <AccountCircleIcon onClick={handleOpen}>Dropdown</AccountCircleIcon>
        {open ? (
          <ul className="menu">
            <li className="menu-item">
              <button onClick={openProfile}>Your Profile</button>
            </li>
            <li className="menu-item">
              <button onClick={openSettings}>Settings</button>
            </li>
            <li className="menu-item">
              <button onClick={logOff}>Log off</button>
            </li>
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
