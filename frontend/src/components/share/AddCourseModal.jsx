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
  OutlinedInput ,
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format, parse } from 'date-fns';
import { vi } from 'date-fns/locale';

const AddCourseModal = ({
  isModalOpen,
  handleCloseModal,
  handleSubmit,
  handleAddChange,
  newCourse,
  notification,
  notificationType,
  notificationError,
  tutors,
}) => {
  const daysOfWeek = [
    'Thứ 2',
    'Thứ 3',
    'Thứ 4',
    'Thứ 5',
    'Thứ 6',
    'Thứ 7',
  ];

  const [selectedDates, setSelectedDates] = useState({});

  // Cập nhật lại selectedDates mỗi khi newCourse.schedule thay đổi
  useEffect(() => {
    const dates = {};
    newCourse.schedule.forEach((item) => {
      dates[item.dayOfWeek] = {
        startTime: item.startTime ? parse(item.startTime, 'HH:mm', new Date()) : null,
        endTime: item.endTime ? parse(item.endTime, 'HH:mm', new Date()) : null
      };
    });
    setSelectedDates(dates);
  }, [newCourse.schedule]);

  const handleDayChange = (event) => {
    const {
      target: { value },
    } = event;
    const selectedDays = typeof value === 'string' ? value.split(',') : value;
  
    // Cập nhật newCourse.schedule dựa trên selectedDays và selectedDates
    const updatedSchedule = selectedDays.map((day) => {
      const existingSchedule = newCourse.schedule.find((item) => item.dayOfWeek === day);
      return {
        dayOfWeek: day,
        startTime: existingSchedule?.startTime || null,
        endTime: existingSchedule?.endTime || null,
      };
    });
  
    // Cập nhật newCourse với schedule mới
    handleAddChange({
      target: {
        name: 'schedule',
        value: updatedSchedule,
      },
    });
  };

  const handleTimeChange = (day, field) => (time) => {
    setNewCourse((prev) => {
      const updatedSchedule = prev.schedule.map((scheduleItem) => {
        if (scheduleItem.dayOfWeek === day) {
          return {
            ...scheduleItem,
            [field]: time ? format(time, 'HH:mm') : null,
          };
        }
        return scheduleItem;
      });
  
      return {
        ...prev,
        schedule: updatedSchedule,
      };
    });
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 ${isModalOpen ? 'block' : 'hidden'}`}
    >
      <div className="bg-white p-8 rounded shadow-lg w-4/5 max-w-4xl relative">
        <h2 className="text-2xl font-bold mb-4">Thêm Lớp Học</h2>
        {notificationError && notificationType === 'add' && (
          <div className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md mb-4" role="alert">
            <div className="flex">
              <div>
                <p className="text-sm">{notificationError}</p>
              </div>
            </div>
          </div>
        )}
        {notification && notificationType === 'add' && (
          <div className="bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md mb-4" role="alert">
            <div className="flex">
              <div>
                <p className="text-sm">{notification}</p>
              </div>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <TextField
              fullWidth
              label="Tên Lớp"
              name="className"
              value={newCourse.className}
              onChange={handleAddChange}
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
                value={newCourse.teacherId}
                onChange={handleAddChange}
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
              value={newCourse.classSize}
              onChange={handleAddChange}
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
              value={newCourse.tuitionFee}
              onChange={handleAddChange}
              margin="normal"
              required
            />
          </div>
          <div className="col-span-2">
            <FormControl fullWidth margin="normal">
              <InputLabel id="schedule-label">Lịch học</InputLabel>
              <Select
                labelId="schedule-label"
                id="schedule"
                multiple
                value={newCourse.schedule.map((item) => item.dayOfWeek)}
                onChange={handleDayChange}
                input={<OutlinedInput label="Lịch học" />} // Sửa ở đây
                renderValue={(selected) => selected.join(', ')}
              >
                {daysOfWeek.map((day) => (
                  <MenuItem key={day} value={day}>
                    <Checkbox
                      checked={newCourse.schedule.some(
                        (item) => item.dayOfWeek === day
                      )}
                    />
                    <ListItemText primary={day} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Grid container spacing={2} mt={1}>
              {newCourse.schedule.map((daySchedule) => (
                <Grid item xs={12} sm={4} key={daySchedule.dayOfWeek}>
                  <Typography variant="subtitle2">{daySchedule.dayOfWeek}</Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns} locale={vi}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <TimePicker
                        label="Bắt đầu"
                        value={
                          daySchedule.startTime
                            ? parse(daySchedule.startTime, 'HH:mm', new Date())
                            : null
                        }
                        onChange={(time) => handleTimeChange(daySchedule.dayOfWeek, 'startTime', time)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                      <TimePicker
                        label="Kết thúc"
                        value={
                          daySchedule.endTime
                            ? parse(daySchedule.endTime, 'HH:mm', new Date())
                            : null
                        }
                        onChange={(time) => handleTimeChange(daySchedule.dayOfWeek, 'endTime', time)}
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
              value={newCourse.startDate}
              onChange={handleAddChange}
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
              Thêm Lớp Học
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseModal;