import React, { useState } from 'react';

const MessageList = ({ messages, onMessageClick, activeMessageId }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMessages = messages.filter((message) => {
    const senderMatch = message.sender
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const messageMatch = message.message
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const chatlogMatch = message.chatlog.some((chat) =>
      chat.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return senderMatch || messageMatch || chatlogMatch;
  });

  return (
    <div className="w-full rounded-[5px] overflow-hidden">
      <div className="p-4">
        <div className="relative mt-2">
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="w-full px-4 py-2 border border-gray-300 rounded-md pl-10"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto h-[495px]">
        {filteredMessages.map((message) => {
          const initial = message.sender.charAt(0).toUpperCase();
          return (
            <div
              key={message.id}
              className={`px-6 py-3 cursor-pointer hover:bg-gray-100 ${
                message.id === activeMessageId ? 'bg-gray-200' : ''
              }`}
              onClick={() => onMessageClick(message)}
            >
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
                  {initial}
                </div>
                <div className="ml-4 flex-grow">
                  <div className="flex justify-between items-center">
                    <div className="text-[#1d1f26] text-sm font-medium font-['Inter'] leading-tight">
                      {message.sender}
                    </div>
                    <div className="text-right text-[#8c93a3] text-sm font-normal font-['Inter'] leading-snug">
                      {message.time}
                    </div>
                  </div>
                  <div className="text-[#8c93a3] text-sm font-normal font-['Inter'] leading-snug">
                    {message.message}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MessageList;