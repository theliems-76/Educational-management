import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, Grid, Pagination, Button } from "@mui/material";
import CourseCard from "./CourseCard";
import {
  getCourses,
  deleteCourse,
  updateCourse,
  searchCourses,
} from "../../apis/courseApi";
import { getTutors } from '../../apis/teacherApi';
import { useNavigate } from "react-router-dom";
import CourseSearch from "../share/CourseSearch";

const CourseList = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const coursesPerPage = 8;
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [notificationError, setNotificationError] = useState("");
  const [tutors, setTutors] = useState([]);

  const fetchCourses = useCallback(async () => {
    try {
      const coursesData = await getCourses();
      setCourses(coursesData);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const tutorsData = await getTutors();
        setTutors(tutorsData);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách giáo viên:", error);
      }
    };

    fetchTutors();
  }, []);

  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setPage(1); // Reset trang về 1 khi tìm kiếm

    try {
      const searchResult = await searchCourses(query);
      setCourses(searchResult);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm khóa học:", error);
      setNotificationError(
        "Không thể tìm kiếm khóa học. Vui lòng thử lại sau."
      );
      setNotificationType("error");
    }
  };

  const handleGoBack = () => {
    navigate("/admin/lesson-time-management");
  };

  const handleDeleteCourse = useCallback(async (courseId) => {
    try {
      await deleteCourse(courseId);
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== courseId)
      );
      setNotification("Đã xóa lớp học khỏi trung tâm!");
      setNotificationType("delete");
      setTimeout(() => {
        setNotification('');
        setNotificationType('');
        setNotificationError('');
      }, 3000);
    } catch (error) {
      console.error("Lỗi khi xóa lớp học:", error);
      setNotificationError(
        error.response?.data?.message || "Xóa lớp học thất bại."
      );
      setNotificationType("error");
    }
  }, []);

  const handleEditCourse = useCallback(
    async (courseId, updatedCourse) => {
      try {
        await updateCourse(courseId, updatedCourse);
        const allCourses = await getCourses();
        setCourses(allCourses);
        setNotification("Đã chỉnh sửa lớp học thành công!");
        setNotificationType("edit");
        setTimeout(() => {
          setNotification('');
          setNotificationType('');
          setNotificationError('');
        }, 3000);
      } catch (error) {
        console.error("Lỗi khi chỉnh sửa lớp học:", error);
        setNotificationError(
          error.response?.data?.message || "Chỉnh sửa lớp học thất bại."
        );
        setNotificationType("error");
      }
    },
    []
  );

  // Lọc danh sách courses dựa trên searchQuery
  const filteredCourses = searchQuery
    ? courses.filter((course) =>
        course.className.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : courses;

  const startIndex = (page - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

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
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <CourseSearch
            searchQuery={searchQuery}
            handleSearchChange={handleSearchChange}
          />
          <Button onClick={handleGoBack} variant="outlined" color="primary">
            Quay lại
          </Button>
        </div>
      </Box>
      {notification && (
        <div
          className={`bg-${
            notificationType === "delete" || notificationType === "error"
              ? "red"
              : "green"
          }-100 border-t-4 border-${
            notificationType === "delete" || notificationType === "error"
              ? "red"
              : "green"
          }-500 rounded-b text-${
            notificationType === "delete" || notificationType === "error"
              ? "red"
              : "green"
          }-900 px-4 py-3 shadow-md mb-4`}
          role="alert"
        >
          <div className="flex">
            <div>
              <p className="text-sm">{notification}</p>
            </div>
          </div>
        </div>
      )}
      <Grid container spacing={3}>
        {currentCourses.map((course) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
            <CourseCard
              course={course}
              handleDeleteCourse={handleDeleteCourse}
              handleEditCourse={handleEditCourse}
              notification={notification}
              notificationType={notificationType}
              notificationError={notificationError}
              setNotification={setNotification}
              setNotificationType={setNotificationType}
              setNotificationError={setNotificationError}
            />
          </Grid>
        ))}
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