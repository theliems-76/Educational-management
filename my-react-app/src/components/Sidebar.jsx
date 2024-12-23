import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Badge,
  IconButton,
  Drawer as MuiDrawer
} from "@mui/material";
import {
  Home as HomeIcon,
  Person as PersonIcon,
  Book as BookIcon,
  CalendarToday as CalendarTodayIcon,
  Assignment as AssignmentIcon,
  Settings as SettingsIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";
import { styled } from '@mui/material/styles';
// import logo from "../assets/logo.png"; // Import logo của bạn

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// Đổi tên Drawer thành StyledDrawer
const StyledDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

function Sidebar({ open, handleDrawerClose, handleDrawerOpen }) {
  return (
    // Sử dụng StyledDrawer thay vì Drawer
    <StyledDrawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <List>
        <ListItem>
          {/* <img src={logo} alt="Logo" className="h-8" /> */}
          <Typography variant="h6" noWrap component="div" sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}>
            LMS
          </Typography>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <Avatar sx={{ width: "70px", height: "70px" }} alt="John Doe" src="/static/images/avatar/1.jpg" />
            <ListItemText
              primary="John Doe"
              secondary="Student"
              sx={{
                ml: 2,
                ".MuiListItemText-primary": {
                  fontWeight: "bold"
                },
                display: !open && 'none'
              }}
            />
          </ListItemButton>
        </ListItem>
        {["Home", "My profile", "My course", "Time table", "Homework"].map(
          (text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index === 0 && <HomeIcon />}
                  {index === 1 && <PersonIcon />}
                  {index === 2 && <BookIcon />}
                  {index === 3 && <CalendarTodayIcon />}
                  {index === 4 && <AssignmentIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
      <List sx={{ marginTop: "auto" }}>
        <ListItem key={"Setting"} disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <Badge badgeContent={9} color="error">
                <SettingsIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary={"Setting"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </StyledDrawer>
  );
}

export default Sidebar;