import React, { useState } from 'react';
import {
  TextField,
  Typography,
  Avatar,
  Box,
  Select,
  MenuItem,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

// Dữ liệu giả cho học viên
const initialStudentData = {
  id: "20210101",
  name: 'Alexa Rawles',
  password: 'password123',
  email: 'alexarawles@gmail.com',
  phone: '0901234567',
  gender: '',
  school: '',
  class: '',
  birthday: null,
  fullName: '',
  avatar: 'https://via.placeholder.com/100x100',
};

function StudentProfile() {
  const [studentData, setStudentData] = useState(initialStudentData);
  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleGenderChange = (event) => {
    setStudentData({ ...studentData, gender: event.target.value });
  };

  const handleBirthdayChange = (date) => {
    setStudentData({ ...studentData, birthday: date });
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleAddEmailClick = () => {
    alert("Thêm Email");
  };

    const renderDate = (date) => {
        return date ? format(date, 'dd/MM/yyyy', { locale: vi}) : null;
    };

  return (
    <div className="w-[1282px] h-[856px] bg-white rounded-[10px]">
      <div className="absolute top-0 left-0 w-full h-[150px] bg-gradient-to-r from-[#fce3c7] to-[#a5a1d1] ">
      </div>
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
              <Avatar
                alt={studentData.name}
                src={studentData.avatar}
                sx={{ width: 100, height: 100, mr: 2 }}
              />
              <Box>
                <Typography variant="h6" className="text-black font-medium">{studentData.name}</Typography>
                <Typography variant="body2" className="text-black opacity-50">{studentData.email}</Typography>
              </Box>
        </div>
        <Button
              variant="contained"
              className=""
              sx={{ borderRadius: "8px", textTransform: "none", p: "10px 20px" }}
              onClick={handleEditClick}
            >
              {editMode ? "Lưu" : "Chỉnh sửa"}
        </Button>
      </div>
      <div className="flex">
        <div className="w-1/2 p-4 bg-[#F9F9F9]">
             <div className="flex items-start mb-4">
                <div className="w-1/2 pr-2">
                    <Typography variant="body1" className="opacity-80 text-black text-base font-normal font-['Poppins']">Mã học viên</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                InputProps={{
                    style: { backgroundColor: '#f9f9f9' },
                    inputProps: {
                      style: { color: 'rgba(0, 0, 0, 0.38)' }, // Placeholder color
                    },
                  }}
                        name="id"
                        value={studentData.id}
                        onChange={handleInputChange}
                        disabled={!editMode}
                    />
                </div>
                <div className="w-1/2 pl-2">
                    <Typography variant="body1" className="opacity-80 text-black text-base font-normal font-['Poppins']">Email</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                         placeholder="Nhập email"
                         InputProps={{
                            style: { backgroundColor: '#f9f9f9' },
                            inputProps: {
                                style: { color: 'rgba(0, 0, 0, 0.38)' }, // Placeholder color
                            },
                         }}
                        name="email"
                        value={studentData.email}
                        onChange={handleInputChange}
                        disabled={!editMode}
                    />
                </div>
            </div>


          <Typography variant="body1" className="opacity-80 text-black text-base font-normal font-['Poppins']">Họ và tên</Typography>
          <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Nhập họ và tên"
              className="mb-4"
                InputProps={{
                    style: { backgroundColor: '#f9f9f9' },
                    inputProps: {
                    style: { color: 'rgba(0, 0, 0, 0.38)' }, // Placeholder color
                    },
                    }}
              name="fullName"
              value={studentData.fullName}
              onChange={handleInputChange}
              disabled={!editMode}
          />

          <Typography variant="body1" className="opacity-80 text-black text-base font-normal font-['Poppins']">Mật khẩu</Typography>
          <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Nhập mật khẩu"
              className="mb-4"
                InputProps={{
                    style: { backgroundColor: '#f9f9f9' },
                    inputProps: {
                    style: { color: 'rgba(0, 0, 0, 0.38)' }, // Placeholder color
                    },
                    }}
              name="password"
              type="password"
              value={studentData.password}
              onChange={handleInputChange}
              disabled={!editMode}
          />

            <Typography variant="body1" className="opacity-80 text-black text-base font-normal font-['Poppins']">Số điện thoại</Typography>
            <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Nhập số điện thoại"
                className="mb-4"
                  InputProps={{
                    style: { backgroundColor: '#f9f9f9' },
                    inputProps: {
                      style: { color: 'rgba(0, 0, 0, 0.38)' }, // Placeholder color
                    },
                    }}
                name="phone"
                value={studentData.phone}
                onChange={handleInputChange}
                disabled={!editMode}
            />
          <Typography variant="body1" className="opacity-80 text-black text-base font-normal font-['Poppins']">Giới tính</Typography>
          <Select
              fullWidth
              variant="outlined"
              size="small"
              className="mb-4"
              value={studentData.gender}
              displayEmpty
              renderValue={(selected) => {
                  if (!selected) {
                      return <span style={{ color: 'rgba(0, 0, 0, 0.38)' }}>Chọn giới tính</span>
                  }
                  return selected;
              }}
              IconComponent={() => <ArrowDropDownIcon />}
                sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                        backgroundColor: '#f9f9f9',
                    },
                  '& .MuiSelect-select':{
                      color: 'rgba(0, 0, 0, 0.38)'
                  }
                }}
              onChange={handleGenderChange}
              disabled={!editMode}
          >
              <MenuItem value="Male">Nam</MenuItem>
              <MenuItem value="Female">Nữ</MenuItem>
              <MenuItem value="Other">Khác</MenuItem>
          </Select>

           <Typography variant="body1" className="opacity-80 text-black text-base font-normal font-['Poppins']">Lớp</Typography>
          <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Nhập lớp"
              className="mb-4"
                InputProps={{
                    style: { backgroundColor: '#f9f9f9' },
                    inputProps: {
                    style: { color: 'rgba(0, 0, 0, 0.38)' }, // Placeholder color
                    },
                    }}
              name="class"
              value={studentData.class}
              onChange={handleInputChange}
              disabled={!editMode}
          />


            <div className="flex items-center p-2 bg-[#f9f9f9] rounded-lg mt-4">
                <div className="w-6 h-6 bg-[#4182f9] bg-opacity-10 rounded-full flex items-center justify-center">
                    <EmailIcon sx={{ color: "#4182f9", fontSize: 20 }} />
                </div>
                <div className="ml-2 text-black text-base font-normal font-['Poppins']">
                    {studentData.email}
                </div>
                <div className="text-black text-base font-normal font-['Poppins'] ml-auto opacity-50">
                    1 tháng trước
                </div>
            </div>
            <div className="w-full flex justify-start p-4">
                <div
                    className="w-[209px] h-11 bg-[#4182f9] bg-opacity-10 rounded-lg cursor-pointer flex items-center justify-center"
                    onClick={handleAddEmailClick}
                >
                    <Typography className="text-[#4182f9] text-base font-normal font-['Poppins']">+Thêm Email</Typography>
                </div>
            </div>


        </div>
        <div className="w-1/2 p-4 border-l border-gray-100 bg-[#F9F9F9]">
          <Typography variant="body1" className="opacity-80 text-black text-base font-normal font-['Poppins']">Trường học</Typography>
          <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Nhập trường học"
              className="mb-4"
                InputProps={{
                    style: { backgroundColor: '#f9f9f9' },
                    inputProps: {
                    style: { color: 'rgba(0, 0, 0, 0.38)' }, // Placeholder color
                    },
                    }}
              name="school"
              value={studentData.school}
              onChange={handleInputChange}
              disabled={!editMode}
          />
            <Typography variant="body1" className="opacity-80 text-black text-base font-normal font-['Poppins']">Ngày sinh</Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={vi}>
                <DatePicker
                    value={studentData.birthday}
                    onChange={handleBirthdayChange}
                    renderInput={(params) => (
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                             className="mb-4"
                         InputProps={{
                                style: { backgroundColor: '#f9f9f9' },
                                inputProps: {
                                  style: { color: 'rgba(0, 0, 0, 0.38)' }, // Placeholder color
                                },
                            }}
                            {...params}
                            disabled={!editMode}
                            placeholder="dd/mm/yyyy"
                        />
                    )}
                     sx={{
                         '.MuiOutlinedInput-root': {
                         backgroundColor: '#f9f9f9',
                             },
                         }}
                    inputFormat="dd/MM/yyyy"
                />
            </LocalizationProvider>


        </div>
      </div>
    </div>
  );
}

export default StudentProfile;