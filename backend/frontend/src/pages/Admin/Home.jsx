import React from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import StudentCard from "../../components/UI/StudentCard";
import TutorCard from "../../components/UI/TutorCard";
import LessonCard from "../../components/UI/LessonCard";
import InvoiceList from "../../components/UI/InvoiceList";
import TutorsPaymentChart from "../../components/UI/TutorsPaymentChart";
import DefaultLessonFee from "../../components/UI/DefaultLessonFee";
import ReviewRequest from "../../components/UI/ReviewRequest";

// Dữ liệu mẫu (thay thế bằng dữ liệu thật từ API)
const students = [
  {
    id: 1,
    name: "Rora",
    avatar: "/images/avatar/sample-avatar-1.jpg", // Thay bằng ảnh thật
    course: "Math 3 course",
    time: "11:30 - 12:30",
    tag: "TECHNOLOGY",
    status: "In progress"
  },
  {
    id: 2,
    name: "Minhee",
    avatar: "/images/avatar/sample-avatar-2.jpg", // Thay bằng ảnh thật
    course: "Math 3 course",
    time: "11:30 - 12:30",
    tag: "TECHNOLOGY",
    status: "In progress"
  },
  // ... Thêm student
];

const tutors = [
  {
    id: 1,
    name: "Rora",
    avatar: "/images/avatar/sample-avatar-3.jpg", // Thay bằng ảnh thật
    course: "Math 3 course",
    time: "11:30 - 12:30",
    tag: "TECHNOLOGY",
    status: "In progress"
  },
  {
    id: 2,
    name: "Minhee",
    avatar: "/images/avatar/sample-avatar-4.jpg", // Thay bằng ảnh thật
    course: "Math 3 course",
    time: "11:30 - 12:30",
    tag: "TECHNOLOGY",
    status: "In progress"
  },
  // ... Thêm tutor
];

const lessons = [
    { id: 1, tag: "TECHNOLOGY", status: "In progress", title: "ARTIFICAL INTELLIGENCE" },
    { id: 2, tag: "TECHNOLOGY 2", status: "Completed", title: "" },
    { id: 3, tag: "HISTORY OF ART", status: "In progress", title: "" },
];
const invoices = [
    { billFrom: "Mauro Sicard", billTo: "BRIX Agency", number: "001027", issued: "June 26, 2024", due: "July 26, 2024", amount: "$ 1,570.00" },
    { billFrom: "minhee", billTo: "Mauro Sicard", number: "003027", issued: "June 26, 2024", due: "July 26, 2024", amount: "$ 2,570.00" },
    { billFrom: "BRIX Agency", billTo: "Rora", number: "000021", issued: "June 20, 2024", due: "July 20, 2024", amount: "$ 1,000.00" },
    { billFrom: "Mauro Sicard", billTo: "Suzi", number: "000047", issued: "June 13, 2024", due: "July 13, 2024", amount: "$ 190.00" },
    { billFrom: "Joy Cho", billTo: "Ostin", number: "000025", issued: "June 06, 2024", due: "July 06, 2024", amount: "$ 5,370.00" },
];

const chartData = [
  { name: '17 Sun', student: 2000, tutor: 1800 },
  { name: '18 Mon', student: 3000, tutor: 1398 },
  { name: '19 Tue', student: 1800, tutor: 3800 },
  { name: '20 Wed', student: 2780, tutor: 3908 },
  { name: '21 Thu', student: 1890, tutor: 4800 },
  { name: '22 Fri', student: 2390, tutor: 3800 },
  { name: '23 Sat', student: 3490, tutor: 4300 },
];

const lessonFees = [
  { name: "Branding", checked: true, fee: 30 },
  { name: "Marketing", checked: true, fee: 75 },
  { name: "App Building", checked: false, fee: 125 },
];

const vatTax = 24;

const totalAmount = 99;

const reviews = [
  {
    avatar: "/images/avatar/sample-avatar-5.jpg",
    name: "Rora",
    rating: 5,
    comment: "Great product! Highly recommended!",
  },
  {
    avatar: "/images/avatar/sample-avatar-6.jpg",
    name: "Joy",
    rating: 4,
    comment: "Good quality, fast delivery.",
  },
  // ... Thêm review
];

function AdminHome() {
  return (
    <Box p={3}>
      <Grid container spacing={3} sx={{width: "100%", m: 0}}>
        <Grid item xs={12} md={6}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6" component="h2">
              Học viên
            </Typography>
            <Button color="primary" size="small">
              Xem tất cả
            </Button>
          </Box>
          <Grid container spacing={2}>
            {students.map((student) => (
              <Grid item xs={12} sm={6} key={student.id}>
                <StudentCard student={student} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6" component="h2">
              Giáo viên
            </Typography>
            <Button color="primary" size="small">
              Xem tất cả
            </Button>
          </Box>
          <Grid container spacing={2}>
            {tutors.map((tutor) => (
              <Grid item xs={12} sm={6} key={tutor.id}>
                <TutorCard tutor={tutor} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={12}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6" component="h2">
              Quản lí lịch học
            </Typography>
            <Button color="primary" size="small">
              Xem tất cả
            </Button>
          </Box>
          <Grid container spacing={2}>
            {lessons.map((lesson, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <LessonCard lesson={lesson} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          {/* Placeholder for future content or remove if not needed */}
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" component="h2" gutterBottom>
            Thanh toán cho giáo viên
          </Typography>
          <TutorsPaymentChart data={chartData} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" component="h2" gutterBottom>
            Hóa đơn
          </Typography>
          <InvoiceList invoices={invoices} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" component="h2" gutterBottom>
            Học phí
          </Typography>
          <DefaultLessonFee fees={lessonFees} vat={vatTax} total={totalAmount} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" component="h2" gutterBottom>
            Ý kiến đánh giá
          </Typography>
          <Grid container spacing={2}>
            {reviews.map((review, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <ReviewRequest review={review} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminHome;