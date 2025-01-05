import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Sidebar from "../../components/TeacherSidebar"; 
import Header from "../../components/Header"; 
import HomePage from "../Teacher/HomePage";
const drawerWidth = 240;

const Main = styled("main")(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
  }));

const AppBar = styled(MuiAppBar)(({ theme }) => ({
    width: `calc(100% - ${drawerWidth}px)`,
    backgroundColor: '#fff', 
    color: 'black',
    zIndex: (theme) => theme.zIndex.drawer + 1,
    boxShadow: 'none',
}));

function TeacherLayout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" elevation={0}>
        <Toolbar>
          <Header />
        </Toolbar>
      </AppBar>
      <Sidebar />
      <Main className="bg-gray-100">
        <Box sx={{height: "64px"}}/>
        {children}
        <HomePage/>
      </Main>
    </Box>
  );
}

export default TeacherLayout;