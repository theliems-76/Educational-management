import React from 'react';
import InboxIcon from '@mui/icons-material/Inbox';
import SendIcon from '@mui/icons-material/Send';
import DraftsIcon from '@mui/icons-material/Drafts'; // Hoặc icon khác
import CloseIcon from '@mui/icons-material/Close';

const MessageSidebar = ({ onComposeClick, onInboxClick, onSentClick, activeSection, onClose }) => {
  return (
    <div className="w-64 bg-gray-100 h-screen p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-bold">Menu</div>
        <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
          <CloseIcon />
        </button>
      </div>
      <ul className="space-y-2">
        <li
          className={`cursor-pointer p-2 rounded hover:bg-gray-200 flex items-center ${
            activeSection === 'inbox' ? 'bg-gray-200' : ''
          }`}
          onClick={onInboxClick}
        >
          <InboxIcon className="mr-2" />
          Hộp thư đến
        </li>
        <li
          className={`cursor-pointer p-2 rounded hover:bg-gray-200 flex items-center ${
            activeSection === 'sent' ? 'bg-gray-200' : ''
          }`}
          onClick={onSentClick}
        >
          <SendIcon className="mr-2" />
          Tin đã gửi
        </li>
        <li
          className={`cursor-pointer p-2 rounded hover:bg-gray-200 flex items-center ${
            activeSection === 'compose' ? 'bg-gray-200' : ''
          }`}
          onClick={onComposeClick}
        >
          <DraftsIcon className="mr-2" /> {/* Hoặc icon khác */}
          Soạn tin nhắn
        </li>
      </ul>
    </div>
  );
};

export default MessageSidebar;