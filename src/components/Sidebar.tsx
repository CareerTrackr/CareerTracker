import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import { PageOptions } from '../../types';

export default function Sidebar({
  showApplications,
  setShowApplications,
  showNotes,
  setShowNotes,
  showNotifications,
  setShowNotifications,
  showSearchFilter,
  setShowSearchFilter,
}: PageOptions): JSX.Element {
  const [checked, setChecked] = useState(false);
  const [width, setWidth] = useState('90px');

  const handleChange = () => {
    setChecked(!checked);
    return checked ? setWidth('90px') : setWidth('300px');
  };

  function toggleOptions(input: string): void {
    if (input === 'applications') {
      setShowApplications(true);
      setShowNotes(false);
      setShowNotifications(false);
      setShowSearchFilter(false);
    }
    if (input === 'notes') {
      setShowApplications(false);
      setShowNotes(true);
      setShowNotifications(false);
      setShowSearchFilter(false);
    }
    if (input === 'notifications') {
      setShowApplications(false);
      setShowNotes(false);
      setShowNotifications(true);
      setShowSearchFilter(false);
    }
    if (input === 'search') {
      setShowApplications(false);
      setShowNotes(false);
      setShowNotifications(false);
      setShowSearchFilter(true);
    }
  }

  return (
    <Box sx={{ height: 'auto' }}>
      <List>
        {/* <ListItem>
          <ListItemButton
            selected={showApplications}
            onClick={() => toggleOptions('applications')}
            sx={{ height: '48px' }}
          >
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <Collapse orientation="horizontal" in={checked}>
              <ListItemText primary="Applications" />
            </Collapse>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            selected={showNotes}
            onClick={() => toggleOptions('notes')}
            sx={{ height: '48px' }}
          >
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <Collapse orientation="horizontal" in={checked}>
              <ListItemText primary="Notes" />
            </Collapse>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            selected={showNotifications}
            onClick={() => toggleOptions('notifications')}
            sx={{ height: '48px' }}
          >
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <Collapse orientation="horizontal" in={checked}>
              <ListItemText primary="Notifications" />
            </Collapse>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            selected={showSearchFilter}
            onClick={() => toggleOptions('search')}
            sx={{ height: '48px' }}
          >
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <Collapse orientation="horizontal" in={checked}>
              <ListItemText primary="Search" />
            </Collapse>
          </ListItemButton>
        </ListItem> */}
        <ListItem>
          <ListItemButton
            onClick={() => {
              setChecked(!checked);
              handleChange();
            }}
            sx={{ height: '48px' }}
          >
            <ListItemIcon>
              {checked ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
            </ListItemIcon>
            <Collapse orientation="horizontal" in={checked}>
              <ListItemText primary="Collapse" />
            </Collapse>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
