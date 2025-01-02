import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import StudentList from "../../components/UI/StudentList";
import dummyStudents from "../../utils/dummyStudents"; // Correct path to dummyStudents

function StudentManagement() {
    const [students, setStudents] = useState([]);

    // Use useEffect to initialize students from dummyStudents when the component mounts
    useEffect(() => {
        setStudents(dummyStudents);
    }, []);

    const addStudent = async (newStudent) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Generate a unique ID for the new student.
                // Ensure the new ID is a string and greater than any existing ID
                const newId = (
                    students.length > 0
                        ? Math.max(...students.map((s) => parseInt(s.id, 10))) + 1
                        : 1
                ).toString();
                const studentWithId = { ...newStudent, id: newId };
                setStudents((prevStudents) => [...prevStudents, studentWithId]);
                resolve(studentWithId);
            }, 500);
        });
    };

    const updateStudent = async (updatedStudent) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                setStudents((prevStudents) =>
                    prevStudents.map((student) =>
                        student.id === updatedStudent.id ? updatedStudent : student
                    )
                );
                resolve(updatedStudent);
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
                    Danh sách học viên
                </Typography>
            </Box>
            <StudentList
                students={students}
                setStudents={setStudents}
                addStudent={addStudent} // You might not need these if you're not adding/updating directly from this component
                updateStudent={updateStudent} // But keep them if you are
            />
        </Box>
    );
}

export default StudentManagement;