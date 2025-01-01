import React from 'react';
import { Box, IconButton, Typography, Avatar, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import moment from 'moment'; // Import thư viện moment


const StyledHeaderBox = styled(Box)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: 2,
    borderBottom: '1px solid #eee',
     backgroundColor: '#ff5722', // Màu nền cho header
}))

const NotificationBoxWrapper = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 20,
  right: 20,
  width: 350,
  height: 400,
  bgcolor: 'white',
  border: '1px solid #ccc',
  borderRadius: 1,
  display: 'flex',
  flexDirection: 'column',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
     backgroundColor: '#ffffff', // Add this to have a white background

}));

const StyledContentBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
   padding: 2,
   overflowY: 'auto',
}));

const NotificationBox = ({ isOpen, onClose, selectedNotification }) => {
    if (!isOpen || !selectedNotification) {
        return null;
    }

  return (
    <NotificationBoxWrapper>
       <StyledHeaderBox>
           <Avatar src={selectedNotification.senderAvatar} alt={selectedNotification.senderName} sx={{ marginRight: 1 }} />
           <Typography variant="h6" component="div" flexGrow={1} >
              {selectedNotification.senderName}
           </Typography>
            <IconButton onClick={onClose}>
                <span style={{ fontSize: '24px', fontWeight: 'bold' }}>X</span>
            </IconButton>
       </StyledHeaderBox>

        <StyledContentBox >
           <Typography variant='body1'>{selectedNotification.content}</Typography>
             <Tooltip title={moment(selectedNotification.timestamp).format('DD/MM/YYYY HH:mm:ss')} placement='right'>
                <Typography variant="caption" color="textSecondary" sx={{ textAlign:'left', display: 'block'  }}>
                    {moment(selectedNotification.timestamp).format('DD/MM/YYYY HH:mm:ss')}
                </Typography>
            </Tooltip>
      </StyledContentBox>
      </NotificationBoxWrapper>
  );
};

export default NotificationBox;