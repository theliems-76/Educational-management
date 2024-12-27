import React, { useState } from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import StudentNote from "../../components/UI/StudentNote";
import { styled } from '@mui/material/styles';
import { NavLink } from "react-router-dom";
import LessonTable from "../../components/UI/LessonTable"; // Import LessonTable

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));
const courses = [
    {
        id: 1,
        name: "Thiết kế và phát triển ứng dụng",
        startDate: "01/01/2015",
        dueDate: "10/15/2018",
        tutor: "10/15/2018",
        price: "+$125",
    },
    {
        id: 2,
        name: "Trang chi tiết cà phê - Trang chính",
        startDate: "21/07/2016",
        dueDate: "12/05/2018",
        tutor: "12/05/2018",
        price: "+$125",
    },
    {
         id: 3,
        name: "Thiết kế minh họa poster",
        startDate: "18/03/2018",
        dueDate: "28/09/2018",
        tutor: "28/09/2018",
        price: "+$125",
    },
    {
        id: 4,
        name: "Đồ họa chai nước uống",
        startDate: "02/10/2017",
        dueDate: "07/05/2018",
         tutor: "07/05/2018",
        price: "+$125",
    },
    {
        id: 5,
        name: "Thiết kế trang đích - Trang chủ",
        startDate: "17/01/2017",
        dueDate: "25/05/2021",
        tutor: "25/05/2021",
        price: "+$125",
    },
  ];
// Dữ liệu mẫu (thay thế bằng dữ liệu thật từ API)
const students = [
    {
        id: 1,
        name: "Rora",
        avatar: "/images/avatar/sample-avatar-1.jpg",
        course: "Math 3 course",
        time: "11:30 - 12:30",
        tag: "TECHNOLOGY",
        status: "In progress"
    },
    {
        id: 2,
        name: "Minhee",
        avatar: "/images/avatar/sample-avatar-2.jpg",
        course: "Math 3 course",
        time: "11:30 - 12:30",
        tag: "TECHNOLOGY",
        status: "In progress"
    },
    {
        id: 3,
        name: "Minhee",
        avatar: "/images/avatar/sample-avatar-2.jpg",
        course: "Math 3 course",
        time: "11:30 - 12:30",
        tag: "TECHNOLOGY",
        status: "In progress"
    },
    {
        id: 4,
        name: "Minhee",
        avatar: "/images/avatar/sample-avatar-2.jpg",
        course: "Math 3 course",
        time: "11:30 - 12:30",
        tag: "TECHNOLOGY",
        status: "In progress"
    },
    {
        id: 5,
        name: "Minhee",
        avatar: "/images/avatar/sample-avatar-2.jpg",
        course: "Math 3 course",
        time: "11:30 - 12:30",
        tag: "TECHNOLOGY",
        status: "In progress"
    },
    {
        id: 6,
        name: "Minhee",
        avatar: "/images/avatar/sample-avatar-2.jpg",
        course: "Math 3 course",
        time: "11:30 - 12:30",
        tag: "TECHNOLOGY",
        status: "In progress"
    },
    // ... Thêm student
];

function StudentManagement() {
    const [showAllStudents, setShowAllStudents] = useState(false);

    // Hiển thị tối đa 4 học sinh đầu tiên
    const displayedStudents = showAllStudents ? students : students.slice(0, 4);
    return (
        <Box p={3}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={4}
            >
                <Typography variant="h4" component="h1">
                    Student
                </Typography>
                {students.length > 4 && (
                    <StyledNavLink to="/dashboard/student-list">
                        <Button color="primary" size="small" >
                            See All
                        </Button>
                    </StyledNavLink>
                )}
            </Box>
            <Grid container spacing={3} mb={4} >
                {displayedStudents.map((student) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={student.id} sx={{ display: "flex", justifyContent: "center" }}>
                        <StudentNote student={student} />
                    </Grid>
                ))}
            </Grid>
            <Grid container spacing={3}>
                 <Grid item xs={12} sm={12} md={12} lg={12} >
                     <LessonTable courses={courses} /> {/* Truyền courses vào LessonTable */}
                 </Grid>
             </Grid>
         </Box>
     );
 }

export default StudentManagement;