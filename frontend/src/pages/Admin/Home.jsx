import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import LessonCard from '../../components/UI/LessonCard';
import InvoiceList from '../../components/UI/InvoiceList';
import TutorsPaymentChart from '../../components/UI/TutorsPaymentChart';
import DefaultLessonFee from '../../components/UI/DefaultLessonFee';
import ReviewRequest from '../../components/UI/ReviewRequest';
import axios from 'axios';

function AdminHome() {
  const [lessons, setLessons] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [lessonFees, setLessonFees] = useState([]);
  const [reviews, setReviews] = useState([]);
  const vatTax = 24;
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Thay thế URL bằng các endpoint API thực tế của bạn
        const lessonsResponse = await axios.get('http://localhost:8080/api/lessons');
        setLessons(lessonsResponse.data);

        const invoicesResponse = await axios.get('http://localhost:8080/api/invoices');
        setInvoices(invoicesResponse.data);

        const chartDataResponse = await axios.get('http://localhost:8080/api/chartdata');
        setChartData(chartDataResponse.data);

        const lessonFeesResponse = await axios.get('http://localhost:8080/api/lessonfees');
        setLessonFees(lessonFeesResponse.data);

        // Tính tổng tiền dựa trên lessonFees
        const total = lessonFeesResponse.data.reduce((sum, fee) => {
          return fee.checked ? sum + fee.fee : sum;
        }, 0);
        setTotalAmount(total + (total * vatTax) / 100);

        const reviewsResponse = await axios.get('http://localhost:8080/api/reviews');
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi cho người dùng
      }
    };

    fetchData();
  }, []);

  return (
    <Grid container spacing={3}>
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
          {lessons.map((lesson) => (
            <Grid item xs={12} sm={4} key={lesson.id}>
              <LessonCard lesson={lesson} />
            </Grid>
          ))}
        </Grid>
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
  );
}

export default AdminHome;