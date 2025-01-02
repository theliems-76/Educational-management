import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Pagination, Button } from '@mui/material';
import CourseCard from '../../components/UI/CourseCard';
import dummyCourses from '../../utils/dummyCourses';
import { useNavigate } from 'react-router-dom';
import CourseSearch from '../share/CourseSearch'; // Import component CourseSearch

const CourseList = () => {
    localStorage.removeItem("courses");
    const navigate = useNavigate();
    const [courses, setCourses] = useState(() => {
        const storedCourses = localStorage.getItem('courses');
        return storedCourses ? JSON.parse(storedCourses) : dummyCourses;
    });
    const [page, setPage] = useState(1);
    const coursesPerPage = 8;
    const [searchQuery, setSearchQuery] = useState(""); // State cho tìm kiếm

    // Hàm xử lý thay đổi tìm kiếm
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setPage(1); // Reset page number when search query changes
    };

    // Lọc danh sách courses dựa trên searchQuery
    const filteredCourses = courses.filter(course => {
        return course.className.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const startIndex = (page - 1) * coursesPerPage;
    const endIndex = startIndex + coursesPerPage;
    const currentCourses = filteredCourses.slice(startIndex, endIndex); // Sử dụng filteredCourses
    const [notification, setNotification] = useState("");
    const [notificationType, setNotificationType] = useState("");
    const [notificationError, setNotificationError] = useState("");

    const handleGoBack = () => {
        navigate("/admin/lesson-time-management");
    };

    const handleDeleteCourse = (courseId) => {
        setCourses(prevCourses => {
            const updatedCourses = prevCourses.filter(course => course.id !== courseId);
            localStorage.setItem('courses', JSON.stringify(updatedCourses));
            setNotification("Đã xóa lớp học khỏi trung tâm!");
            setNotificationType("delete");
            setTimeout(() => {
                setNotification(null)
            }, 3000);
            return updatedCourses;
        });
    };

    const handleEditCourse = (editedCourse) => {
        setCourses(prevCourses => {
            const updatedCourses = prevCourses.map(course =>
                course.id === editedCourse.id ? editedCourse : course
            );
            localStorage.setItem('courses', JSON.stringify(updatedCourses));
            return updatedCourses;
        });
        setNotification("Đã chỉnh sửa lớp học thành công!");
        setNotificationType("edit");
        setTimeout(() => {
            setNotification('');
            setNotificationType("");
            setNotificationError("");
        }, 1000);
    };

    const handleEditChange = (event) => {
        // this function is intentionally left blank because handleChange in CourseCard is only called for EditCourseModal
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <Box p={3}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={4}
            >
                <Typography variant="h4" component="h1">
                    Danh Sách Khóa Học
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {/* Thêm component CourseSearch vào đây */}
                    <CourseSearch searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
                    <Button onClick={handleGoBack} variant="outlined" color="primary">
                        Quay lại
                    </Button>
                </div>
            </Box>
            {notification && (
                <div className="bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md mb-4" role="alert">
                    <div className="flex">
                        <div>
                            <p className="text-sm">{notification}</p>
                        </div>
                    </div>
                </div>
            )}
            <Grid container spacing={3}>
                {currentCourses.map(course => {
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
                            <CourseCard
                                course={course}
                                handleDeleteCourse={handleDeleteCourse}
                                handleEditCourse={handleEditCourse}
                                handleChange={handleEditChange}
                                notification={notification}
                                notificationType={notificationType}
                                notificationError={notificationError}
                            />
                        </Grid>
                    )
                })}
            </Grid>
            <Box mt={4} display="flex" justifyContent="center">
                <Pagination
                    count={Math.ceil(filteredCourses.length / coursesPerPage)}
                    page={page}
                    onChange={handleChangePage}
                    color="primary"
                />
            </Box>
        </Box>
    );
};

export default CourseList;