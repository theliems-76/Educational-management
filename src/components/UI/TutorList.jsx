import React, { useState, useCallback } from "react";
import TutorTable from "../share/TutorTable";
import Pagination from "../share/Pagination";
import AddTutorModal from "../share/AddTutorModal";
import EditTutorModal from "../share/EditTutorModal";
import TutorSearch from "../share/TutorSearch";

const TutorList = ({ tutors, setTutors, addTutor, updateTutor }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newTutor, setNewTutor] = useState({
        id: "",
        name: "",
        gender: "",
        phoneNumber: "",
        dateOfBirth: "",
        major: "",
        school: "",
        teachingClasses: [],
        hourlyRate: ""
    });
    const [editTutor, setEditTutor] = useState({
        id: "",
        name: "",
        gender: "",
        phoneNumber: "",
        dateOfBirth: "",
        major: "",
        school: "",
        teachingClasses: [],
        hourlyRate: ""
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
            const allIds = tutors.map((tutor) => tutor.id);
            setSelectedRows(allIds);
        } else {
            setSelectedRows([]);
        }
    };

    const handleOpenModal = () => {
        setIsAddModalOpen(true);
    };

    const handleOpenEditModal = (tutor) => {
        setEditTutor(tutor);
        setIsEditModalOpen(true);
    };

    const handleCloseModal = useCallback(() => {
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        setNewTutor({
            id: "",
            name: "",
            gender: "",
            phoneNumber: "",
            dateOfBirth: "",
            major: "",
            school: "",
            teachingClasses: [],
            hourlyRate: "",
        });
        setEditTutor({
            id: "",
            name: "",
            gender: "",
            phoneNumber: "",
            dateOfBirth: "",
            major: "",
            school: "",
            teachingClasses: [],
            hourlyRate: "",
        });
        setNotification("");
        setNotificationType("");
        setNotificationError("");
    }, [setIsAddModalOpen, setIsEditModalOpen, setNewTutor, setEditTutor, setNotification, setNotificationType, setNotificationError]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "teachingClasses") {
            setNewTutor(prev => ({ ...prev, teachingClasses: value.split(",").map(item => item.trim()) }));
            setEditTutor(prev => ({ ...prev, teachingClasses: value.split(",").map(item => item.trim()) }));
        } else {
             setNewTutor(prev => ({ ...prev, [name]: value }));
             setEditTutor(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const isExisting = tutors.some(
            (tutor) => tutor.id.toString() === newTutor.id.toString()
        );

        if (isExisting) {
            setNotificationError("Gia sư này đã tồn tại trong danh sách.");
            setNotificationType("add");
            return;
        }

        const newTutorWithArrayClasses = {
            ...newTutor,
            teachingClasses: newTutor.teachingClasses,
            id:newTutor.id,
            name:newTutor.name,
            gender:newTutor.gender,
            phoneNumber:newTutor.phoneNumber,
            dateOfBirth:newTutor.dateOfBirth,
            major:newTutor.major,
            school:newTutor.school,
            hourlyRate:newTutor.hourlyRate,

        };
        const res = await addTutor(newTutorWithArrayClasses);

        if (res && res.id) {
             setTutors([...tutors, newTutorWithArrayClasses]);
            setNotification("Đã thêm gia sư vào lớp!");
            setNotificationType("add");
            setTimeout(() => {
                handleCloseModal();
            }, 1000);
        } else {
            setNotificationError("Đã xảy ra lỗi khi thêm gia sư!");
        }
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();

        const isExisting = tutors.some(
            (tutor) =>
                tutor.id.toString() !== editTutor.id.toString() &&
                (tutor.name === editTutor.name || tutor.id.toString() === editTutor.id.toString())
        );

        if (isExisting) {
            setNotificationError("Gia sư này đã tồn tại trong danh sách.");
            setNotificationType("edit");
            return;
        }
        const editedTutorWithArrayClasses = {
            ...editTutor,
            teachingClasses: editTutor.teachingClasses
        }

        const res = await updateTutor(editedTutorWithArrayClasses);

        if (res && res.id) {
          const updatedTutors = tutors.map(tutor =>
              tutor.id === editTutor.id ? editedTutorWithArrayClasses : tutor
             );
          setTutors(updatedTutors);
            setNotification("Đã chỉnh sửa thông tin gia sư!");
            setNotificationType("edit");
            setTimeout(() => {
                handleCloseModal();
            }, 1000);
        } else {
            setNotificationError("Đã xảy ra lỗi khi chỉnh sửa thông tin gia sư!");
        }
    };


    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(1);
    };

    const filteredTutors = tutors.filter(
        (tutor) =>
            tutor.id.toString().includes(searchQuery) ||
            tutor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentTutors = filteredTutors.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredTutors.length / rowsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div className="w-full font-sans p-4 relative">
            <div className="mb-4 flex items-center justify-between">
                <TutorSearch searchQuery={searchQuery} handleSearch={handleSearch} />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleOpenModal}
                >
                    + Thêm giáo viên
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
            <AddTutorModal
                isModalOpen={isAddModalOpen}
                handleCloseModal={handleCloseModal}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                newTutor={newTutor}
                notification={notification}
                notificationType={notificationType}
                notificationError={notificationError}
            />
            <EditTutorModal
                isModalOpen={isEditModalOpen}
                handleCloseModal={handleCloseModal}
                handleEditSubmit={handleEditSubmit}
                handleChange={handleChange}
                editTutor={editTutor}
                notification={notification}
                notificationType={notificationType}
                notificationError={notificationError}
            />
            <TutorTable
                tutors={currentTutors}
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
                totalStudents={filteredTutors.length}
            />
        </div>
    );
};

export default TutorList;