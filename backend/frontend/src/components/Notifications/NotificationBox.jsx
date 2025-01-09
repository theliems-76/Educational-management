import React from 'react';
import { Box, IconButton, Typography, Avatar, Tooltip,Popover } from '@mui/material';
import { styled } from '@mui/material/styles';
import moment from 'moment'; // Import thư viện moment
const StyledHeaderBox = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '0.5rem',
  borderBottom: '1px solid #e1e1e1',
  backgroundColor: '#2196f3',
  borderRadius: '10px 10px 0 0',
}));

const NotificationBoxWrapper = styled(Box)(({ theme }) => ({
  position: 'fixed',
                bottom: 20,
                right: 20,
                width: 328,
                height: 456,
                backgroundColor: '#fff',
                border: 'none',
                borderRadius: '10px 10px 0 0',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
                 
}));

const StyledContentBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
   padding: 2,
   overflowY: 'auto',
    backgroundColor: 'inherit', // inherit the background from parent
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