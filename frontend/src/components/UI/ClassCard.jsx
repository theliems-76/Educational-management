import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    Badge,
    styled,
    Button,
} from "@mui/material";
import {
    Person,
    AccessTime,
    Group,
    ClassRounded,
    MonetizationOn,
    Delete,
    Visibility,
    AdminPanelSettings
} from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';

const NewBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        backgroundColor: "#ed0b4c",
        color: "white",
        padding: "0 4px",
        borderRadius: "8.93px 0px 8.93px 0px",
        fontFamily: "Roboto",
        fontSize: "14px",
        fontStyle: "normal",
        fontWeight: "600",
        lineHeight: "24px",
    },
}));

const avatarImages = [
    '/math.png',
    '/english.png',
    '/chemistry.png',
    '/physic.png',
    '/biology.png',
];

function ClassCard({ id, title, day, time, image, numStudents }) {
    const navigate = useNavigate();
    const [randomAvatar, setRandomAvatar] = useState(null);

    useEffect(() => {
        if (!image && !randomAvatar) {
            const randomIndex = Math.floor(Math.random() * avatarImages.length);
            setRandomAvatar(avatarImages[randomIndex]);
        }
    }, [image, randomAvatar]);


    const handleViewDetails = () => {
        navigate(`/teacher/lesson-time-management/courselist/course-infor/${course.id}`); // Thêm course.id vào URL
    };

    const handleManageClass = () => {
        navigate(`/teacher/class-management/${id}`); // Thêm course.id vào URL
    }

    return (
        <div className="w-[275px]  bg-white rounded-[10px] border border-[#dde1e6] flex-col justify-start items-center inline-flex overflow-hidden shadow-md">
            <div className="self-stretch h-40 bg-[#dde1e6] justify-start items-start inline-flex overflow-hidden relative">
                <CardMedia
                    component="img"
                    image={image || randomAvatar}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="self-stretch p-4 bg-white flex-col justify-start items-start gap-1.5 flex" style={{ minHeight: '150px', }}>
                <Typography className="text-[#001d6c] text-base font-semibold font-['Poppins'] flex items-center gap-1">
                    <ClassRounded fontSize="small" /> {title}
                </Typography>
                <Typography className="text-[#001d6c] text-sm font-normal font-['Poppins'] flex place-items-start gap-1">
                    <AccessTime fontSize="small" /> Ngày: {day.join(" - ")}
                </Typography>
                <Typography className="text-[#001d6c] text-sm font-normal font-['Poppins'] flex place-items-start gap-1">
                    <AccessTime fontSize="small" /> Thời gian: {time}
                </Typography>
                <Typography className="text-[#001d6c] text-sm font-normal font-['Poppins'] flex place-items-start gap-1">
                    <Group fontSize="small" /> Số học viên: {numStudents}
                </Typography>
                <div className="self-stretch justify-between items-center inline-flex mt-auto gap-2">
                    <Button onClick={handleManageClass} variant="outlined" color="success">
                        <AdminPanelSettings fontSize="small" style={{ marginRight: '4px' }} /> Quản lý
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ClassCard;