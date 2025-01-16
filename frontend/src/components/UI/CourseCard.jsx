import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Badge,
  styled,
  Button,
} from '@mui/material';
import {
  Person,
  AccessTime,
  Group,
  Book,
  Delete,
  Edit,
  Visibility,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import DeleteCourseModal from '../share/DeleteCourseModal';
import EditCourseModal from '../share/EditCourseModal';
import { getTutorById } from '../../apis/teacherApi';

const NewBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#ed0b4c',
    color: 'white',
    padding: '0 4px',
    borderRadius: '8.93px 0px 8.93px 0px',
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: '24px',
  },
}));

const avatarImages = [
  '/math.png',
  '/english.png',
  '/chemistry.png',
  '/physic.png',
  '/biology.png',
];

function CourseCard({
  course,
  handleDeleteCourse,
  handleEditCourse,
  setNotification,
  setNotificationType,
  setNotificationError,
}) {
  const navigate = useNavigate();
  const [randomAvatar, setRandomAvatar] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [teacherName, setTeacherName] = useState('Unknown Teacher');

  useEffect(() => {
    const fetchTeacherName = async () => {
      if (course.teacherId) {
        try {
          const teacher = await getTutorById(course.teacherId);
          // Kiểm tra nếu user tồn tại trước khi truy cập username
          setTeacherName(teacher.user && teacher.user.username ? teacher.user.username : 'Unknown Teacher');
        } catch (error) {
          console.error('Lỗi khi lấy thông tin giáo viên:', error);
          setTeacherName('Unknown Teacher'); // Đặt giá trị mặc định nếu có lỗi
        }
      }
    };

    fetchTeacherName();
  }, [course.teacherId]);

  useEffect(() => {
    if (!course.image && !randomAvatar) {
      const randomIndex = Math.floor(Math.random() * avatarImages.length);
      setRandomAvatar(avatarImages[randomIndex]);
    }
  }, [course.image, randomAvatar]);

  const handleOpenEditModal = (event) => {
    event.stopPropagation();
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleOpenDeleteModal = (event) => {
    event.stopPropagation();
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    handleDeleteCourse(course.id);
    setOpenDeleteModal(false);
  };

  const handleViewDetails = () => {
    navigate(
      `/admin/lesson-time-management/courselist/course-infor/${course.id}`
    );
  };

  // Tạo chuỗi hiển thị cho lịch học
  const scheduleString = course.schedule
    ? course.schedule
        .map(
          (item) =>
            `${item.dayOfWeek} ${item.startTime} - ${item.endTime}`
        )
        .join(', ')
    : '';

  return (
    <Card
      className="w-[245px] bg-white rounded-[10px] border border-[#dde1e6] flex-col justify-start items-center inline-flex overflow-hidden shadow-md cursor-pointer"
      onClick={handleViewDetails}
    >
      <div className="self-stretch h-40 bg-[#dde1e6] justify-start items-start inline-flex overflow-hidden relative">
        <CardMedia
          component="img"
          image={course.image || randomAvatar}
          alt={course.className}
          className="w-full h-full object-cover"
        />
        {course.isNew && (
          <NewBadge
            badgeContent={'New'}
            color="primary"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              '& .MuiBadge-badge': {
                padding: '0 4px',
                borderBottomRightRadius: '8.93px',
                borderTopLeftRadius: '8.93px',
              },
            }}
          />
        )}
      </div>
      <div
        className="self-stretch p-4 bg-white flex-col justify-start items-start gap-1.5 flex"
        style={{ minHeight: '150px' }}
      >
        <Typography className="text-[#001d6c] text-base font-normal font-['Poppins'] flex items-center gap-1">
          <Person fontSize="small" /> {teacherName}
        </Typography>
        <Typography className="text-[#001d6c] text-base font-semibold font-['Poppins'] flex items-center gap-1">
          <Book fontSize="small" /> {course.className}
        </Typography>
        <Typography className="text-[#001d6c] text-sm font-normal font-['Poppins'] flex place-items-start gap-1">
          <AccessTime fontSize="small" /> Lịch học: {scheduleString}
        </Typography>
        <div className="self-stretch justify-start items-center inline-flex mt-auto">
          <Button
            onClick={handleOpenDeleteModal}
            variant="outlined"
            color="error"
            style={{ marginLeft: '0px', marginRight: 'auto' }}
          >
            <Delete fontSize="small" style={{ marginRight: '4px' }} /> Xóa lớp
          </Button>
          <Button
            onClick={handleOpenEditModal}
            variant="outlined"
            color="success"
          >
            <Edit fontSize="small" style={{ marginRight: '4px' }} /> Sửa
          </Button>
        </div>
      </div>
      <DeleteCourseModal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDelete}
        course={course}
      />
      <EditCourseModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSave={handleEditCourse}
        course={course}
      />
    </Card>
  );
}

export default CourseCard;