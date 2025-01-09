import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import StudentList from "../../components/UI/StudentList";
import { getStudents } from '../../apis/studentApi';

function StudentManagement() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsData = await getStudents();
        setStudents(studentsData);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách học viên:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <Box p={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4" component="h1">
          Danh sách học viên
        </Typography>
      </Box>
      <StudentList students={students} setStudents={setStudents} />
    </Box>
  );
}

export default StudentManagement;