import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "../Header";
import AdminSidebar from "../AdminSidebar";

const drawerWidth = 240;

const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3), // Giữ padding này cho nội dung bên trong Main
  width: `calc(100% - ${drawerWidth}px)`, // Thêm width
  marginLeft: drawerWidth,
}));

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  width: `calc(100% - ${drawerWidth}px)`,
  backgroundColor: "#fff",
  color: "black",
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: "none",
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function AdminLayout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" elevation={0}>
        <Toolbar>
          <Header />
        </Toolbar>
      </AppBar>
      <AdminSidebar />
      <Main className="#FFFFFF">
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}

export default AdminLayout;