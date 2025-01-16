import React, { useState, useCallback, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import CourseCard from '../../components/UI/CourseCard';
import { useNavigate } from 'react-router-dom';
import AddCourseModal from '../../components/share/AddCourseModal';
import { getCourses, addCourse, updateCourse, deleteCourse } from '../../apis/courseApi';
import { getTutors } from '../../apis/teacherApi';

function LessonTimeManagement() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [tutors, setTutors] = useState([]);
  const [newCourse, setNewCourse] = useState({
    className: '',
    teacherId: '',
    classSize: '',
    schedule: [],
    tuitionFee: '',
    startDate: '',
  });
  const [notification, setNotification] = useState('');
  const [notificationType, setNotificationType] = useState('');
  const [notificationError, setNotificationError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesData = await getCourses();
        setCourses(coursesData);
        const tutorsData = await getTutors();
        setTutors(tutorsData);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        setNotificationError('Không thể lấy dữ liệu. Vui lòng thử lại sau.');
        setNotificationType('error');
      }
    };

    fetchData();
  }, []);

  const visibleCourses = showAll ? courses : courses.slice(0, 4);

  const handleSeeMore = useCallback(() => {
    setShowAll((prevShowAll) => !prevShowAll);
    if (!showAll) {
      navigate('/admin/lesson-time-management/courselist');
    }
  }, [showAll, navigate]);

  const handleOpenModal = useCallback(() => {
    setIsAddModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsAddModalOpen(false);
    setNewCourse({
      className: '',
      teacherId: '',
      classSize: '',
      schedule: [],
      tuitionFee: '',
      startDate: '',
    });
    resetNotification();
  }, []);

  const handleAddChange = useCallback((event) => {
    const { name, value } = event.target;
    setNewCourse((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleAddSchedule = useCallback((newSchedule) => {
    setNewCourse((prev) => ({ ...prev, schedule: newSchedule }));
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const addedCourse = await addCourse(newCourse);
        setCourses((prevCourses) => [...prevCourses, addedCourse]);
        setNotification('Đã thêm lớp học mới!');
        setNotificationType('add');
        setTimeout(handleCloseModal, 1000);
      } catch (error) {
        console.error('Lỗi khi thêm lớp học:', error);
        setNotificationError(
          error.response?.data?.message || 'Thêm lớp học thất bại.'
        );
        setNotificationType('error');
      }
    },
    [newCourse, handleCloseModal]
  );

  const handleDeleteCourse = useCallback(
    async (courseId) => {
      try {
        await deleteCourse(courseId);
        setCourses((prevCourses) =>
          prevCourses.filter((course) => course.id !== courseId)
        );
        setNotification('Đã xóa lớp học khỏi trung tâm!');
        setNotificationType('delete');
        setTimeout(resetNotification, 3000);
      } catch (error) {
        console.error('Lỗi khi xóa lớp học:', error);
        setNotificationError(
          error.response?.data?.message || 'Xóa lớp học thất bại.'
        );
        setNotificationType('error');
      }
    },
    []
  );

  const handleEditCourse = useCallback(
    async (courseId, updatedCourse) => {
      try {
        await updateCourse(courseId, updatedCourse);
        setCourses((prevCourses) =>
          prevCourses.map((course) =>
            course.id === courseId ? updatedCourse : course
          )
        );
        setNotification('Đã chỉnh sửa lớp học thành công!');
        setNotificationType('edit');
        setTimeout(resetNotification, 3000);
      } catch (error) {
        console.error('Lỗi khi chỉnh sửa lớp học:', error);
        setNotificationError(
          error.response?.data?.message || 'Chỉnh sửa lớp học thất bại.'
        );
        setNotificationType('error');
      }
    },
    []
  );

  const resetNotification = useCallback(() => {
    setNotification('');
    setNotificationType('');
    setNotificationError('');
  }, []);

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Quản Lý Thời Gian Biểu
        </Typography>
        <Button onClick={handleOpenModal} variant="contained" color="primary">
          Thêm Lớp Học
        </Button>
      </Box>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(245px, 1fr))',
          gap: '16px',
          paddingBottom: '16px',
          maxWidth: '100%',
        }}
      >
        {visibleCourses.map((course) => (
          <CourseCard
            key={course.id}
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
        ))}
      </div>
      {courses.length > 4 && (
        <Box mt={2} display="flex" justifyContent="center">
          <Button onClick={handleSeeMore} variant="outlined" color="primary">
            {showAll ? 'Thu gọn' : 'Xem thêm'}
          </Button>
        </Box>
      )}
      <AddCourseModal
        isModalOpen={isAddModalOpen}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
        handleChange={handleAddChange}
        newCourse={newCourse}
        notification={notification}
        notificationType={notificationType}
        notificationError={notificationError}
        tutors={tutors}
        onScheduleChange={handleAddSchedule}
      />
    </Box>
  );
}

export default LessonTimeManagement;