import React from "react";
import logo from "../assets/Logo Container.png"; // Import ảnh
import {
  Home as HomeIcon,
  Person as PersonIcon,
  Book as BookIcon,
  CalendarToday as CalendarTodayIcon,
  Assignment as AssignmentIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

const verMenuData = [
  {
    title: "Trang chính",
    icon: <HomeIcon />,
  },
  {
    title: "Hồ sơ của tôi",
    icon: <PersonIcon />,
  },
  {
    title: "Khóa học của tôi",
    icon: <BookIcon />,
  },
  {
    title: "Lịch học",
    icon: <CalendarTodayIcon />,
  },
  {
    title: "Bài tập về nhà",
    icon: <AssignmentIcon />,
  },
  {
    title: "Cài đặt",
    icon: <SettingsIcon />,
  },
];

const VerticalMenu = () => {
  return (
    <div className="h-screen w-[250px] px-4 py-5 flex-col justify-start items-start gap-2.5 inline-flex">
      <div className="justify-start items-center gap-0.5 inline-flex mb-6">
        <img src={logo} alt="Logo" className="h-8 w-25 object-contain " />
      </div>
      <div className="self-stretch px-4 justify-start items-center gap-4 inline-flex mb-6">
        <div className="w-[82px] h-[82px] rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="https://via.placeholder.com/82x82"
            alt="Avatar"
          />
        </div>
        <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
          <div className="text-[#121619] text-[22px] font-bold font-['Poppins'] leading-[33px]">
            John Doe
          </div>
          <div className="text-[#697077] text-sm font-normal font-['Poppins']">
            Student
          </div>
        </div>
      </div>
      <Divider className="w-full" />
      <div className="flex-col justify-start items-start gap-4 inline-flex w-full pt-6">
        {verMenuData.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton className="hover:bg-gray-100">
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} className="text-gray-800" />
            </ListItemButton>
          </ListItem>
        ))}
      </div>
      </div>
  );
};

export default VerticalMenu;
