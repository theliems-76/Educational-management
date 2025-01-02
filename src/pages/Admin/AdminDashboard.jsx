import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../../components/Layouts/AdminLayout';
import Home from './Home';
// Import các trang khác của admin
import StudentManagement from './StudentManagement';
import TutorManagement from './TutorManagement';
import LessonTimeManagement from './LessonTimeManagement';
import CourseList from '../../components/UI/CourseList';
import CourseInfo from './CourseInfo';
// import TutorPayment from './TutorPayment';
// import Invoice from './Invoice';
// import DefaultLessonFee from './DefaultLessonFee';
// import ReviewRequest from './ReviewRequest';

function AdminDashboard() {
    return (
        <AdminLayout>
            <Routes>
                <Route path="home" element={<Home />} />
                <Route path="student-management" element={<StudentManagement />} />
                <Route path="tutor-management" element={<TutorManagement />} />
                <Route path="lesson-time-management" element={<LessonTimeManagement />} />
                <Route path="lesson-time-management/courselist" element={<CourseList />} />
                <Route path="lesson-time-management/courselist/course-infor/:courseId" element={<CourseInfo />} />
                {/* // <Route path="tutor-payment" element={<TutorPayment />} />
        // <Route path="invoice" element={<Invoice />} />
        // <Route path="default-lesson-fee" element={<DefaultLessonFee />} />
        // <Route path="review-request" element={<ReviewRequest />} />
        // <Route path="*" element={<Navigate to="home" replace />} />   */}
            </Routes>
        </AdminLayout>
    );
}

export default AdminDashboard;