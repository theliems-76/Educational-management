import React, { useState, useRef, useEffect } from 'react';
import { Popover,Box, TextField, IconButton, Typography, List, ListItem, ListItemText, Avatar, Tooltip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import moment from 'moment';
import { styled, keyframes } from '@mui/material/styles';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
const StyledPopover = styled(Popover)(({ theme }) => ({
    "& .MuiPaper-root": {
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    },
}));
const StyledListItem = styled(ListItem)(({ theme, sender }) => ({
    flexDirection: 'column',
    alignItems: sender === 'me' ? 'flex-end' : 'flex-start',
    padding: '0.5rem 0',
    animation: `${fadeIn} 0.3s ease-in-out`,
     '& .MuiListItemText-root': {
        textAlign: sender === 'me' ? 'right' : 'left',
    },
    '& .MuiTypography-caption': {
      display: 'block',
      marginTop: '0.25rem',
       textAlign: sender === 'me' ? 'right' : 'left',
      fontSize: '0.75rem',
    },
    '& .MuiListItemText-primary': {
         maxWidth: '100%', // Modified to use full width
        display: 'inline-block',
        borderRadius: sender === 'me' ? '16px 16px 0 16px' : '16px 16px 16px 0',
        padding: '0.6rem 1rem',
        backgroundColor: sender === 'me' ? '#007aff' : '#e1e1e1',
        color: sender === 'me' ? '#f2f2f7' : '#242426',
          fontSize: '0.9375rem'
    },
     '& .MuiListItemAvatar-root': {
        display: 'none'
    },
}));

const StyledHeaderBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem',
    borderBottom: '1px solid #e1e1e1',
    backgroundColor: '#2196f3',
    borderRadius: '10px 10px 0 0',
}));


const ChatBox = ({ isOpen, onClose, selectedUser, messages, onSendMessage }) => {
    const [newMessage, setNewMessage] = useState('');
    const chatBoxRef = useRef(null);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    if (!isOpen || !selectedUser) {
        return null;
    }

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            onSendMessage(newMessage);
            setNewMessage('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const getMessageTime = (timestamp) => {
        const timeAgo = moment(timestamp).fromNow(true);
         if(timeAgo.includes('seconds')){
            return 'Vừa xong';
         } else if (timeAgo.includes('minutes')){
            const minutes = timeAgo.split(' ')[0];
            return `Gửi ${minutes} phút trước`;
         } else {
             return `Gửi ${timeAgo}`;
         }
     };
    return (
       <Box
            sx={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                width: 328,
                height: 456,
                bgcolor:'background.paper',
                border: 'none',
                borderRadius: '10px 10px 0 0',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 5,
            }}
        >
            {/* Header Chat */}
            <StyledHeaderBox>
               <Box display="flex" alignItems="center" gap={1}>
                    <Avatar src={selectedUser.avatar} alt={selectedUser.name} sx={{ width: 32, height: 32 }} />
                    <Typography variant="h6" component="div" sx={{ fontWeight: 600, color: '#242426', fontSize: '0.875rem', fontFamily: 'Inter' }}>
                        {selectedUser.name}
                    </Typography>
                    <Box sx={{ width: '8px', height: '8px', borderRadius: '50%', bgcolor: '#007aff' }} />
                </Box>
                <Box flexGrow={1} />
                <IconButton onClick={onClose} sx={{ padding: 0 }}>
                   <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#242426' }}>X</span>
                </IconButton>
           </StyledHeaderBox>

            {/* Message List */}
            <Box
                sx={{
                    flexGrow: 1,
                    padding: '1rem',
                    overflowY: 'auto',
                }}
                 ref={chatBoxRef}
            >
                <List>
                   <Box sx={{
                           textAlign: 'center',
                           marginTop: '1rem',
                           marginBottom: '1rem'
                       }}
                    >
                       <Typography variant="caption" sx={{ color: '#2d2d2e', fontSize: '0.75rem', fontWeight: 500, fontFamily: 'Inter' }}>
                          {messages.length > 0 ? moment(messages[0]?.timestamp).format('ddd HH:mm A') : ''}
                       </Typography>
                    </Box>
                    {messages.map((msg, index) => (
                        <StyledListItem key={index} sender={msg.sender}>
                             <ListItemText
                                    primary={msg.content}
                                    secondary={
                                      <Typography variant="caption" sx={{ color: '#2d2d2e', fontSize: '0.75rem', fontFamily: 'Inter' }}>
                                         {msg.sender === 'me' ? getMessageTime(msg.timestamp) : moment(msg.timestamp).format('HH:mm')}
                                        </Typography>
                                    }
                                />
                        </StyledListItem>
                    ))}
                </List>
            </Box>

            {/* Input Box */}
            <Box sx={{ display: 'flex', alignItems: 'center', padding: '0.5rem', borderTop: 'none', backgroundColor: '#f2f2f7' }}>
                <Box sx={{ flexGrow: 1, position: 'relative' }}>
                     <Box sx={{backgroundColor: '#e1e1e1',  borderRadius: '29px', height: '36px', width: '100%' }} />
                    <TextField
                        fullWidth
                        placeholder="Aa"
                        variant="standard"
                        size="small"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        InputProps={{
                            disableUnderline: true,
                            style: {
                                paddingLeft: '1rem',
                                fontSize: '0.875rem',
                                fontFamily: 'Inter',
                                color: '#2d2d2e',
                                marginTop: '0.25rem'
                            },
                        }}
                        sx={{ mr: 1, position: 'absolute', top: 0, left: 0 }}
                   />
                </Box>
                <IconButton onClick={handleSendMessage} sx={{ padding: 1 }}>
                     <SendIcon sx={{color: '#007aff', width: '20px', height: '20px'}} />
                </IconButton>
            </Box>
        </Box>
    );
};

export default ChatBox;