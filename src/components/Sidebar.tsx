import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
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
  const [width, setWidth] = useState('80px');

  const handleChange = () => {
    setChecked(!checked);
    return checked ? setWidth('80px') : setWidth('300px');
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
    <Box sx={{ width, height: 'auto', mx: 0 }}>
      <List>
        <ListItem>
          <ListItemButton
            selected={showApplications}
            onClick={() => toggleOptions('applications')}
          >
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            {checked ? <ListItemText primary="Applications" /> : null}
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            selected={showNotes}
            onClick={() => toggleOptions('notes')}
          >
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            {checked ? <ListItemText primary="Notes" /> : null}
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            selected={showNotifications}
            onClick={() => toggleOptions('notifications')}
          >
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            {checked ? <ListItemText primary="Notifications" /> : null}
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            selected={showSearchFilter}
            onClick={() => toggleOptions('search')}
          >
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            {checked && <ListItemText primary="Search" />}
          </ListItemButton>
        </ListItem>
        <ListItem>
          <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label={checked ? 'Collapse' : 'Expand'}
          />
        </ListItem>
      </List>
    </Box>
  );
}
