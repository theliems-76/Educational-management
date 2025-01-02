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


    //       {/* Không cần route "*" ở đây nữa */}
    //       {/* <Route path="*" element={<Navigate to="/student/home" replace />} /> */}
    //     </Routes>
    //   </BrowserRouter>
    // </>
    import React, { useState } from 'react';
    import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
    import NotFound from './pages/NotFound';
    import TimeTable from './components/TimeTable';
    import HomeworkList from './components/UI/HomeworkList';
    import Note from './components/UI/StudentNote';
    import AdminDashboard from './pages/Admin/AdminDashboard';
    import { ThemeProvider } from '@mui/material/styles';
    import theme from './theme';
    import Header from './components/Header';
    import MessageContainer from './components/Message/MessageContainer';
    import SignIn from './pages/Signin';
    import Layout from './components/Layouts/Layout';
    import StudentDashboard from './pages/Student/StudentDashboard';
    function App() {
      const [isMessageListModalOpen, setIsMessageListModalOpen] = useState(false);
    
      const handleOpenMessageListModal = () => {
        console.log("handleOpenMessageListModal called");
        setIsMessageListModalOpen(true);
      };
    
      const handleCloseMessageListModal = () => {
        setIsMessageListModalOpen(false);
      };
      console.log("App handleOpenMessageListModal:", handleOpenMessageListModal);
    
      return (
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <div className="App relative">
              <Routes>
                <Route
                  path="/*"
                  element={
                    <Layout onOpenMessageListModal={handleOpenMessageListModal}>
                      <Routes>
                        <Route path="/not-found" element={<NotFound />} />
                        <Route path="/student/*" element={<StudentDashboard />} />
                        <Route path="/timetable" element={<TimeTable />} />
                        <Route path="/homework" element={<HomeworkList />} />
                        <Route path="/admin/*" element={<AdminDashboard />} />
                        <Route path="/" element={<Navigate to="/student/profile" replace />} />
                      </Routes>
                    </Layout>
                  }
                />
    
                <Route
                  path="/signin"
                  element={
                    <Layout showHeader={false}>
                      <SignIn
                        checkLogin={(user, pass) => {
                          return user === "user" && pass === "password";
                        }}
                      />
                    </Layout>
                  }
                />
              </Routes>
            </div>
          </BrowserRouter>
        </ThemeProvider>
      );
    }
    
    export default App;

//       {/* Chuyển hướng trang root (/) đến /student/home */}
//       <Route path="/" element={<Navigate to="/student/home" replace />} />

//       {/* Không cần route "*" ở đây nữa */}
//       {/* <Route path="*" element={<Navigate to="/student/home" replace />} /> */}
//     </Routes>
//   </BrowserRouter>
// </>
