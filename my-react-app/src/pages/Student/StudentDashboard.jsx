import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import StudentLayout from '../../components/Layouts/StudentLayout';
import HomePage from './HomePage';
// import MyCourses from './MyCourses'; // Import các page khác của student (nếu có)
// import MyProfile from './MyProfile';

function StudentDashboard() {
  return (
    <StudentLayout>
      <Routes>
        <Route path="home" element={<HomePage />} />
        {/* <Route path="my-courses" element={<MyCourses />} />
        <Route path="my-profile" element={<MyProfile />} /> */}
        {/* Thêm các route khác của student */}
        <Route path="*" element={<Navigate to="home" replace />} />
      </Routes>
    </StudentLayout>
  );
}

export default StudentDashboard;