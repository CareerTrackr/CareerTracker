import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
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
  const [checked, setChecked] = useState(true);
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
        <ListItem>
          <Collapse collapsedSize="56px" orientation="horizontal" in={checked}>
            <ListItemButton
              selected={showApplications}
              onClick={() => toggleOptions('applications')}
              sx={{ height: '48px', width: '200px' }}
            >
              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText primary="Applications" />
            </ListItemButton>
          </Collapse>
        </ListItem>
        <ListItem>
          <Collapse collapsedSize="56px" orientation="horizontal" in={checked}>
            <ListItemButton
              selected={showNotes}
              onClick={() => toggleOptions('notes')}
              sx={{ height: '48px', width: '200px' }}
            >
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="Notes" />
            </ListItemButton>
          </Collapse>
        </ListItem>
        <ListItem>
          <Collapse collapsedSize="56px" orientation="horizontal" in={checked}>
            <ListItemButton
              selected={showNotifications}
              onClick={() => toggleOptions('notifications')}
              sx={{ height: '48px', width: '200px' }}
            >
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText primary="Notifications" />
            </ListItemButton>
          </Collapse>
        </ListItem>
        <ListItem>
          <Collapse collapsedSize="56px" orientation="horizontal" in={checked}>
            <ListItemButton
              selected={showSearchFilter}
              onClick={() => toggleOptions('search')}
              sx={{ height: '48px', width: '200px' }}
            >
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary="Search" />
            </ListItemButton>
          </Collapse>
        </ListItem>
        <ListItem>
          <Collapse collapsedSize="56px" orientation="horizontal" in={checked}>
            <ListItemButton
              onClick={() => {
                setChecked(!checked);
                handleChange();
              }}
              sx={{ height: '48px', width: '200px' }}
            >
              <ListItemIcon>
                {checked ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
              </ListItemIcon>
              <ListItemText primary="Collapse" />
            </ListItemButton>
          </Collapse>
        </ListItem>
      </List>
    </Box>
  );
}
