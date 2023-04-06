import React from "react";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { PageOptions } from "../../types";

export const Sidebar: React.FunctionComponent<PageOptions> = ({showApplications, setShowApplications, showNotes, setShowNotes, showNotifications, setShowNotifications, showSearchFilter, setShowSearchFilter}) => {
  function toggleOptions(input: String): void{
    if(input === "applications"){
      setShowApplications(true);
      setShowNotes(false);
      setShowNotifications(false);
      setShowSearchFilter(false);
    }
    if(input === "notes"){
      setShowApplications(false);
      setShowNotes(true);
      setShowNotifications(false);
      setShowSearchFilter(false);
    }
    if(input === "notifications"){
      setShowApplications(false);
      setShowNotes(false);
      setShowNotifications(true);
      setShowSearchFilter(false);
    }
    if(input === "search"){
      setShowApplications(false);
      setShowNotes(false);
      setShowNotifications(false);
      setShowSearchFilter(true);
    }
  }
  
  return (
    <Box sx={{width: "100%", height: "auto", mx: 0}}>
      <List>
        <ListItem>
          <ListItemButton selected={showApplications} onClick={() => toggleOptions("applications")}>
            <ListItemIcon>
              <ArticleIcon/>
            </ListItemIcon>
            <ListItemText primary="Applications"/>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton selected={showNotes} onClick={() => toggleOptions("notes")}>
            <ListItemIcon>
              <EditIcon/>
            </ListItemIcon>
            <ListItemText primary="Notes"/>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton selected={showNotifications} onClick={() => toggleOptions("notifications")}>
            <ListItemIcon>
              <NotificationsIcon/>
            </ListItemIcon>
            <ListItemText primary="Notifications"/>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton selected={showSearchFilter} onClick={() => toggleOptions("search")}>
            <ListItemIcon>
              <SearchIcon/>
            </ListItemIcon>
            <ListItemText primary="Search"/>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
}