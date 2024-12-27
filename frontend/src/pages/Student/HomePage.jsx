import React, { useState } from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import CourseCard from "../../components/UI/CourseCard";

// Dữ liệu mẫu cho các khóa học (thay thế bằng dữ liệu thật từ API)
const courses = [
  {
    id: 1,
    title: "Math class - 1",
    teacher: "Rora",
    image: "/math.png", // Thay bằng ảnh thật
  },
  {
    id: 2,
    title: "Physic class - 1",
    teacher: "John Doe",
    image: "/physic.png", // Thay bằng ảnh thật
  },
  {
    id: 3,
    title: "Chemistry Class - 1",
    teacher: "Jane Smith",
    image: "/chemistry.png", // Thay bằng ảnh thật
  },
  {
    id: 4,
    title: "English Class - 1",
    teacher: "David Lee",
    image: "/english.png", // Thay bằng ảnh thật
  },
];

function HomePage() {
  const [checkedCourses, setCheckedCourses] = useState({});

  const handleAddCourse = (courseId) => {
    console.log("Add course:", courseId);
    setCheckedCourses((prev) => ({ ...prev, [courseId]: true }));
  };

  const handleRemoveCourse = (courseId) => {
    console.log("Remove course:", courseId);
    setCheckedCourses((prev) => ({ ...prev, [courseId]: false }));
  };

  const handleCheckCourse = (courseId) => {
    console.log("Check course:", courseId);
    setCheckedCourses((prev) => ({ ...prev, [courseId]: true }));
  };

  const handleUncheckCourse = (courseId) => {
    console.log("Uncheck course:", courseId);
    setCheckedCourses((prev) => ({ ...prev, [courseId]: false }));
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, ml: 4 }}>
        Welcome, Student!
      </Typography>
      <Grid container spacing={3} sx={{pl: 4}}>
        <Grid item xs={12}>
          <Box
            mb={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" component="h2">
              My Courses
            </Typography>
            <Button color="primary" size="small">
              See All
            </Button>
          </Box>
          <Grid container spacing={2}>
            {courses.map((course) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
                <CourseCard
                  course={course}
                  onAdd={() => handleAddCourse(course.id)}
                  onRemove={() => handleRemoveCourse(course.id)}
                  onCheck={() => handleCheckCourse(course.id)}
                  onUncheck={() => handleUncheckCourse(course.id)}
                  isChecked={checkedCourses[course.id]}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        {/* Thêm các phần khác của trang chủ (nếu cần) */}
      </Grid>
    </Box>
  );
}

export default HomePage;