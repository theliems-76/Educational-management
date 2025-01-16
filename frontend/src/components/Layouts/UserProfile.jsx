import React, { useState, useEffect } from 'react';
import {
  TextField,
  Typography,
  Avatar,
  Box,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import AddEmailModal from '../../components/share/AddEmailModal';
import { getUserProfile, updateUserProfile } from '../../apis/userApi';

function UserProfile() {
  const [userData, setUserData] = useState({
    user: {
      idUser: '',
      username: '',
      email: '',
      phone: '',
      created_year: '',
      roleName: '',
    },
    dob: null,
    gender: '',
    school: '',
    classStudents: [],
    id: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addedEmails, setAddedEmails] = useState([]); // Thêm state cho email phụ
  const [resetPassword, setResetPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Lấy ID từ localStorage
  const idUser = localStorage.getItem('id');
  const roleName = localStorage.getItem('role');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserProfile(); // Sửa lại
        // Kiểm tra role và map dữ liệu tương ứng
        if (response.roleName === 'Student') {
          setUserData(response);
        } else if (response.roleName === 'Teacher') {
          setUserData(response);
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
        setError(error.response?.data?.message || 'Không thể tải thông tin người dùng!');
        // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi
      }
    };

    fetchUserData();
  }, [idUser]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUserInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      user: {
        ...prevData.user,
        [name]: value,
      },
    }));
  };

  const handleGenderChange = (event) => {
    setUserData((prevData) => ({
      ...prevData,
      gender: event.target.value,
    }));
  };

  const handleBirthdayChange = (date) => {
    setUserData((prevData) => ({
      ...prevData,
      dob: date,
    }));
  };

  const handleEditClick = async () => {
    if (editMode) {
        //Kiểm tra nếu resetPassword là true
        if (resetPassword) {
            if (password !== idUser) {
                setError('Mật khẩu mới phải trùng với ID người dùng.');
                return;
            }
        } else {
            // Kiểm tra mật khẩu nếu không reset
            if (password !== confirmPassword) {
                setError('Mật khẩu không khớp.');
                return;
            }
        }
      try {
        const formattedDob = userData.dob
          ? format(new Date(userData.dob), 'yyyy-MM-dd')
          : '';

          const updatedUserData = {
            ...userData,
            dob: formattedDob,
            password: resetPassword ? password : null,
            id: idUser,
          };
    
          const response = await updateUserProfile(
            idUser,
            updatedUserData,
            resetPassword
          );
    
          console.log(response);
          setUserData(response);
    
          setSuccess('Cập nhật thông tin thành công!');
          setError(null); // Xóa thông báo lỗi nếu có
        } catch (error) {
          console.error('Lỗi khi cập nhật thông tin:', error);
          setError(
            error.response?.data?.message || 'Cập nhật thông tin thất bại!'
          );
          setSuccess(null); // Xóa thông báo thành công nếu có
        } finally {
          // Đặt lại giá trị cho resetPassword, password và confirmPassword
          setResetPassword(false);
          setPassword('');
          setConfirmPassword('');
        }
    }

    setEditMode(!editMode);
  };

  const handleAddEmailClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddEmail = (newEmail) => {
    setAddedEmails([...addedEmails, newEmail]); // Cập nhật state email phụ
  };

  const renderDate = (date) => {
    return date ? format(new Date(date), 'dd/MM/yyyy') : '';
  };

  return (
    <div className="w-[1282px] h-[856px] bg-white rounded-[10px] p-4">
      <div className="absolute top-0 left-0 w-full h-[150px] bg-gradient-to-r from-[#fce3c7] to-[#a5a1d1]"></div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          {/* Cần cập nhật lại đường dẫn ảnh nếu có */}
          <Avatar
            alt={userData.user.username}
            src={userData.avatar || 'https://via.placeholder.com/100x100'}
            sx={{ width: 100, height: 100, mr: 2 }}
          />
          <Box>
            <Typography variant="h6" className="text-black font-medium">
              {userData.user.username}
            </Typography>
            <Typography variant="body2" className="text-black opacity-50">
              {userData.user.email}
            </Typography>
            <Typography variant="body2" className="text-black opacity-50">
              {userData.user.roleName}
            </Typography>
          </Box>
        </div>
        <Button
          variant="contained"
          sx={{ borderRadius: '8px', textTransform: 'none', p: '10px 20px' }}
          onClick={handleEditClick}
        >
          {editMode ? 'Lưu' : 'Chỉnh sửa'}
        </Button>
      </div>
      {/* Thông báo thành công/thất bại */}
      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          {error}
        </div>
      )}
      <div className="flex items-start">
        <div className="w-1/2 pr-2 grid grid-cols-2 gap-4 mt-3">
          {/* ID người dùng */}
          <div>
            <Typography
              variant="body1"
              className="opacity-80 text-black text-base font-normal"
            >
              ID
            </Typography>
            <Box sx={{ backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{
                  style: { backgroundColor: 'transparent', borderRadius: '4px' },
                  inputProps: {
                    style: { color: 'black' },
                  },
                }}
                name="id"
                value={userData.user.idUser}
                disabled
                sx={{
                  '.MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                }}
              />
            </Box>
          </div>
          {/* Email */}
          <div>
            <Typography
              variant="body1"
              className="opacity-80 text-black text-base font-normal"
            >
              Email
            </Typography>
            <Box sx={{ backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Nhập email"
                InputProps={{
                  style: { backgroundColor: 'transparent', borderRadius: '4px' },
                  inputProps: {
                    style: { color: 'black' },
                  },
                }}
                name="email"
                value={userData.user.email}
                onChange={handleUserInputChange}
                disabled={!editMode}
                sx={{
                  '.MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                }}
              />
            </Box>
          </div>

          {/* Họ và tên */}
          <div className="col-span-2">
            <Typography
              variant="body1"
              className="opacity-80 text-black text-base font-normal"
            >
              Họ và tên
            </Typography>
            <Box sx={{ backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Nhập họ và tên"
                InputProps={{
                  style: { backgroundColor: 'transparent', borderRadius: '4px' },
                  inputProps: {
                    style: { color: 'black' },
                  },
                }}
                name="username"
                value={userData.user.username}
                onChange={handleUserInputChange}
                disabled={!editMode}
                sx={{
                  '.MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                }}
              />
            </Box>
          </div>

          {/* Giới tính */}
          <div>
            <Typography
              variant="body1"
              className="opacity-80 text-black text-base font-normal"
            >
              Giới tính
            </Typography>
            <Box sx={{ backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
              <Select
                fullWidth
                variant="outlined"
                size="small"
                value={userData.gender}
                onChange={handleGenderChange}
                displayEmpty
                disabled={!editMode}
                input={
                  <OutlinedInput
                    style={{
                      backgroundColor: 'transparent',
                      borderRadius: '4px',
                    }}
                  />
                }
                renderValue={(selected) => {
                  if (!selected) {
                    return <span>Chọn giới tính</span>;
                  }
                  return selected;
                }}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 224,
                    },
                  },
                }}
                sx={{
                  '.MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                }}
              >
                <MenuItem disabled value="">
                  <em>Chọn giới tính</em>
                </MenuItem>
                <MenuItem value="Nam">Nam</MenuItem>
                <MenuItem value="Nữ">Nữ</MenuItem>
                <MenuItem value="Khác">Khác</MenuItem>
              </Select>
            </Box>
          </div>

          {/* Số điện thoại */}
          <div>
            <Typography
              variant="body1"
              className="opacity-80 text-black text-base font-normal"
            >
              Số điện thoại
            </Typography>
            <Box sx={{ backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Nhập số điện thoại"
                InputProps={{
                  style: { backgroundColor: 'transparent', borderRadius: '4px' },
                  inputProps: {
                    style: { color: 'black' },
                  },
                }}
                name="phone"
                value={userData.user.phone}
                onChange={handleUserInputChange}
                disabled={!editMode}
                sx={{
                  '.MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                }}
              />
            </Box>
          </div>

          {/* Lớp (nếu là học sinh) */}
          {userData.user.roleName === 'Student' && (
            <div>
              <Typography
                variant="body1"
                className="opacity-80 text-black text-base font-normal"
              >
                Lớp
              </Typography>
              <Box sx={{ backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Nhập lớp"
                  InputProps={{
                    style: { backgroundColor: 'transparent', borderRadius: '4px' },
                    inputProps: {
                      style: { color: 'black' },
                    },
                  }}
                  name="classOfSchool"
                  value={userData.classOfSchool}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                  }}
                />
              </Box>
            </div>
          )}

          {/* Môn dạy (nếu là giáo viên) */}
          {userData.user.roleName === 'Teacher' && (
            <div>
              <Typography
                variant="body1"
                className="opacity-80 text-black text-base font-normal"
              >
                Môn dạy
              </Typography>
              <Box sx={{ backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Nhập môn dạy"
                  InputProps={{
                    style: { backgroundColor: 'transparent', borderRadius: '4px' },
                    inputProps: {
                      style: { color: 'black' },
                    },
                  }}
                  name="subject_name"
                  value={userData.subject_name}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                  }}
                />
              </Box>
            </div>
          )}

          {/* Trường học */}
          <div className="col-span-2">
            <Typography
              variant="body1"
              className="opacity-80 text-black text-base font-normal"
            >
              Trường học
            </Typography>
            <Box sx={{ backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Nhập trường học"
                InputProps={{
                  style: { backgroundColor: 'transparent', borderRadius: '4px' },
                  inputProps: {
                    style: { color: 'black' },
                  },
                }}
                name="school"
                value={userData.school}
                onChange={handleInputChange}
                disabled={!editMode}
                sx={{
                  '.MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                }}
              />
            </Box>
          </div>

          {/* Lương (nếu là giáo viên) */}
          {userData.user.roleName === 'Teacher' && (
            <div>
              <Typography
                variant="body1"
                className="opacity-80 text-black text-base font-normal"
              >
                Lương
              </Typography>
              <Box sx={{ backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Nhập lương"
                  InputProps={{
                    style: { backgroundColor: 'transparent', borderRadius: '4px' },
                    inputProps: {
                      style: { color: 'black' },
                    },
                  }}
                  name="income"
                  value={userData.income}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                  }}
                />
              </Box>
            </div>
          )}

          {/* Các trường thông tin khác */}
          <div className="col-span-2">
            {/* Placeholder cho các trường thông tin khác nếu cần */}
          </div>

          {/* Nút thêm email */}
          <div className="col-span-2 w-full flex justify-between mt-4">
            <div
              className="w-[209px] h-11 bg-[#4182f9] bg-opacity-10 flex-col rounded-lg cursor-pointer flex items-center justify-center gap-y-4"
              onClick={handleAddEmailClick}
            >
              <Typography className="text-[#4182f9] text-base font-normal">
                +Thêm Email
              </Typography>
            </div>
          </div>
           {/* Toggle để chọn reset mật khẩu */}
           <div className="col-span-2 flex items-center mt-4">
                        <FormControlLabel
                            control={<Checkbox checked={resetPassword} onChange={(e) => setResetPassword(e.target.checked)} />}
                            label="Đặt lại mật khẩu"
                        />
                    </div>

                    {/* Trường nhập mật khẩu mới */}
                    {editMode && !resetPassword && (
                        <div className="col-span-2">
                            <Typography variant="body1" className="opacity-80 text-black text-base font-normal font-['Poppins']">
                                Mật khẩu mới
                            </Typography>
                            <Box sx={{ backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    placeholder="Nhập mật khẩu mới"
                                    InputProps={{
                                        style: { backgroundColor: 'transparent', borderRadius: '4px' },
                                        inputProps: {
                                            style: { color: 'black' },
                                        },
                                    }}
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={!editMode}
                                    sx={{
                                        '.MuiOutlinedInput-notchedOutline': {
                                            border: 'none',
                                        },
                                    }}
                                />
                            </Box>
                        </div>
                    )}

                    {/* Trường xác nhận mật khẩu */}
                    {editMode && !resetPassword && (
                        <div className="col-span-2">
                            <Typography variant="body1" className="opacity-80 text-black text-base font-normal font-['Poppins']">
                                Xác nhận mật khẩu
                            </Typography>
                            <Box sx={{ backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    placeholder="Xác nhận mật khẩu mới"
                                    InputProps={{
                                        style: { backgroundColor: 'transparent', borderRadius: '4px' },
                                        inputProps: {
                                            style: { color: 'black' },
                                        },
                                    }}
                                    name="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    disabled={!editMode}
                                    sx={{
                                        '.MuiOutlinedInput-notchedOutline': {
                                            border: 'none',
                                        },
                                    }}
                                />
                            </Box>
                        </div>
                    )}
                </div>

        {/* Phần bên phải (Trường học, Ngày sinh) */}
        <div className="w-1/2 p-4 border-l border-gray-100  ">
          <Typography
            variant="body1"
            className="opacity-80 text-black text-base font-normal"
          >
            Trường học
          </Typography>
          <Box
            sx={{ backgroundColor: '#f9f9f9', borderRadius: '4px' }}
            className="mb-4"
          >
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
              value={userData.school}
              onChange={handleInputChange}
              disabled={!editMode}
              sx={{
                '.MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }}
            />
          </Box>

          {/* Ngày sinh */}
          <Typography
            variant="body1"
            className="opacity-80 text-black text-base font-normal mt-4"
          >
            Ngày sinh
          </Typography>
          <Box
            sx={{
              backgroundColor: '#f9f9f9',
              borderRadius: '4px',
              display: 'inline-block',
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={vi}>
              <DatePicker
                value={userData.dob}
                onChange={handleBirthdayChange}
                disabled={!editMode}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    size="small"
                    fullWidth
                    InputProps={{
                      style: {
                        backgroundColor: 'transparent',
                        borderRadius: '4px',
                        paddingTop: '0.125rem',
                        paddingBottom: '0.125rem',
                        margin: '0', // Remove any margin from TextField
                      },
                      inputProps: {
                        style: { color: 'black', padding: '0' },
                        placeholder: 'dd/mm/yyyy',
                      },
                    }}
                    sx={{
                      '.MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                      },
                      '.MuiInputBase-root': {
                        height: '2.5rem',
                      },
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

        <AddEmailModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onAddEmail={handleAddEmail}
        />
      </div>
    </div>
  );
}

export default UserProfile;