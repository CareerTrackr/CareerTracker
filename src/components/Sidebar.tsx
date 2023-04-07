import { useState } from 'react';
import { PageOptions } from '../../types';
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

export const Sidebar: React.FunctionComponent<PageOptions> = ({
  showApplications,
  setShowApplications,
  showNotes,
  setShowNotes,
  showNotifications,
  setShowNotifications,
  showSearchFilter,
  setShowSearchFilter,
}) => {
  const [checked, setChecked] = useState(false);
  const [width, setWidth] = useState('80px');
  // const [sidebarText, setSidebarText] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
    checked ? setWidth('80px') : setWidth('300px');
    // setSidebarText(!sidebarText);
  };

  function toggleOptions(input: String): void {
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
    <Box sx={{ width: width, height: 'auto', mx: 0 }}>
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
};
