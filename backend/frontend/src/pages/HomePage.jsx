import React from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import ProgressCard from '../../components/UI/ProgressCard';
import Timetable from '../../components/UI/Timetable';
import CourseCard from '../../components/UI/CourseCard';
import HomeworkTable from '../../components/UI/HomeworkTable';

// Sample data (Thay thế bằng data thật từ API)
const progressData = [
  { title: 'In Progress', percentage: 67, color: 'primary' },
  { title: 'Completed', percentage: 67, color: 'success' },
  { title: 'Canceled', percentage: 67, color: 'error' },
];

const courses = [
  {
    id: 1,
    title: 'Math class - 1',
    teacher: 'Rora',
    image: 'https://via.placeholder.com/300x200?text=Math', // Replace with actual image paths
  },
  {
    id: 2,
    title: 'Math class - 2',
    teacher: 'Joy',
    image: 'https://via.placeholder.com/300x200?text=Math', // Replace with actual image paths
  },
  // Add more courses here
];

const homeworks = [
  { id: 1, status: 'In progress', name: 'Addition and subtraction', subject: 'Math', teacher: 'Tomy' },
  { id: 2, status: 'Completed', name: 'Addition and subtraction', subject: 'Science', teacher: 'Akanen' },
  { id: 3, status: 'Canceled', name: 'Addition and subtraction', subject: 'History', teacher: 'Vigi' },
  { id: 4, status: 'In progress', name: 'Addition and subtraction', subject: 'Art', teacher: 'Tomas' },
  // Add more homework here
];

function HomePage() {
  return (
          <Grid container spacing={3}>
            {/* Progress Overview */}
            {progressData.map((progress) => (
              <Grid item xs={12} sm={6} md={4} key={progress.title}>
                <ProgressCard
                  title={progress.title}
                  percentage={progress.percentage}
                  color={progress.color}
                />
              </Grid>
            ))}

            {/* Timetable */}
            <Grid item xs={12} md={6}>
              <Timetable />
            </Grid>

            {/* My Courses */}
            <Grid item xs={12} md={6}>
              <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" component="h2">
                  My Courses
                </Typography>
                <Button color="primary" size="small">
                  See All
                </Button>
              </Box>
              <Grid container spacing={2}>
                {courses.map((course) => (
                  <Grid item xs={12} sm={6} key={course.id}>
                    <CourseCard course={course} />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* My Homework */}
            <Grid item xs={12}>
              <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" component="h2">
                  My Homework
                </Typography>
                <Button color="primary" size="small">
                  See All
                </Button>
              </Box>
              <HomeworkTable homeworks={homeworks} />
            </Grid>
          </Grid>
  );
}

export default HomePage;