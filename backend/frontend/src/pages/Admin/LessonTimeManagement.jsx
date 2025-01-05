import React, { useState, useCallback } from 'react';
import { Box, Typography, Button } from '@mui/material';
import CourseCard from '../../components/UI/CourseCard';
import dummyCourses from '../../utils/dummyCourses';
import { useNavigate } from 'react-router-dom';
import AddCourseModal from "../../components/share/AddCourseModal";
import { tutors as dummyTutors } from "../../utils/dummyTutors";

function LessonTimeManagement() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState(() => {
        const storedCourses = localStorage.getItem('courses');
        return storedCourses ? JSON.parse(storedCourses) : dummyCourses;
    });
    const [showAll, setShowAll] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newCourse, setNewCourse] = useState({
        className: "",
        teacher: "",
        classSize: "",
        schedule: [],
        tuitionFee: "",
    });
    const [notification, setNotification] = useState("");
    const [notificationType, setNotificationType] = useState("");
    const [notificationError, setNotificationError] = useState("");
    const [editedCourse, setEditedCourse] = useState(null);

    const visibleCourses = showAll ? courses : courses.slice(0, 4);

    const handleSeeMore = useCallback(() => {
        setShowAll(prevShowAll => !prevShowAll);
        if (!showAll) {
            navigate("/admin/lesson-time-management/courselist");
        }
    }, [showAll, navigate]);

    const handleOpenModal = useCallback(() => {
        setIsAddModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsAddModalOpen(false);
        setNewCourse({
            className: "",
            teacher: "",
            classSize: "",
            schedule: [],
            tuitionFee: "",
        });
        resetNotification();
    }, []);

    const handleAddChange = useCallback((event) => {
        const { name, value } = event.target;
        setNewCourse(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleEditChange = useCallback((event) => {
        const { name, value } = event.target;
        setEditedCourse(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        const newCourseWithId = {
            ...newCourse,
            id: courses.length > 0 ? Math.max(...courses.map(c => parseInt(c.id))) + 1 : 1,
            image: "",
        };
        setCourses(prevCourses => {
            const updatedCourses = [...prevCourses, newCourseWithId];
            localStorage.setItem('courses', JSON.stringify(updatedCourses));
            return updatedCourses;
        });
        setNotification("Đã thêm lớp học mới!");
        setNotificationType("add");
        setTimeout(handleCloseModal, 1000);
    }, [courses, newCourse, handleCloseModal]);

    const handleDeleteCourse = useCallback((courseId) => {
        setCourses(prevCourses => {
            const updatedCourses = prevCourses.filter(course => course.id !== courseId);
            localStorage.setItem('courses', JSON.stringify(updatedCourses));
            setNotification("Đã xóa lớp học khỏi trung tâm!");
            setNotificationType("delete");
            setTimeout(resetNotification, 3000);
            return updatedCourses;
        });
    }, []);

    const handleEditCourse = useCallback((editedCourse) => {
        setCourses(prevCourses => {
            const updatedCourses = prevCourses.map(course =>
                course.id === editedCourse.id ? editedCourse : course
            );
            localStorage.setItem('courses', JSON.stringify(updatedCourses));
            return updatedCourses;
        });
        setNotification("Đã chỉnh sửa lớp học thành công!");
        setNotificationType("edit");
    }, []);

    const resetNotification = useCallback(() => {
        setNotification('');
        setNotificationType('');
        setNotificationError('');
    }, []);

    return (
        <Box p={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h4" component="h1">
                    Quản Lý Thời Gian Biểu
                </Typography>
                <Button onClick={handleOpenModal} variant="contained" color="primary">
                    Thêm Lớp Học
                </Button>
            </Box>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(245px, 1fr))',
                gap: '16px',
                paddingBottom: '16px',
                maxWidth: '100%',
            }}>
                {visibleCourses.map((course) => (
                    <CourseCard
                        key={course.id}
                        course={course}
                        handleDeleteCourse={handleDeleteCourse}
                        handleEditCourse={handleEditCourse}
                        handleChange={handleEditChange}
                        notification={notification}
                        notificationType={notificationType}
                        notificationError={notificationError}
                        setNotification={setNotification}
                        setNotificationType={setNotificationType}
                        setNotificationError={setNotificationError}
                    />
                ))}
            </div>
            {courses.length > 4 && (
                <Box mt={2} display="flex" justifyContent="center">
                    <Button onClick={handleSeeMore} variant="outlined" color="primary">
                        {showAll ? "Thu gọn" : "Xem thêm"}
                    </Button>
                </Box>
            )}
            <AddCourseModal
                isModalOpen={isAddModalOpen}
                handleCloseModal={handleCloseModal}
                handleSubmit={handleSubmit}
                handleChange={handleAddChange}
                newCourse={newCourse}
                notification={notification}
                notificationType={notificationType}
                notificationError={notificationError}
                tutors={dummyTutors}
            />
        </Box>
    );
}

export default LessonTimeManagement;