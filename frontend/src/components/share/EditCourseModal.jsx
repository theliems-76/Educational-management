import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Grid,
  Typography,
  Checkbox,
  ListItemText,
  Box,
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format, parse } from 'date-fns';
import { vi } from 'date-fns/locale';
import { getTutors } from '../../apis/teacherApi';

const EditCourseModal = ({
  isModalOpen,
  handleCloseModal,
  handleEditSubmit,
  editCourse,
  notification,
  notificationType,
  notificationError,
}) => {
  const daysOfWeek = [
    'Thứ 2',
    'Thứ 3',
    'Thứ 4',
    'Thứ 5',
    'Thứ 6',
    'Thứ 7',
  ];

  const [formData, setFormData] = useState({
    className: '',
    teacherId: '',
    classSize: 0,
    tuitionFee: '',
    schedule: [],
    startDate: '',
  });

  const [selectedDates, setSelectedDates] = useState({});
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const tutorsData = await getTutors();
        setTutors(tutorsData);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách giáo viên:', error);
      }
    };

    fetchTutors();
  }, []);

  useEffect(() => {
    if (editCourse) {
      setFormData({
        className: editCourse.className || '',
        teacherId: editCourse.teacherId || '',
        classSize: editCourse.classSize || 0,
        tuitionFee: editCourse.tuitionFee || '',
        schedule: editCourse.schedule || [],
        startDate: editCourse.startDate || '',
      });

      const initialDates = {};
      if (Array.isArray(editCourse.schedule)) {
        editCourse.schedule.forEach((item) => {
          initialDates[item.dayOfWeek] = item.startTime
            ? parse(item.startTime, 'HH:mm', new Date())
            : null;
        });
      }
      setSelectedDates(initialDates);
    }
  }, [editCourse]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date, dayOfWeek) => {
    setSelectedDates((prev) => ({
      ...prev,
      [dayOfWeek]: date,
    }));
  };

  const handleTimeChange = (dayOfWeek, field) => (time) => {
    setFormData((prev) => {
      const existingSchedule = prev.schedule.find(
        (item) => item.dayOfWeek === dayOfWeek
      );
      const newSchedule = existingSchedule
        ? {
            ...existingSchedule,
            [field]: time ? format(time, 'HH:mm') : null,
          }
        : { dayOfWeek, startTime: null, endTime: null, [field]: time };

      const updatedSchedule = prev.schedule.filter(
        (item) => item.dayOfWeek !== dayOfWeek
      );
      return {
        ...prev,
        schedule: [...updatedSchedule, newSchedule],
      };
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const scheduleWithFormattedTimes = formData.schedule.map((item) => ({
      ...item,
      startTime: item.startTime ? format(item.startTime, 'HH:mm') : null,
      endTime: item.endTime ? format(item.endTime, 'HH:mm') : null,
    }));

    const updatedCourse = {
      ...editCourse,
      ...formData,
      schedule: scheduleWithFormattedTimes,
    };

    handleEditSubmit(updatedCourse);
    handleCloseModal();
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 ${
        isModalOpen ? 'block' : 'hidden'
      }`}
    >
      <div className="bg-white p-8 rounded shadow-lg w-4/5 max-w-4xl relative">
        <h2 className="text-2xl font-bold mb-4">Chỉnh Sửa Lớp Học</h2>
        {/* ... (hiển thị thông báo) ... */}
        <form onSubmit={handleFormSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <TextField
              fullWidth
              label="Tên Lớp"
              name="className"
              value={formData.className}
              onChange={handleFormChange}
              margin="normal"
              required
            />
          </div>
          <div>
            <FormControl fullWidth margin="normal">
              <InputLabel id="teacherId-label">Giáo Viên</InputLabel>
              <Select
                labelId="teacherId-label"
                id="teacherId"
                name="teacherId"
                value={formData.teacherId}
                onChange={handleFormChange}
                label="Giáo Viên"
                required
              >
                {tutors.map((tutor) => (
                  <MenuItem key={tutor.id} value={tutor.id}>
                    {tutor.user.username}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <TextField
              fullWidth
              label="Sĩ số"
              name="classSize"
              type="number"
              value={formData.classSize}
              onChange={handleFormChange}
              margin="normal"
              required
              inputProps={{ min: 0 }}
            />
          </div>
          <div>
            <TextField
              fullWidth
              label="Học phí / tháng"
              name="tuitionFee"
              value={formData.tuitionFee}
              onChange={handleFormChange}
              margin="normal"
              required
            />
          </div>
          <div className="col-span-2">
            <Typography variant="subtitle1" gutterBottom>
              Lịch học
            </Typography>
            <Grid container spacing={2}>
              {daysOfWeek.map((dayOfWeek) => (
                <Grid item xs={12} sm={4} key={dayOfWeek}>
                  <Typography variant="subtitle2">{dayOfWeek}</Typography>
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    locale={vi}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <TimePicker
                        label="Bắt đầu"
                        value={
                          formData.schedule.find(
                            (s) => s.dayOfWeek === dayOfWeek
                          )?.startTime || null
                        }
                        onChange={handleTimeChange(dayOfWeek, 'startTime')}
                        renderInput={(params) => <TextField {...params} />}
                      />
                      <TimePicker
                        label="Kết thúc"
                        value={
                          formData.schedule.find(
                            (s) => s.dayOfWeek === dayOfWeek
                          )?.endTime || null
                        }
                        onChange={handleTimeChange(dayOfWeek, 'endTime')}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Box>
                  </LocalizationProvider>
                </Grid>
              ))}
            </Grid>
          </div>
          <div>
            <TextField
              fullWidth
              label="Ngày bắt đầu"
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleFormChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </div>
          <div className="col-span-2 flex justify-end">
            <Button
              onClick={handleCloseModal}
              variant="outlined"
              color="secondary"
              sx={{ mr: 2 }}
            >
              Hủy
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Cập nhật
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourseModal;