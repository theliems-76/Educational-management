import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Assignment as AssignmentIcon,
  AttachMoney as AttachMoneyIcon,
  AutoFixHigh as AutoFixHighIcon,
  Book as BookIcon,
  Dashboard as DashboardIcon,
  Group as GroupIcon,
  Settings as SettingsIcon,
  EventAvailable as EventAvailableIcon,
  RateReview as RateReviewIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
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
  Menu,
  MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const StyledDrawer = styled(MuiDrawer)(() => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
}));

const adminMenuData = [
  {
    title: 'Trang chính',
    link: '/admin/home',
    icon: <DashboardIcon />,
  },
  {
    title: 'Quản lí học viên',
    link: '/admin/student-management',
    icon: <GroupIcon />,
  },
  {
    title: 'Quản lí giáo viên',
    link: '/admin/tutor-management',
    icon: <GroupIcon />,
  },
  {
    title: 'Quản lí lớp học',
    link: '/admin/lesson-time-management',
    icon: <EventAvailableIcon />,
  },
  {
    title: 'Quản lí thu chi',
    link: '/admin/payment',
    icon: <AttachMoneyIcon />,
  },
  {
    title: 'Hóa đơn',
    link: '/admin/invoice',
    icon: <BookIcon />,
  },
];

function AdminSidebar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    navigate('/signin');
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Xử lý file ảnh, ví dụ: upload lên server
    console.log('Selected file:', file);
    // Cập nhật ảnh đại diện (cần lưu vào state hoặc database)
  };

  return (
    <StyledDrawer variant="permanent" open={true}>
      <DrawerHeader
        sx={{
          px: 2,
          mb: 2,
          mt: 2,
        }}
      >
        <IconButton
          color="inherit"
          sx={{
            p: 0,
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <AutoFixHighIcon sx={{ fontSize: 35, color: '#001d6c' }} />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            ml: 2,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: '#001d6c',
            textDecoration: 'none',
          }}
        >
          LMS
        </Typography>
      </DrawerHeader>
      <List
        sx={{
          px: 2,
        }}
      >
        <ListItem
          disablePadding
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginBottom: '10px',
          }}
        >
          <input
            type="file"
            hidden
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
          />
          <ListItemButton
            onClick={handleAvatarClick}
            sx={{
              minHeight: 48,
              justifyContent: 'initial',
              px: 0,
              
            }}
          >
            <Avatar
              sx={{ width: '70px', height: '70px', cursor: 'pointer' }}
              alt="John Doe"
              src="https://via.placeholder.com/82x82"
            />
            <ListItemText
              primary="John Doe"
              secondary="Admin"
              sx={{
                ml: 2,
                '.MuiListItemText-primary': {
                  fontWeight: 'bold',
                },
                '.MuiListItemText-secondary': {
                  fontSize: '0.8rem',
                },
              }}
            />
          </ListItemButton>
        </ListItem>
        {adminMenuData.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={Link}
              to={item.link}
              sx={{
                minHeight: 48,
                px: 1,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                  justifyContent: 'left',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List sx={{ marginTop: 'auto', px: 0 }}>
        
          
        <ListItem key={'Logout'} disablePadding sx={{ display: 'block' }}>
          <ListItemButton onClick={handleLogout} sx={{ minHeight: 48, px: 2.5 }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 3,
                justifyContent: 'center',
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={'Logout'} />
          </ListItemButton>
        </ListItem>
      </List>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Setting</MenuItem>
        <MenuItem onClick={handleClose}>Account</MenuItem>
      </Menu>
    </StyledDrawer>
  );
}

export default AdminSidebar;