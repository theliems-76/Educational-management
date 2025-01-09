import React, { useState, useEffect } from 'react';
import { Popover, Box, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Tabs, Tab } from '@mui/material';
import ComposeBox from './ComposeBox';
import { styled } from '@mui/material/styles';

const StyledPopover = styled(Popover)(({ theme }) => ({
    "& .MuiPaper-root": {
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    },
}));

const MessageListModal = ({ isOpen, onClose, anchorEl, messages, onSelectMessage, onComposeClick }) => {
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        setTabValue(0);
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
       if(newValue===1){
        onClose()
        onComposeClick();
       }
    };

    const handleMessageClick = (message) => {
      onSelectMessage(message);
        onClose();
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
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    aria-label="message-tabs"
                    centered
                >
                    <Tab label="Hộp thư" />
                    <Tab label="Soạn tin mới" />
                </Tabs>
                {tabValue === 0 && (
                    <Box p={2}>
                        <List>
                            {messages.map((message, index) => (
                                <ListItem key={index} button onClick={() => handleMessageClick(message)}>
                                    <ListItemAvatar>
                                        <Avatar src={message.senderAvatar} alt={message.senderName} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={message.senderName}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {message.content}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                )}
                 {tabValue === 1 && (
                    <Box p={2}>
                           <Typography variant="body2" align='center' color='gray' > Click vào tab "Hộp thư" để xem tin nhắn</Typography>
                    </Box>
                )}
            </Box>
        </StyledPopover>
    );
};

export default MessageListModal;