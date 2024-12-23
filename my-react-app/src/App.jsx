import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import StudentDashboard from './pages/Student/StudentDashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

function App() {
  // Tạm thời hardcode user student để test giao diện
  const user = {
    role: 'student'
  };
  localStorage.setItem('user', JSON.stringify(user))
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/student/*" element={<StudentDashboard />} />

          {/* Chuyển hướng trang root (/) đến /student/home */}
          <Route path="/" element={<Navigate to="/student/home" replace />} />

          {/* Không cần route "*" ở đây nữa */}
          {/* <Route path="*" element={<Navigate to="/student/home" replace />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;