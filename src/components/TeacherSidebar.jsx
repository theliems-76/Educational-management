import React from "react";
import { Link } from "react-router-dom";
import {
  Person as PersonIcon,
  Book as BookIcon,
  CalendarToday as CalendarTodayIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

const drawerWidth = 240;

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
  },
}));

const verMenuData = [
  {
    title: "Hồ sơ của tôi",
    link: "/teacher/profile",
    icon: <PersonIcon />,
  },
  {
    title: "Khóa học của tôi",
    link: "/teacher/my-classes",
    icon: <BookIcon />,
  },
  {
    title: "Lịch dạy học",
    link: "/teacher/timetable",
    icon: <CalendarTodayIcon />,
  },
];

function Sidebar() {
  return (
    <StyledDrawer variant="permanent" open={true}>
      <List>
        <ListItem
          sx={{
            marginBottom: "15px",
            justifyContent: "initial"
          }}
        >
          <IconButton
            color="inherit"
            sx={{
              p: 0,
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <AutoFixHighIcon sx={{ fontSize: 35, color: "#9550fa" }} />
          </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                ml: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LMS
            </Typography>
        </ListItem>
        <ListItem
          disablePadding
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginBottom: "10px",
          }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: "initial",
              px: 2.5,
            }}
          >
            <Avatar
              sx={{ width: "70px", height: "70px" }}
              alt="John Doe"
              src="https://via.placeholder.com/82x82"
            />
            <ListItemText
              primary="John Wick"
              secondary="Teacher"
              sx={{
                ml: 2,
                ".MuiListItemText-primary": {
                  fontWeight: "bold",
                },
                ".MuiListItemText-secondary": {
                  fontSize: "0.8rem",
                },
              }}
            />
          </ListItemButton>
        </ListItem>
        {verMenuData.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component={Link}
              to={item.link}
              sx={{
                minHeight: 48,
                justifyContent:  "initial",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.title}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List sx={{ marginTop: "auto" }}>
        <ListItem key={"Setting"} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: "initial",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 3,
                justifyContent: "center",
              }}
            >
              <Badge badgeContent={9} color="error">
                <SettingsIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText
              primary={"Setting"}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </StyledDrawer>
  );
}

export default Sidebar;