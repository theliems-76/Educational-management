import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, IconButton, Typography, List, ListItem, ListItemText, Avatar, ListItemAvatar, Tooltip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import moment from 'moment'; // Import thư viện moment
import { styled, keyframes } from '@mui/material/styles';


// Tạo animation cho tin nhắn
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

const StyledListItem = styled(ListItem)(({ theme, sender }) => ({
    flexDirection: sender === 'me' ? 'row-reverse' : 'row',
    display: 'flex',
    justifyContent: sender === 'me' ? 'flex-end' : 'flex-start',
    padding: '0.5rem 0',
     animation: `${fadeIn} 0.3s ease-in-out`,
      '& .MuiListItemAvatar-root': {
            minWidth: '40px',
            padding: '0 0.5rem 0 0.5rem',
        },

    '& .MuiListItemText-root': {
        textAlign: sender === 'me' ? 'right' : 'left',
    },
    '& .MuiTypography-caption': {
           display: 'block'
      },
    '& .MuiListItemText-primary': {
      maxWidth: '80%',
      display: 'inline-block',
       borderRadius: 1,
       padding: 1,
       backgroundColor: sender === 'me' ? '#dcf8c6' : '#f1f1f1',
      },
}));


const StyledHeaderBox = styled(Box)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: 2,
    borderBottom: '1px solid #eee',
     backgroundColor: '#ff5722', // Màu nền cho header
}))

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
      if(e.key === 'Enter'){
        e.preventDefault();
        handleSendMessage();
      }
    }

    return (
        <Box
            sx={{
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
                boxShadow: 5,
            }}
        >
            {/* Header Chat */}
             <StyledHeaderBox>
                 <Avatar src={selectedUser.avatar} alt={selectedUser.name} sx={{ marginRight: 1 }} />
                <Typography variant="h6" component="div" flexGrow={1} >
                  {selectedUser.name}
                </Typography>
                <IconButton onClick={onClose}>
                    <span style={{ fontSize: '24px', fontWeight: 'bold' }}>X</span>
                </IconButton>
             </StyledHeaderBox>

            {/* Message List */}
            <Box
                sx={{
                    flexGrow: 1,
                    padding: 2,
                    overflowY: 'auto',
                }}
                 ref={chatBoxRef}
            >
                 <List>
                    {messages.map((msg, index) => (
                         <StyledListItem key={index} sender={msg.sender}>
                             <ListItemAvatar>
                                 <Avatar src={msg.sender === 'me' ? 'https://mui.com/static/images/avatar/5.jpg' : selectedUser.avatar} alt={selectedUser.name} />
                             </ListItemAvatar>
                             <ListItemText
                                 primary={msg.content}
                                  secondary={
                                   <Tooltip title={moment(msg.timestamp).format('HH:mm:ss')} placement={msg.sender === 'me' ? 'left' : 'right'}>
                                      <Typography variant="caption" color="textSecondary">
                                        {msg.sender === 'me' ? 'You' : selectedUser.name } - {moment(msg.timestamp).format('HH:mm')}
                                       </Typography>
                                     </Tooltip>
                                 }

                             />
                         </StyledListItem>
                    ))}
                </List>
            </Box>

            {/* Input Box */}
            <Box sx={{ display: 'flex', alignItems: 'center', padding: 2, borderTop: '1px solid #eee' }}>
                <TextField
                    fullWidth
                    placeholder="Nhập tin nhắn..."
                    variant="outlined"
                    size="small"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                     onKeyDown={handleKeyDown}
                    sx={{ mr: 1 }}
                />
                <IconButton onClick={handleSendMessage} color="primary">
                   <SendIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default ChatBox;