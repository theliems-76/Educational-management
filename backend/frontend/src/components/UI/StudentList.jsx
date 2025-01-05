import React, { useState, useCallback } from "react";
import StudentTable from "../share/StudentTable";
import Pagination from "../share/Pagination";
import AddStudentModal from "../share/AddStudentModal";
import EditStudentModal from "../share/EditStudentModal";
import TutorSearch from "../share/TutorSearch";

const StudentList = ({ students, setStudents }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newStudent, setNewStudent] = useState({
        id: "",
        name: "",
        gender: "",
        phoneNumber: "",
        dateOfBirth: "",
        grade: "",
        school: "",
        extraClasses: [],
    });
    const [editStudent, setEditStudent] = useState({
        id: "",
        name: "",
        gender: "",
        phoneNumber: "",
        dateOfBirth: "",
        grade: "",
        school: "",
        extraClasses: [],
    });
    const [notification, setNotification] = useState("");
    const [notificationType, setNotificationType] = useState("");
    const [notificationError, setNotificationError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleRowSelect = (id) => {
        const isSelected = selectedRows.includes(id);
        if (isSelected) {
            setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    const handleSelectAll = (selectAll) => {
        if (selectAll) {
            const allIds = students.map((student) => student.id);
            setSelectedRows(allIds);
        } else {
            setSelectedRows([]);
        }
    };
    const handleOpenModal = () => {
        setIsAddModalOpen(true);
    };

    const handleOpenEditModal = (student) => {
        setEditStudent(student);
        setIsEditModalOpen(true);
    };
    const handleCloseModal = useCallback(() => {
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        setNewStudent({
            id: "",
            name: "",
            gender: "",
            phoneNumber: "",
            dateOfBirth: "",
            grade: "",
            school: "",
            extraClasses: [],
        });
        setEditStudent({
            id: "",
            name: "",
            gender: "",
            phoneNumber: "",
            dateOfBirth: "",
            grade: "",
            school: "",
            extraClasses: [],
        });
        setNotification("");
        setNotificationType("");
        setNotificationError("");
    }, [setIsAddModalOpen, setIsEditModalOpen, setNewStudent, setEditStudent, setNotification, setNotificationType, setNotificationError]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "extraClasses") {
             setNewStudent(prev => ({ ...prev, extraClasses: value.split(",").map(item => item.trim()) }));
             setEditStudent(prev => ({ ...prev, extraClasses: value.split(",").map(item => item.trim()) }));
        }else {
             setNewStudent(prev => ({ ...prev, [name]: value }));
            setEditStudent(prev => ({ ...prev, [name]: value }));
        }
    };
  const handleSubmit = (event) => {
        event.preventDefault();

        const isExisting = students.some(
            (student) => student.id.toString() === newStudent.id.toString()
        );

        if (isExisting) {
            setNotificationError("Học viên này đã tồn tại trong danh sách.");
            setNotificationType("add");
            return;
        }

        const newStudentWithArrayClasses = {
            ...newStudent,
             extraClasses: newStudent.extraClasses
        };

       setStudents([...students, newStudentWithArrayClasses]);
            setNotification("Đã thêm học viên vào lớp!");
             setNotificationType("add");
        setTimeout(() => {
            handleCloseModal();
        }, 1000);
    };
  const handleEditSubmit = (event) => {
        event.preventDefault();

        const isExisting = students.some(
            (student) =>
                student.id.toString() !== editStudent.id.toString() &&
                (student.name === editStudent.name || student.id.toString() === editStudent.id.toString())
        );

        if (isExisting) {
            setNotificationError("Học viên này đã tồn tại trong danh sách.");
            setNotificationType("edit");
            return;
        }
        const editedStudentWithArrayClasses = {
            ...editStudent,
             extraClasses: editStudent.extraClasses
        };
           const updatedStudents = students.map(student =>
               student.id === editStudent.id ? editedStudentWithArrayClasses : student
           );
           setStudents(updatedStudents);
        setNotification("Đã chỉnh sửa thông tin học viên!");
            setNotificationType("edit");
            setTimeout(() => {
                handleCloseModal();
            }, 1000);
    };
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(1);
    };
    const filteredStudents = students.filter(
        (student) =>
            student.id.toString().includes(searchQuery) ||
            student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <div className="w-full font-sans p-4 relative">
            <div className="mb-4 flex items-center justify-between">
                <TutorSearch searchQuery={searchQuery} handleSearch={handleSearch} />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleOpenModal}
                >
                    + Thêm học viên
                </button>
            </div>
            {notification && (
                <div className="bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md mb-4" role="alert">
                    <div className="flex">
                        <div>
                            <p className="text-sm">{notification}</p>
                        </div>
                    </div>
                </div>
            )}
            <AddStudentModal
                isModalOpen={isAddModalOpen}
                handleCloseModal={handleCloseModal}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                newStudent={newStudent}
                notification={notification}
                notificationType={notificationType}
                notificationError={notificationError}
            />
            <EditStudentModal
                isModalOpen={isEditModalOpen}
                handleCloseModal={handleCloseModal}
                handleEditSubmit={handleEditSubmit}
                handleChange={handleChange}
                editStudent={editStudent}
                notification={notification}
                notificationType={notificationType}
                notificationError={notificationError}
            />
            <StudentTable
                students={currentStudents}
                selectedRows={selectedRows}
                handleRowSelect={handleRowSelect}
                handleOpenEditModal={handleOpenEditModal}
            />
           <Pagination
                currentPage={currentPage}
               totalPages={totalPages}
               rowsPerPage={rowsPerPage}
               handlePageChange={handlePageChange}
                handleRowsPerPageChange={handleRowsPerPageChange}
                totalStudents={filteredStudents.length}
            />
        </div>
    );
};

export default StudentList;