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
import AddEmailModal from '../../components/share/AddEmailModal';

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
    addedEmails: [],
    role:'Học viên',
};

function StudentProfile() {
    const [studentData, setStudentData] = useState(initialStudentData);
    const [editMode, setEditMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
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
        setIsModalOpen(true);
   };

    const handleCloseModal = () => {
      setIsModalOpen(false);
    }


    const handleAddEmail = (newEmail) => {
        // Code xử lý thêm email
         setStudentData(prevState => ({
          ...prevState,
          addedEmails: [...prevState.addedEmails, newEmail]
        }));
      };
    const renderDate = (date) => {
        return date ? format(date, 'dd/MM/yyyy', { locale: vi}) : null;
    };

    return (
        <div className="w-[1282px] h-[856px] bg-white rounded-[10px] p-4">
            <div className="absolute top-0 left-0 w-full h-[150px] bg-gradient-to-r from-[#fce3c7] to-[#a5a1d1] ">
            </div>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <Avatar
                        alt={studentData.name}
                        src={studentData.avatar}
                        sx={{ width: 100, height: 100, mr: 2 }}
                    />
                    <Box>
                        <Typography variant="h6" className="text-black font-medium">{studentData.name}</Typography>
                        <Typography variant="body2" className="text-black opacity-50">{studentData.email}</Typography>
                        <Typography variant="body2" className="text-black opacity-50">{studentData.role}</Typography>
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

            <div className="flex items-start">
                <div className="w-1/2 pr-2 grid grid-cols-2 gap-4 mt-3">
                    {/* Mã học viên */}
                    <div>
                         <Typography variant="body1" className="opacity-80 text-black text-base font-normal font-['Poppins']">Mã học viên</Typography>
                         <Box sx={{ backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    style: { backgroundColor: 'transparent', borderRadius: '4px'  },
                                    inputProps: {
                                        style: { color: 'black' }, // Text color black
                                    },
                                }}
                                name="id"
                                value={studentData.id}
                                onChange={handleInputChange}
                                disabled={!editMode}
                                sx={{
                                        '.MuiOutlinedInput-notchedOutline': {
                                            border: 'none'
                                        }
                                }}
                            />
                        </Box>
                    </div>
                    {/* Email */}
                    <div>
                        <Typography variant="body1" className="opacity-80 text-black text-base font-normal font-['Poppins']">Email</Typography>
                           <Box sx={{ backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    placeholder="Nhập email"
                                    InputProps={{
                                        style: { backgroundColor: 'transparent', borderRadius: '4px' },
                                        inputProps: {
                                            style: { color: 'black' }, // Text color black
                                        },
                                    }}
                                    name="email"
                                    value={studentData.email}
                                    onChange={handleInputChange}
                                    disabled={!editMode}
                                        sx={{
                                            '.MuiOutlinedInput-notchedOutline': {
                                                border: 'none'
                                            }
                                        }}
                                />
                            </Box>
                    </div>

                    {/* Họ và tên */}
                    <div className="col-span-2">
                        <Typography variant="body1" className="opacity-80 text-black text-base font-normal font-['Poppins']">Họ và tên</Typography>
                        <Box sx={{ backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                placeholder="Nhập họ và tên"
                                    InputProps={{
                                        style: { backgroundColor: 'transparent', borderRadius: '4px' },
                                        inputProps: {
                                            style: { color: 'black' }, // Text color black
                                        },
                                    }}
                                name="fullName"
                                value={studentData.fullName}
                                onChange={handleInputChange}
                                disabled={!editMode}
                                sx={{
                                        '.MuiOutlinedInput-notchedOutline': {
                                            border: 'none'
                                        }
                                }}
                            />
                        </Box>
                    </div>


                    {/* Mật khẩu */}
                     <div className="col-span-2">
                         <Typography variant="body1" className="opacity-80 text-black text-base font-normal font-['Poppins']">Mật khẩu</Typography>
                           <Box sx={{ backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                               <TextField
                                 fullWidth
                                 variant="outlined"
                                 size="small"
                                 placeholder="Nhập mật khẩu"
                                   InputProps={{
                                       style: { backgroundColor: 'transparent', borderRadius: '4px' },
                                       inputProps: {
                                           style: { color: 'black' }, // Text color black
                                       },
                                   }}
                                 name="password"
                                 type="password"
                                 value={studentData.password}
                                 onChange={handleInputChange}
                                 disabled={!editMode}
                                   sx={{
                                    '.MuiOutlinedInput-notchedOutline': {
                                        border: 'none'
                                    }
                                   }}
                               />
                           </Box>
                    </div>

                    {/* Số điện thoại */}
                    <div>
                        <Typography variant="body1" className="opacity-80 text-black text-base font-normal font-['Poppins']">Số điện thoại</Typography>
                           <Box sx={{ backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    placeholder="Nhập số điện thoại"
                                    InputProps={{
                                        style: { backgroundColor: 'transparent', borderRadius: '4px' },
                                        inputProps: {
                                            style: { color: 'black' }, // Text color black
                                        },
                                    }}
                                    name="phone"
                                    value={studentData.phone}
                                    onChange={handleInputChange}
                                    disabled={!editMode}
                                    sx={{
                                            '.MuiOutlinedInput-notchedOutline': {
                                                border: 'none'
                                            }
                                    }}
                                />
                           </Box>
                    </div>
                    {/* Giới tính */}
                    <div>
                        <Typography variant="body1" className="opacity-80 text-black text-base font-normal font-['Poppins']">Giới tính</Typography>
                        <Box sx={{ backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                            <Select
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={studentData.gender}
                                displayEmpty
                                renderValue={(selected) => {
                                    if (!selected) {
                                        return <span style={{ color: 'black' }}>Chọn giới tính</span>
                                    }
                                    return selected;
                                }}
                                IconComponent={() => <ArrowDropDownIcon />}
                                sx={{
                                    '.MuiOutlinedInput-notchedOutline': {
                                        border: 'none'
                                    },
                                  '& .MuiSelect-select':{
                                      color: 'black'
                                   },
                                   backgroundColor: 'transparent'
                                 }}
                                onChange={handleGenderChange}
                                disabled={!editMode}
                            >
                                <MenuItem value="Male">Nam</MenuItem>
                                <MenuItem value="Female">Nữ</MenuItem>
                                <MenuItem value="Other">Khác</MenuItem>
                            </Select>
                        </Box>
                    </div>
                    {/* Lớp */}
                     <div>
                         <Typography variant="body1" className="opacity-80 text-black text-base font-normal font-['Poppins']">Lớp</Typography>
                         <Box sx={{ backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                             <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    placeholder="Nhập lớp"
                                    InputProps={{
                                        style: { backgroundColor: 'transparent', borderRadius: '4px' },
                                        inputProps: {
                                            style: { color: 'black' }, // Text color black
                                        },
                                    }}
                                    name="class"
                                    value={studentData.class}
                                    onChange={handleInputChange}
                                    disabled={!editMode}
                                    sx={{
                                            '.MuiOutlinedInput-notchedOutline': {
                                                border: 'none'
                                            }
                                    }}
                                />
                         </Box>
                    </div>

                    {/* Thông tin Email */}
                    {studentData.addedEmails.length > 0 && (
                     <div className="col-span-2 mt-4">
                        <Typography variant="body1" className="opacity-80 text-black text-base font-normal font-['Poppins'] mb-1">Email khác</Typography>
                        {studentData.addedEmails.map((email, index) => (
                             <div key={index} className="flex items-center p-2 bg-[#f9f9f9] rounded-lg mb-2">
                                 <div className="w-6 h-6 bg-[#4182f9] bg-opacity-10 rounded-full flex items-center justify-between ">
                                   <EmailIcon sx={{ color: "#4182f9", fontSize: 20 }} />
                                 </div>
                                 <div className="ml-2 text-black text-base font-normal font-['Poppins']">
                                    {email}
                                 </div>

                            </div>
                        ))}
                    </div>
                     )}
                     <div className="col-span-2 w-full flex justify-between mt-4 ">
                        <div
                            className="w-[209px] h-11 bg-[#4182f9] bg-opacity-10  flex-col rounded-lg cursor-pointer flex items-center justify-center gap-y-4 "
                            onClick={handleAddEmailClick}
                        >
                            <Typography className="text-[#4182f9] text-base font-normal font-['Poppins']">+Thêm Email</Typography>
                        </div>
                    </div>
                </div>
                
                {/* Phần bên phải (Trường học) */}
                 <div className="w-1/2 p-4 border-l border-gray-100  ">
                      <Typography variant="body1" className="opacity-80 text-black text-base font-normal font-['Poppins']">Trường học</Typography>
                       <Box sx={{ backgroundColor: '#f9f9f9', borderRadius: '4px' }} className="mb-4">
                           <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                placeholder="Nhập trường học"
                                    InputProps={{
                                        style: { backgroundColor: 'transparent', borderRadius: '4px' },
                                        inputProps: {
                                            style: { color: 'black' }, // Text color black
                                        },
                                    }}
                                name="school"
                                value={studentData.school}
                                onChange={handleInputChange}
                                disabled={!editMode}
                                sx={{
                                    '.MuiOutlinedInput-notchedOutline': {
                                        border: 'none'
                                      }
                                }}
                            />
                     </Box>
            
                       {/* Ngày sinh */}
                       <Typography variant="body1" className="opacity-80 text-black text-base font-normal font-['Poppins'] mt-4">Ngày sinh</Typography>
                        <Box sx={{ backgroundColor: '#f9f9f9', borderRadius: '4px', display: 'inline-block' }} >
                            <LocalizationProvider dateAdapter={AdapterDateFns} locale={vi}>
                                <DatePicker
                                    value={studentData.birthday}
                                    onChange={handleBirthdayChange}
                                    renderInput={(params) => (
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            InputProps={{
                                                style: {
                                                    backgroundColor: 'transparent',
                                                    borderRadius: '4px',
                                                    paddingTop: '0.125rem',
                                                    paddingBottom: '0.125rem',
                                                    margin:'0', // Remove any margin from TextField
                                                },
                                                inputProps: {
                                                    style: { color: 'black', padding: '0' },
                                                },
                                            }}
                                            {...params}
                                            disabled={!editMode}
                                            placeholder="dd/mm/yyyy"
                                            sx={{
                                                '.MuiOutlinedInput-notchedOutline': {
                                                    border: 'none'
                                                },
                                                '.MuiInputBase-root':{
                                                    height: '2.5rem'
                                                }
                                            }}
                                        />
                                    )}
                                    sx={{
                                         '.MuiOutlinedInput-root': {
                                            backgroundColor: 'transparent',
                                        },
                                     }}
                                    inputFormat="dd/MM/yyyy"
                                     format="dd/MM/yyyy"

                                />
                            </LocalizationProvider>
                        </Box>
                  </div>
                
                  <AddEmailModal open={isModalOpen} onClose={handleCloseModal} onAddEmail={handleAddEmail}/>
                 
            </div>
        </div>
    );
}

export default StudentProfile;