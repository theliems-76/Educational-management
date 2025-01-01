// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import StudentDashboard from './pages/Student/StudentDashboard';
// import Login from './pages/Login';
// import NotFound from './pages/NotFound';

  // Tạm thời hardcode user student để test giao diện
  // const user = {
  //   role: 'student'
  // };
  // localStorage.setItem('user', JSON.stringify(user))
  
    // <>
    //   <BrowserRouter>
    //     <Routes>
    //       <Route path="/login" element={<Login />} />
    //       <Route path="/not-found" element={<NotFound />} />
    //       <Route path="/student/*" element={<StudentDashboard />} />

    //       {/* Chuyển hướng trang root (/) đến /student/home */}
    //       <Route path="/" element={<Navigate to="/student/home" replace />} />

    //       {/* Không cần route "*" ở đây nữa */}
    //       {/* <Route path="*" element={<Navigate to="/student/home" replace />} /> */}
    //     </Routes>
    //   </BrowserRouter>
    // </>
    import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
    import StudentDashboard from './pages/Student/StudentDashboard';
    import TeacherDashboard from './pages/Teacher/TeacherDashboard'; 
    import TeacherTimetable from './pages/Teacher/TeacherTimeTable';
    import Login from './pages/Login';
    import NotFound from './pages/NotFound';
    import TimeTable from "./components/TimeTable"
    import HomeworkList from './components/UI/HomeworkList';
    import Note from "./components/UI/StudentNote"
    import AdminDashboard from "./pages/Admin/AdminDashboard"
    import { ThemeProvider} from '@mui/material/styles';
    import theme from './theme'; 
    function App() {
      return (
          <ThemeProvider theme={theme}>
              <BrowserRouter>
                <Routes>
                  {/* <Route path="/login" element={<Login />} /> */}
                  <Route path="/not-found" element={<NotFound />} />
                  <Route path="/student/*" element={<StudentDashboard />} />
                  <Route path="/teacher/my-classes" element={<TeacherDashboard />} />
                  <Route path="/teacher/timetable" element={<TeacherTimetable/>}/>
                  <Route path="/timetable" element={<TimeTable/>}/>
                  <Route path="/homework" element={<HomeworkList/>}/>
                  <Route path="/admin/*" element={<AdminDashboard />} />
                  <Route path="/" element={<Navigate to="/student/home" replace />} />
                </Routes>
              </BrowserRouter>
          </ThemeProvider>
      );
    }
    
    export default App;