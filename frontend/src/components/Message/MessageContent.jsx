import React, { useState } from 'react';

const MessageContent = ({ message, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  // Xử lý sự kiện nhấn phím Enter trong ô input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const getSenderInitial = (sender) => {
    return sender.charAt(0).toUpperCase();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
      <div className="flex items-center mb-4">
        {message.avatar ? (
          <img
            className="w-12 h-12 rounded-full mr-4"
            src={message.avatar}
            alt="Avatar"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold mr-4">
            {getSenderInitial(message.sender)}
          </div>
        )}
        <div>
          <div className="font-bold text-lg">{message.sender}</div>
          <div className="text-sm text-gray-500">Active Now</div>
        </div>
        <div className="ml-auto">
          <button className="p-2 rounded-full hover:bg-gray-200">
            <svg
              className="h-5 w-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto mb-4">
        {message.chatlog.map((chat, index) => (
          <div
            key={index}
            className={`flex ${
              chat.sender === 'You' ? 'justify-end' : 'justify-start'
            } mb-3`}
          >
            {chat.sender !== 'You' && (
              <div className="flex items-start">
                {chat.senderAvatar ? (
                  <img
                    className="w-8 h-8 rounded-full mr-3"
                    src={chat.senderAvatar}
                    alt="Avatar"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold mr-3">
                    {getSenderInitial(chat.sender)}
                  </div>
                )}
                <div className="bg-gray-200 p-3 rounded-lg max-w-[70%]">
                  <p className="text-sm text-gray-600">{chat.time}</p>
                  <p className="mt-1">{chat.text}</p>
                </div>
              </div>
            )}
            {chat.sender === 'You' && (
              <div className="flex items-end justify-end">
                <div className="bg-orange-500 text-white p-3 rounded-lg max-w-[70%]">
                  <p className="text-sm text-gray-200 text-right">
                    {chat.time}
                  </p>
                  <p className="mt-1">{chat.text}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center mt-auto">
        <input
          type="text"
          placeholder="Type your message"
          value={newMessage}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} // Bắt sự kiện nhấn phím
          className="w-full border border-gray-300 rounded-full px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default MessageContent;