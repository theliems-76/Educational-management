import React, { useState } from 'react';
import { Popover,Box, TextField, Button, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { sendMessage } from '../../apis/messageApi';
const StyledHeaderBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem',
    borderBottom: '1px solid #e1e1e1',
    backgroundColor: '#2196f3',
    borderRadius: '10px 10px 0 0',
    color: '#fff',
}));

const ComposeBoxWrapper = styled(Box)(({ theme }) => ({
    position: 'fixed',
    bottom: 20,
    right: 20,
    width: 328,
    height: 456,
    backgroundColor: '#fff',   // Set the background color to white
    border: 'none',
    borderRadius: '10px 10px 0 0',
    display: 'flex',
    flexDirection: 'column',
    opacity: 1,
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', // Add the box shadow
    
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    marginBottom: '1rem',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#e1e1e1',
        },
        '&:hover fieldset': {
            borderColor: '#ccc',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#007aff',
        },
    },
    '& .MuiInputLabel-root': {
        color: '#2d2d2e',
    },
    '& .MuiInputBase-input': {
        fontSize: '1.25rem',
        fontFamily: 'Inter',
        color: '#2d2d2e',
    },
    '& .MuiInputLabel-shrink': {
        color: '#007aff',
    },
}));

const StyledButtonBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '1rem',
}));


const ComposeBox = ({ isOpen, onClose, onSendMessage }) => {
    const [newMessage, setNewMessage] = useState({
      receiverId: '', // Thêm receiverId
      content: '',
    });
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setNewMessage({ ...newMessage, [name]: value });
    };
  
    const handleSendMessage = async () => {
      try {
        // Thêm receiverId vào message
        await sendMessage(newMessage.receiverId, newMessage.content); // Sửa lại
        onSendMessage({ ...newMessage, senderName: 'me' }); // Cập nhật giao diện (nếu cần)
        setNewMessage({ receiverId: '', content: '' }); // Reset form
        onClose(); // Đóng ComposeBox
      } catch (error) {
        console.error('Lỗi khi gửi tin nhắn:', error);
        // Xử lý lỗi, hiển thị thông báo, v.v.
      }
    };
  
    if (!isOpen) {
      return null;
    }
  
    return (
      <ComposeBoxWrapper>
        <StyledHeaderBox>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 600,
              color: '#242426',
              fontSize: '0.875rem',
              fontFamily: 'Inter',
            }}
            flexGrow={1}
            align="left"
          >
            Soạn tin mới
          </Typography>
          <IconButton onClick={onClose} sx={{ padding: 0 }}>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#242426' }}>
              X
            </span>
          </IconButton>
        </StyledHeaderBox>
        <Box sx={{ padding: '1rem' }}>
          <Typography>Gửi đến (ID):</Typography>
          <StyledTextField
            variant="outlined"
            name="receiverId"
            value={newMessage.receiverId}
            onChange={handleInputChange}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#e1e1e1',
              },
            }}
          />
          <Typography>Nội dung tin nhắn:</Typography>
          <StyledTextField
            variant="outlined"
            name="content"
            value={newMessage.content}
            onChange={handleInputChange}
            multiline
            rows={4}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#e1e1e1',
              },
            }}
          />
          <StyledButtonBox>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
              sx={{ textTransform: 'capitalize' }}
            >
              Gửi
            </Button>
          </StyledButtonBox>
        </Box>
      </ComposeBoxWrapper>
    );
  };
  
  export default ComposeBox;