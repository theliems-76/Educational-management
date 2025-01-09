import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ClassDetail from "./ClassDetail";

const classes = [
  {
    title: "HTML, CSS Pro",
    description: "Cho người mới bắt đầu",
    image: "https://via.placeholder.com/300x150.png?text=HTML,+CSS+Pro",
    teacher: "Sơn Đặng",
    students: 591,
    duration: "116h49p",
    badgeColor: "bg-blue-500",
    materials: ["Tài liệu 1", "Tài liệu 2", "Tài liệu 3"],
    exercises: ["Bài tập 1", "Bài tập 2", "Bài tập 3"],
  },
  {
    title: "Ngôn ngữ Sass",
    description: "Cho Frontend Developer",
    image: "https://via.placeholder.com/300x150.png?text=Ngôn+ngữ+Sass",
    teacher: "Sơn Đặng",
    students: 27,
    duration: "6h18p",
    badgeColor: "bg-pink-500",
    materials: ["Tài liệu 1", "Tài liệu 2"],
    exercises: ["Bài tập 1", "Bài tập 2"],
  },
  {
    title: "JavaScript Pro",
    description: "Cho người mới bắt đầu",
    image: "https://via.placeholder.com/300x150.png?text=JavaScript+Pro",
    teacher: "Sơn Đặng",
    students: 160,
    duration: "28h55p",
    badgeColor: "bg-yellow-500",
    materials: ["Tài liệu 1", "Tài liệu 2", "Tài liệu 3", "Tài liệu 4"],
    exercises: ["Bài tập 1", "Bài tập 2", "Bài tập 3", "Bài tập 4"],
  },
];

const ClassList = () => {
  const [selectedClass, setSelectedClass] = useState(null);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {!selectedClass ? (
        <>
          <Typography variant="h5" className="font-bold mb-10">
            Lớp học
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {classes.map((cls, index) => (
              <Card
                key={index}
                className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg cursor-pointer"
                onClick={() => setSelectedClass(cls)}
              >
                <div className={`h-32 ${cls.badgeColor}`}>
                  <CardMedia
                    component="img"
                    image={cls.image}
                    alt={cls.title}
                    className="h-full object-cover"
                  />
                </div>
                <CardContent>
                  <Typography variant="h6" className="font-bold text-lg">
                    {cls.title}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    {cls.description}
                  </Typography>
                  <div className="flex items-center mt-4">
                    <Avatar
                      alt={cls.teacher}
                      src="https://via.placeholder.com/40"
                      className="mr-2"
                    />
                    <Typography variant="body2" className="font-medium">
                      {cls.teacher}
                    </Typography>
                  </div>
                  <div className="flex justify-between items-center text-gray-500 text-sm mt-2">
                    <div className="flex items-center">
                      <CheckCircleIcon className="w-4 h-4 text-blue-500 mr-1" />
                      <span>{cls.students}</span>
                    </div>
                    <span>{cls.duration}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <ClassDetail
          cls={selectedClass}
          onClose={() => setSelectedClass(null)}
        />
      )}
    </div>
  );
};

export default ClassList;
