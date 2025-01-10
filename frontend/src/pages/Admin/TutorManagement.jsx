import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import TutorList from '../../components/UI/TutorList';
import { getTutors } from '../../apis/teacherApi';

function TutorManagement() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const teachersData = await getTutors();
        setTeachers(teachersData);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách giáo viên:', error);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Danh sách giáo viên
        </Typography>
      </Box>
      <TutorList teachers={teachers} setTeachers={setTeachers} />
    </Box>
  );
}

export default TutorManagement;