import React from "react";
import { Link } from "react-router-dom";
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

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const StyledDrawer = styled(MuiDrawer)(() => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
  },
}));

const adminMenuData = [
  {
    title: "Trang chính",
    link: "/admin/home",
    icon: <DashboardIcon />,
  },
  {
    title: "Quản lí học viên",
    link: "/admin/student-management",
    icon: <GroupIcon />,
  },
  {
    title: "Quản lí giáo viên",
    link: "/admin/tutor-management",
    icon: <GroupIcon />,
  },
  {
    title: "Quản lí lớp học",
    link: "/admin/lesson-time-management",
    icon: <EventAvailableIcon />,
  },
  {
    title: "Quản lí thu chi",
    link: "/admin/payment",
    icon: <AttachMoneyIcon />,
  },
  {
    title: "Hóa đơn",
    link: "/admin/invoice",
    icon: <BookIcon />,
  },
  {
    title: "Học phí",
    link: "/admin/default-lesson-fee",
    icon: <AssignmentIcon />,
  },
  {
    title: "Ý kiến phản hồi",
    link: "/admin/review-request",
    icon: <RateReviewIcon />,
  },
];

function AdminSidebar() {
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
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <AutoFixHighIcon sx={{ fontSize: 35, color: "#001d6c" }} />
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
            color: "#001d6c",
            textDecoration: "none",
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
              px: 0,
            }}
          >
            <Avatar
              sx={{ width: "70px", height: "70px" }}
              alt="John Doe"
              src="https://via.placeholder.com/82x82"
            />
            <ListItemText
              primary="John Doe"
              secondary="Admin"
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
        {adminMenuData.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
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
                  justifyContent: "left",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List sx={{ marginTop: "none", px: 0 }}>
        <ListItem key={"Setting"} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
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
            <ListItemText primary={"Setting"} />
          </ListItemButton>
        </ListItem>
      </List>
    </StyledDrawer>
  );
}

export default AdminSidebar;