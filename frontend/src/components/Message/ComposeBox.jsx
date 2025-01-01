import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledHeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: 2,
  borderBottom: '1px solid #eee',
  backgroundColor: '#ff5722', // Màu nền cho header
}));

const ComposeBoxWrapper = styled(Box)(({ theme }) => ({
    position: 'fixed',
    bottom: 20,
    right: 20,
    width: 400,
    bgcolor: 'white',  // Keep white background
    border: '1px solid #ccc',
    borderRadius: 1,
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff', // Add this to have a white background
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Add some shadow to make it standout
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledButtonBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
}));

const ComposeBox = ({ isOpen, onClose, onSendMessage }) => {
    const [newMessage, setNewMessage] = useState({
        recipient: '',
        content: '',
    });

    if (!isOpen) {
        return null;
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewMessage({
            ...newMessage,
            [name]: value,
        });
    };

    const handleSendMessage = () => {
        onSendMessage(newMessage);
        onClose();
    };

    return (
        <ComposeBoxWrapper>
            <StyledHeaderBox>
                    <Typography id="compose-modal-title" variant="h6" component="h2" align="center" flexGrow={1} >
                         Soạn tin mới
                     </Typography>
                </StyledHeaderBox>
            <Box sx={{padding:2}}>
                  <StyledTextField
                      label="Gửi đến"
                      variant="outlined"
                      name='recipient'
                       value={newMessage.recipient}
                      onChange={handleInputChange}
                      fullWidth
                  />
                  <StyledTextField
                      label="Nội dung"
                      variant="outlined"
                      name='content'
                      value={newMessage.content}
                      onChange={handleInputChange}
                      multiline rows={4}
                      fullWidth
                    />
                <StyledButtonBox mt={2}>
                      <Button variant="outlined" onClick={onClose} sx={{mr:1}}>
                          Hủy
                      </Button>
                      <Button variant="contained" color="primary" onClick={handleSendMessage}>
                           Gửi
                       </Button>
                 </StyledButtonBox>
            </Box>
        </ComposeBoxWrapper>
    );
};

export default ComposeBox;