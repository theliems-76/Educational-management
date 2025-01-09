import React, { useState } from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import ClassCard from "../../components/UI/ClassCard";

// Dữ liệu mẫu cho các lớp học (thay thế bằng dữ liệu thật từ API)
const teacher_classes = [
  {
    id: 1,
    title: "Math class - 1",
    day: ["Thursday", "Friday"],
    time: "2pm - 4pm",
    image: "/math.png", // Thay bằng ảnh thật
    students: 30,
  },
  {
    id: 2,
    title: "Physics class - 1",
    day: ["Tuesday", "Wednesday"],
    time: "10am - 12pm",
    image: "/physic.png", // Thay bằng ảnh thật
    students: 25,
  },
  {
    id: 3,
    title: "Chemistry class - 1",
    day: ["Monday", "Friday"],
    time: "9am - 11am",
    image: "/chemistry.png", // Thay bằng ảnh thật
    students: 28,
  },
  {
    id: 4,
    title: "English class - 1",
    day: ["Tuesday", "Thursday"],
    time: "3pm - 5pm",
    image: "/english.png", // Thay bằng ảnh thật
    students: 32,
  },
  {
    id: 5,
    title: "Biology class - 1",
    day: ["Monday", "Friday"],
    time: "8am - 10am",
    image: "/biology.png", // Thay bằng ảnh thật
    students: 27,
  },
  {
    id: 6,
    title: "History class - 1",
    day: ["Wednesday", "Friday"],
    time: "2pm - 4pm",
    image: "/math.png", // Thay bằng ảnh thật
    students: 22,
  },
  {
    id: 7,
    title: "Math class - 2",
    day: ["Monday", "Thursday"],
    time: "11am - 1pm",
    image: "/chemistry.png", // Thay bằng ảnh thật
    students: 29,
  },
  {
    id: 8,
    title: "Physics class - 2",
    day: ["Tuesday", "Friday"],
    time: "4pm - 6pm",
    image: "/physic.png", // Thay bằng ảnh thật
    students: 24,
  },
  {
    id: 9,
    title: "Chemistry class - 2",
    day: ["Wednesday", "Saturday"],
    time: "1pm - 3pm",
    image: "/biology.png", // Thay bằng ảnh thật
    students: 26,
  },
  {
    id: 10,
    title: "English class - 2",
    day: ["Monday", "Friday"],
    time: "10am - 12pm",
    image: "/english.png", // Thay bằng ảnh thật
    students: 31,
  },
  {
    id: 11,
    title: "Math class - 3",
    day: ["Tuesday", "Thursday"],
    time: "3pm - 5pm",
    image: "/math.png", // Thay bằng ảnh thật
    students: 33,
  },
  {
    id: 12,
    title: "Physics class - 3",
    day: ["Wednesday", "Friday"],
    time: "9am - 11am",
    image: "/physic.png", // Thay bằng ảnh thật
    students: 21,
  },
  {
    id: 13,
    title: "Chemistry class - 3",
    day: ["Monday", "Thursday"],
    time: "8am - 10am",
    image: "/english.png", // Thay bằng ảnh thật
    students: 23,
  },
  {
    id: 14,
    title: "English class - 3",
    day: ["Tuesday", "Friday"],
    time: "2pm - 4pm",
    image: "/english.png", // Thay bằng ảnh thật
    students: 34,
  },
  {
    id: 15,
    title: "Biology class - 2",
    day: ["Wednesday", "Saturday"],
    time: "11am - 1pm",
    image: "/biology.png", // Thay bằng ảnh thật
    students: 28,
  },
  {
    id: 16,
    title: "History class - 2",
    day: ["Monday", "Thursday"],
    time: "4pm - 6pm",
    image: "/biology.png", // Thay bằng ảnh thật
    students: 20,
  },
  {
    id: 17,
    title: "Geography class - 1",
    day: ["Tuesday", "Friday"],
    time: "9am - 11am",
    image: "/chemistry.png", // Thay bằng ảnh thật
    students: 22,
  },
  {
    id: 18,
    title: "Art class - 1",
    day: ["Monday", "Thursday"],
    time: "2pm - 4pm",
    image: "/math.png", // Thay bằng ảnh thật
    students: 25,
  },
  {
    id: 19,
    title: "Music class - 1",
    day: ["Wednesday", "Saturday"],
    time: "3pm - 5pm",
    image: "/math.png", // Thay bằng ảnh thật
    students: 27,
  },
  {
    id: 20,
    title: "Sports class - 1",
    day: ["Tuesday", "Friday"],
    time: "8am - 10am",
    image: "/math.png", // Thay bằng ảnh thật
    students: 30,
  },
];

function HomePage() {
  const [checkedClasses, setCheckedClasses] = useState({});

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, ml: 4 }}>
        Welcome, Teacher!
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
              My Classes
            </Typography>
            <Button color="primary" size="small">
              See All
            </Button>
          </Box>
          <Grid container spacing={2}>
            {teacher_classes.map((teacher_class) => (
              <Grid item key={teacher_class.id} xs={12} sm={6} md={4} lg={3}>
                <ClassCard
                  id = {teacher_class.id}
                  title={teacher_class.title}
                  day={teacher_class.day}
                  time={teacher_class.time}
                  image={teacher_class.image}
                  numStudents={teacher_class.students}
                  checkedClasses={checkedClasses}
                  setCheckedClasses={setCheckedClasses}
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