import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import TutorList from "../../components/UI/TutorList";

function TutorManagement() {
    const [tutors, setTutors] = useState([
        {
            id: 1,
            name: "Nguyen Van A",
            gender: "Nam",
            phoneNumber: "0912345678",
            dateOfBirth: "1990-05-10",
            major: "Toán",
            school: "Đại học Sư Phạm",
            teachingClasses: ["10A1", "10A2"],
            hourlyRate: "$100",
        },
        {
            id: 2,
            name: "Tran Thi B",
            gender: "Nữ",
            phoneNumber: "0987654321",
            dateOfBirth: "1992-02-15",
            major: "Văn",
            school: "Đại học Khoa Học Xã Hội và Nhân Văn",
            teachingClasses: ["11A1", "11A2", "12A3"],
            hourlyRate: "$120",
        },
        {
            id: 3,
            name: "Le Van C",
            gender: "Nam",
            phoneNumber: "0911122233",
            dateOfBirth: "1995-07-20",
            major: "Hóa",
            school: "Đại học Bách Khoa",
            teachingClasses: ["10B1", "10B2", "11B1", "12A1"],
            hourlyRate: "$110",
        },
        {
            id: 4,
            name: "Hoang Thi D",
            gender: "Nữ",
            phoneNumber: "0933344455",
            dateOfBirth: "1994-12-01",
            major: "Lý",
            school: "Đại học Sư Phạm Kỹ Thuật",
            teachingClasses: ["10A1", "10A2", "11B1", "11B2"],
            hourlyRate: "$130",
        },
        {
            id: 5,
            name: "Pham Van E",
            gender: "Nam",
            phoneNumber: "0977788899",
            dateOfBirth: "1993-09-05",
            major: "Sinh",
            school: "Đại học Khoa Học Tự Nhiên",
            teachingClasses: ["12A2", "12A3"],
            hourlyRate: "$150",
        },
        {
            id: 6,
            name: "Nguyen Van F",
            gender: "Nam",
            phoneNumber: "0955566677",
            dateOfBirth: "1991-10-12",
            major: "Lịch sử",
            school: "Đại học Khoa Học Xã Hội",
            teachingClasses: ["10A1", "11A1", "12A1"],
            hourlyRate: "$140",
        },
        {
            id: 7,
            name: "Le Thi G",
            gender: "Nữ",
            phoneNumber: "0966677788",
            dateOfBirth: "1996-06-08",
            major: "Địa lý",
            school: "Đại học Khoa Học Tự Nhiên",
            teachingClasses: ["11A2", "12A3"],
            hourlyRate: "$160",
        },
        {
            id: 8,
            name: "Tran Van H",
            gender: "Nam",
            phoneNumber: "0922233344",
            dateOfBirth: "1997-04-17",
            major: "Tiếng Anh",
            school: "Đại học Hà Nội",
            teachingClasses: ["10A1", "10A2", "11A1"],
            hourlyRate: "$170",
        }
    ]);


    const addTutor = async (newTutor) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newId = tutors.length > 0 ? Math.max(...tutors.map(t => t.id)) + 1 : 1;
                const tutorWithId = { ...newTutor, id: newId };
                resolve(tutorWithId);
            }, 500);
        });
    };

    const updateTutor = async (updatedTutor) => {
        return new Promise((resolve) => {
           setTimeout(() => {
                resolve(updatedTutor);
            }, 500);
        });
   };

    return (
        <Box p={3}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={4}
            >
                <Typography variant="h4" component="h1">
                    Danh sách Giáo Viên
                </Typography>
            </Box>
            <TutorList
                tutors={tutors}
                setTutors={setTutors}
                addTutor={addTutor}
                updateTutor={updateTutor}
            />
        </Box>
    );
}

export default TutorManagement;