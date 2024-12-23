import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import StudentLayout from '../../components/Layouts/StudentLayout';
import HomePage from './HomePage';
// import MyCourses from './MyCourses';
// import MyProfile from './MyProfile';

function StudentDashboard() {
  return (
    <StudentLayout>
      <Routes>
        <Route path="home" element={<HomePage />} />
        {/* <Route path="my-courses" element={<MyCourses />} />
        <Route path="my-profile" element={<MyProfile />} /> */}
        {/* Các route khác của student */}

        {/* Nếu không vào các route trên, trả về trang HomePage */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </StudentLayout>
  );
}

export default StudentDashboard;