import React from 'react';
import CourseCard from './components/UI/CourseCard';

const courses = [
  {
    id: 1,
    title: "Math class - 1",
    teacher: "Rora",
    image: "/math.png", // Thay bằng ảnh thật
  },
  {
    id: 2,
    title: "Science class - 1",
    teacher: "John Doe",
    image: "/physic.png", // Thay bằng ảnh thật
  },
  // ...
];

function MyCourses() {
  return (
    <div className="flex flex-wrap gap-4">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

export default MyCourses;