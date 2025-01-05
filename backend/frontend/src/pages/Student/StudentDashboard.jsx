import React from "react";
import StudentLayout from "../../components/Layouts/StudentLayout";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import StudySchedule from "./StudentSchedule";
import StudentProfile from "./StudentProfile";
import ClassList from "./StudentClass";
function StudentDashboard() {
  return (
    <StudentLayout>
      <Routes>
        <Route path="my-courses" element={<ClassList />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="timetable" element={<StudySchedule />} />
        <Route path="dashboard" element={<Dashboard/>}/>
      </Routes>
    </StudentLayout>
  );
}
export default StudentDashboard;