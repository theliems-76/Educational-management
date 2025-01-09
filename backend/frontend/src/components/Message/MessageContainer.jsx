import React, { useState, useEffect } from 'react';
import MessageListModal from './MessageListModal';
import ChatModal from './ChatBox';

const MessageContainer = ({
    isMessageListModalOpen,
    handleCloseMessageListModal,
    handleOpenMessageListModal // Nhận prop handleOpenMessageListModal
  }) => {
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

  useEffect(() => {
    // Reset selectedMessage khi isMessageListModalOpen thay đổi
    if (!isMessageListModalOpen) {
        setSelectedMessage(null)
    }
  }, [isMessageListModalOpen]);
  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    setIsChatModalOpen(true);
    setMessagesData((prevMessages) =>
      prevMessages.map((m) =>
        m.id === message.id ? { ...m, active: true } : { ...m, active: false }
      )
    );
  };

  const handleCloseChatModal = () => {
    setIsChatModalOpen(false);
  };

  const handleSendMessage = (newMessageText) => {
    if (!selectedMessage) return;

    const newMessage = {
      sender: 'You',
      text: newMessageText,
      time: new Date().toLocaleTimeString(),
      senderAvatar: '',
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

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10">
      {isMessageListModalOpen && (
        <MessageListModal
        messages={messagesData}
        onMessageClick={handleMessageClick}
        onClose={handleCloseMessageListModal}
        onOpen={handleOpenMessageListModal} // Truyền handleOpenMessageListModal vào MessageListModal và có thể đổi tên prop cho rõ ràng
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

export default MessageContainer;