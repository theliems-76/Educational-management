import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MessageSidebar from '../UI/MessageSidebar';
import MessageContent from '../MessageContent';
import MessageList from '../MessageListModal';
import Inbox from '../UI/Inbox';
import Sent from '../UI/Sent';
import Header from '../Header';
import MessageListModal from '../MessageListModal';
import ChatModal from '../UI/ChatModal';
import ComposeMessage from '../UI/ComposeMessage';
const Message = () => {
  const [isMessageListModalOpen, setIsMessageListModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [messagesData, setMessagesData] = useState([
    {
      id: 1,
      sender: 'Jane Cooper',
      avatar: '',
      time: 'just now',
      message: 'Yeah sure, tell me zafor',
      active: false,
      chatlog: [
        {
          sender: 'Jane Cooper',
          text: "Hello and thanks for signing up to the course. If you have any questions about the course or Adobe XD, feel free to get in touch and I'll be happy to help 😀",
          time: 'Today',
          senderAvatar: '',
        },
        {
          sender: 'You',
          text: "Hello, Good Evening. I'm Zafor I only have a small doubt about your lecture. can you give me some time for this?",
          time: 'Time',
          senderAvatar: '',
        },
        {
          sender: 'Jane Cooper',
          text: 'Yeah sure, tell me zafor',
          time: 'Time',
          senderAvatar: '',
        },
      ],
    },
    {
      id: 2,
      sender: 'Jenny Wilson',
      avatar: '',
      time: '2 d',
      message: 'Thank you so much, sir',
      active: false,
      chatlog: [],
    },
    {
      id: 3,
      sender: 'Marvin McKinney',
      avatar: '',
      time: '1 m',
      message: 'You’re Welcome',
      active: false,
      chatlog: [],
    },
    {
      id: 4,
      sender: 'Eleanor Pena',
      avatar: '',
      time: '1 m',
      message: 'Thank you so much, sir',
      active: false,
      chatlog: [],
    },
    {
      id: 5,
      sender: 'Ronald Richards',
      avatar: '',
      time: '2 m',
      message: 'Sorry, I can’t help you',
      active: false,
      chatlog: [],
    },
    {
      id: 6,
      sender: 'Kathryn Murphy',
      avatar: '',
      time: '2 m',
      message: 'new message',
      active: false,
      chatlog: [],
    },
    {
      id: 7,
      sender: 'Jacob Jones',
      avatar: '',
      time: '6 m',
      message: 'Thank you so much, sir',
      active: false,
      chatlog: [],
    },
    {
      id: 8,
      sender: 'Cameron Williamson',
      avatar: '',
      time: '6 m',
      message: 'It’s okay, no problem brother, i will fix everh...',
      active: false,
      chatlog: [],
    },
    {
      id: 9,
      sender: 'Arlene McCoy',
      avatar: '',
      time: '9 m',
      message: 'Thank you so much, sir',
      active: false,
      chatlog: [],
    },
    {
      id: 10,
      sender: 'Dianne Russell',
      avatar: '',
      time: '9 m',
      message: 'You’re Welcome',
      active: false,
      chatlog: [],
    },
  ]);

  const navigate = useNavigate();

  const handleOpenMessageListModal = () => {
    setIsMessageListModalOpen(true);
  };

  const handleCloseMessageListModal = () => {
    setIsMessageListModalOpen(false);
  };
  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    setIsChatModalOpen(true); // Mở ChatModal khi click vào tin nhắn
    setMessagesData((prevMessages) =>
      prevMessages.map((m) =>
        m.id === message.id ? { ...m, active: true } : { ...m, active: false }
      )
    );
  };

  const handleCloseMessage = () => {
    navigate(-1);
  };

  const handleSendMessage = (newMessageText) => {
    if (!selectedMessage) return;

    const newMessage = {
      sender: 'You', // Thay bằng tên người dùng hiện tại
      text: newMessageText,
      time: new Date().toLocaleTimeString(), // Định dạng lại thời gian
      senderAvatar: '', // Thay bằng avatar của bạn nếu có
    };

    setMessagesData((prevMessages) =>
      prevMessages.map((m) =>
        m.id === selectedMessage.id
          ? { ...m, chatlog: [...m.chatlog, newMessage] }
          : m
      )
    );

    setSelectedMessage((prevMessage) => ({
      ...prevMessage,
      chatlog: [...prevMessage.chatlog, newMessage],
    }));
  };

  const handleCloseChatModal = () => {
    setIsChatModalOpen(false);
  };

  return (
    <div className="relative">
      <Header onOpenMessageListModal={handleOpenMessageListModal} />

      {isMessageListModalOpen && (
        <MessageListModal
          messages={messagesData}
          onMessageClick={handleMessageClick}
          onClose={handleCloseMessageListModal}
        />
      )}

      {isChatModalOpen && selectedMessage && (
        <ChatModal
          message={selectedMessage}
          onClose={handleCloseChatModal}
          onSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
};

export default Message;