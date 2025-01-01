import React, { useState, useRef } from "react";
import { IconButton, InputBase, Badge } from "@mui/material";
import {
    Search as SearchIcon,
    Notifications as NotificationsIcon,
    MoreVert as MoreVertIcon,
    Chat as ChatIcon,
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import MessageListModal from "./Message/MessageListModal";
import ComposeBox from "./Message/ComposeBox";
import NotificationListModal from "./Notifications/NotificationListModal";
import NotificationBox from "./Notifications/NotificationBox";
import ChatBox from "./Message/ChatBox";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

const Header = () => {
   const [modalState, setModalState] = useState({
      isMessageListModalOpen: false,
      isComposeOpen: false,
       isNotificationListModalOpen: false,
      isNotificationBoxOpen: false,
       isChatBoxOpen: false,
    });
     const [selectedUser, setSelectedUser] = useState(null);
     const [chatMessages, setChatMessages] = useState([]);
    const [selectedNotification, setSelectedNotification] = useState(null);

    const chatIconRef = useRef(null);
     const notificationIconRef = useRef(null);

    // Dữ liệu tin nhắn mẫu
    const [messages] = useState([
        { senderName: "User1", content: "Hello!", senderAvatar: "https://mui.com/static/images/avatar/1.jpg", id:1 },
        { senderName: "User2", content: "How are you?", senderAvatar: "https://mui.com/static/images/avatar/2.jpg", id:2 },
        { senderName: "User1", content: "I'm fine, thanks!", senderAvatar: "https://mui.com/static/images/avatar/1.jpg", id:3 },
        { senderName: "User3", content: "What's up?", senderAvatar: "https://mui.com/static/images/avatar/3.jpg", id:4 },
        { senderName: "User1", content: "Not much!", senderAvatar: "https://mui.com/static/images/avatar/1.jpg", id:5 },
        { senderName: "User4", content: "See you!", senderAvatar: "https://mui.com/static/images/avatar/4.jpg", id:6 },
    ]);

       // Dữ liệu thông báo mẫu
       const [notifications] = useState([
        { senderName: "System", content: "Welcome to our app!", senderAvatar: "https://mui.com/static/images/avatar/7.jpg", id: 1, timestamp: new Date() },
          { senderName: "User1", content: "New message from User 1!", senderAvatar: "https://mui.com/static/images/avatar/1.jpg", id: 2, timestamp: new Date() },
          { senderName: "System", content: "Your account has been verified!", senderAvatar: "https://mui.com/static/images/avatar/7.jpg", id: 3,  timestamp: new Date() },
        { senderName: "User2", content: "User2 is live!", senderAvatar: "https://mui.com/static/images/avatar/2.jpg", id: 4,  timestamp: new Date()},
        { senderName: "System", content: "New app update!", senderAvatar: "https://mui.com/static/images/avatar/7.jpg", id: 5, timestamp: new Date()},
    ]);
    const users = {
      "User1": {
          name:"User1",
          avatar:"https://mui.com/static/images/avatar/1.jpg",
          id: 1
      },
      "User2": {
           name:"User2",
          avatar:"https://mui.com/static/images/avatar/2.jpg",
           id: 2
      },
      "User3": {
          name:"User3",
          avatar:"https://mui.com/static/images/avatar/3.jpg",
           id: 3
      },
     "User4": {
          name:"User4",
          avatar:"https://mui.com/static/images/avatar/4.jpg",
           id: 4
      }
    }

     const handleChatIconClick = () => {
      setModalState(prevState => ({
          ...prevState,
          isMessageListModalOpen: !prevState.isMessageListModalOpen,
            isComposeOpen: false,
            isNotificationListModalOpen: false,
            isNotificationBoxOpen: false,
             isChatBoxOpen: false
      }));
    };

     const handleNotificationIconClick = () => {
        setModalState(prevState => ({
           ...prevState,
            isNotificationListModalOpen: !prevState.isNotificationListModalOpen,
             isComposeOpen: false,
             isMessageListModalOpen: false,
             isNotificationBoxOpen:false,
              isChatBoxOpen: false
        }));
    };

    const handleCloseModal = () => {
        setModalState(prevState => ({
             ...prevState,
            isMessageListModalOpen: false,
        }));
    };

     const handleCloseNotificationListModal = () => {
        setModalState(prevState => ({
           ...prevState,
            isNotificationListModalOpen: false,
       }));
    };
      const handleCloseNotificationBox = () => {
        setModalState(prevState => ({
           ...prevState,
             isNotificationBoxOpen: false,
        }));
    };

     const handleCloseCompose = () => {
        setModalState(prevState => ({
             ...prevState,
            isComposeOpen: false,
             isMessageListModalOpen: false,
             isNotificationListModalOpen: false,
             isNotificationBoxOpen:false,
              isChatBoxOpen: false
        }));
    };
      const handleCloseChatBox = () => {
      setModalState(prevState => ({
        ...prevState,
        isChatBoxOpen: false,
      }));
    };


    const handleSendMessage = (newMessage) => {
        // Handle logic gửi tin nhắn ở đây
        console.log('Gửi tin nhắn:', newMessage);
        setChatMessages([...chatMessages, { content: newMessage, sender: 'me', timestamp: new Date() }]);
    };
       const handleSelectMessage = (message) => {
         setSelectedUser(users[message.senderName]);
        setChatMessages([]);
         setModalState(prevState => ({
          ...prevState,
          isMessageListModalOpen: false,
          isComposeOpen: false,
           isNotificationListModalOpen:false,
             isNotificationBoxOpen:false,
           isChatBoxOpen:true
        }));
    };
       const handleSelectNotification = (notification) => {
           setSelectedNotification(notification);
        setModalState(prevState => ({
          ...prevState,
           isNotificationBoxOpen: true,
            isNotificationListModalOpen: false,
              isMessageListModalOpen: false,
               isComposeOpen: false,
                isChatBoxOpen: false
        }));
    };


     const handleComposeClick = () => {
        setModalState(prevState => ({
           ...prevState,
            isComposeOpen: true,
            isMessageListModalOpen: false,
             isNotificationListModalOpen: false,
              isNotificationBoxOpen:false,
               isChatBoxOpen: false
        }));
    };
    const {isMessageListModalOpen, isComposeOpen, isNotificationListModalOpen, isNotificationBoxOpen, isChatBoxOpen} = modalState;

    return (
        <>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
            <div className="flex-grow" />
            <IconButton color="inherit" onClick={handleChatIconClick} ref={chatIconRef}>
                <Badge color="error">
                    <ChatIcon />
                </Badge>
            </IconButton>
               <IconButton color="inherit" onClick={handleNotificationIconClick} ref={notificationIconRef}>
               <Badge badgeContent={9} color="error">
                   <NotificationsIcon />
               </Badge>
            </IconButton>
            <IconButton color="inherit">
                <MoreVertIcon />
            </IconButton>
            <MessageListModal
              isOpen={isMessageListModalOpen}
              onClose={handleCloseModal}
              anchorEl={chatIconRef.current}
              messages={messages}
              onSelectMessage={handleSelectMessage}
              onComposeClick={handleComposeClick}
             />
              <NotificationListModal
                  isOpen={isNotificationListModalOpen}
                   onClose={handleCloseNotificationListModal}
                   anchorEl={notificationIconRef.current}
                   notifications={notifications}
                  onSelectNotification={handleSelectNotification}
                />
             <ComposeBox
               isOpen={isComposeOpen}
               onClose={handleCloseCompose}
               onSendMessage={handleSendMessage}
             />
            <NotificationBox
               isOpen={isNotificationBoxOpen}
               onClose={handleCloseNotificationBox}
                selectedNotification={selectedNotification}
              />
               <ChatBox
               isOpen={isChatBoxOpen}
               onClose={handleCloseChatBox}
              selectedUser={selectedUser}
             messages={chatMessages}
               onSendMessage={handleSendMessage}
              />
        </>
    );
};

export default Header;