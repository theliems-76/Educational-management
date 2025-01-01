import React, { useState, useEffect } from 'react';
import { Popover, Box, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import moment from 'moment'; // Import thư viện moment

const StyledPopover = styled(Popover)(({ theme }) => ({
    "& .MuiPaper-root": {
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    },
}));

const NotificationListModal = ({ isOpen, onClose, anchorEl, notifications, onSelectNotification }) => {
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        setTabValue(0);
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleNotificationClick = (notification) => {
       onSelectNotification(notification);
        onClose();
    };
     const handleTabChange = (event, newValue) => {
       setTabValue(newValue);
    };
    return (
         <StyledPopover
            open={isOpen}
            onClose={onClose}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <Box
                sx={{
                    width: 350,
                    bgcolor: 'background.paper',
                    border: '1px solid #ccc',
                    boxShadow: 3,
                    maxHeight: '50vh',
                    overflowY: 'auto',
                }}
            >
                <Box p={2}>
                    <List>
                        {notifications.map((notification, index) => (
                            <ListItem key={index} button onClick={() => handleNotificationClick(notification)}>
                                <ListItemAvatar>
                                  <Avatar src={notification.senderAvatar} alt={notification.senderName} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={notification.senderName}
                                     secondary={
                                          <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                 >
                                                    {notification.content}
                                                 </Typography>
                                                <Tooltip title={moment(notification.timestamp).format('DD/MM/YYYY HH:mm:ss')} placement='right'>
                                                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block' }}>
                                                     {moment(notification.timestamp).format('DD/MM/YYYY HH:mm:ss')}
                                                   </Typography>
                                                </Tooltip>
                                          </React.Fragment>
                                      }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
        </StyledPopover>
    );
};

export default NotificationListModal;