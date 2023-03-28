import React, { useEffect, useState, FC } from "react";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';

export const Sidebar = () => {
  return (
    <Box sx={{width: "100%", height: "auto", mx: 0}}>
      <List>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <ArticleIcon/>
            </ListItemIcon>
            <ListItemText primary="Applications"/>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <EditIcon/>
            </ListItemIcon>
            <ListItemText primary="Notes"/>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <NotificationsIcon/>
            </ListItemIcon>
            <ListItemText primary="Notifications"/>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
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