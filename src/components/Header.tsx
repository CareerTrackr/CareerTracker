import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { DarkMode } from '../../types.js';
import logo from '../assets/CareerTracker.png';

function Header({ setDarkMode, darkMode }: DarkMode) {
  const [dropdown, setDropdown] = useState(false);

  const openMenu = () => {
    setDropdown(true);
  };

  const closeMenu = () => {
    setDropdown(false);
  };

  const openYourAccount = () => {
    // link to "Your Account" page
    closeMenu();
  };

  const openSettings = () => {
    // link to "Settings" page
    closeMenu();
  };

  const logOut = () => {
    // log off
    closeMenu();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <img src={logo} alt="logo" />
        </Box>

        <IconButton onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Brightness7Icon /> : <DarkModeIcon />}
        </IconButton>

        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={openMenu}
        >
          <AccountCircleIcon />
        </IconButton>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={dropdown}
          onClose={closeMenu}
        >
          <MenuItem onClick={openYourAccount}>Your account</MenuItem>
          <MenuItem onClick={openSettings}>Settings</MenuItem>
          <MenuItem onClick={logOut}>Log out</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
