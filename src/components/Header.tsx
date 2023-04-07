import { useState } from 'react';
import logo from '../assets/CareerTracker.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

const Header = () => {
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
    <div className="header">
      <img src={logo} />
      <div className="dropdown">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={openMenu}
                  color="inherit"
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
              </div>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
    </div>
  );
};

export default Header;
