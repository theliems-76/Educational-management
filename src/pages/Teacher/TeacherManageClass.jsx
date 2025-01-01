import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Sidebar from "../../components/TeacherSidebar"; 
import Header from "../../components/Header"; 
import HomePage from "./HomePage";
import Timetable from "../../components/UI/Timetable";
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

const teacher_timetable = {
    "2025-01-04": { "8:00": "Math" },
    "2025-01-05": { "10:00": "Science" },
    "2025-01-08": { "14:00": "Art" },
    "2025-01-11": { "9:00": "Science" },
    "2025-01-17": { "15:00": "History" },
    "2025-01-30": { "10:00": "Art" }
};

function TeacherTimetable({ children }) {
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
        <Timetable
        dummyData={teacher_timetable}/>
      </Main>
    </Box>
  );
}

export default TeacherTimetable;