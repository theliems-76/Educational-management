import React from 'react';
import MessageList from './MessageList';

const Sent = ({ messages, onMessageClick, activeMessageId }) => {
  return (
    <div className="w-full h-full">
      <h2 className="text-lg font-bold p-4">Tin đã gửi</h2>
      <MessageList
        messages={messages}
        onMessageClick={onMessageClick}
        activeMessageId={activeMessageId}
      />
    </div>
  );
};

export default Sent;