import React, { useState, useCallback, useEffect } from 'react';
import StudentTable from '../share/StudentTable';
import Pagination from '../share/Pagination';
import AddStudentModal from '../share/AddStudentModal';
import EditStudentModal from '../share/EditStudentModal';
import TutorSearch from '../share/TutorSearch';
import {
  addStudent,
  updateStudent,
  getStudents,
  getStudentById,
  searchStudents,
} from '../../apis/studentApi';
import axios from 'axios';
const StudentList = ({ setStudents }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    username: '',
    gender: '',
    phone: '',
    dob: '',
    classOfSchool: '',
    school: '',
    email: '',
    classStudents: [],
  });
  const [editStudent, setEditStudent] = useState({
    id: '',
    username: '',
    gender: '',
    phone: '',
    dob: '',
    classOfSchool: '',
    school: '',
    email: '',
    classStudents: [],
  });
  const [notification, setNotification] = useState('');
  const [notificationType, setNotificationType] = useState('');
  const [notificationError, setNotificationError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [students, setStudent] = useState([]);

  // Lấy danh sách học viên từ API khi component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsData = await getStudents();
        setStudents(studentsData);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách học viên:', error);
        setNotificationError(
          'Không thể lấy danh sách học viên. Vui lòng thử lại sau.'
        );
        setNotificationType('error');
      }
    };

    fetchStudents();
  }, []);

  // Tìm kiếm học viên khi searchQuery thay đổi
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchQuery) {
        const fetchStudentsBySearch = async () => {
          try {
            const filteredStudents = await searchStudents(searchQuery);
            setStudents(filteredStudents);
          } catch (error) {
            console.error('Lỗi khi tìm kiếm học viên:', error);
          }
        };

        fetchStudentsBySearch();
      } else {
        // Nếu searchQuery trống, lấy lại toàn bộ danh sách
        const fetchAllStudents = async () => {
          try {
            const allStudents = await getStudents();
            setStudents(allStudents);
          } catch (error) {
            console.error('Lỗi khi lấy danh sách tất cả học viên:', error);
          }
        };

        fetchAllStudents();
      }
    }, 500);

    return () => clearTimeout(timerId);
  }, [searchQuery]);

  // Cập nhật lại số trang khi thay đổi danh sách học viên
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages > 0 ? totalPages : 1);
    }
  }, [currentPage, students.length, rowsPerPage]);

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
      const allIds = students.map((student) => student.idStudent);
      setSelectedRows(allIds);
    } else {
      setSelectedRows([]);
    }
  };

  const handleOpenModal = () => {
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = async (student) => {
    try {
      const studentData = await getStudentById(student.idStudent);

      setEditStudent({
        id: studentData.idStudent,
        username: studentData.user.username,
        gender: studentData.gender,
        phone: studentData.user.phone,
        dob: studentData.dob,
        classOfSchool: studentData.classOfSchool,
        school: studentData.school,
        email: studentData.user.email,
        classStudents: studentData.classStudents || [],
      });

      setIsEditModalOpen(true);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin học viên:', error);
      setNotificationError(
        'Không thể lấy thông tin học viên. Vui lòng thử lại sau.'
      );
      setNotificationType('error');
    }
  };

  const handleCloseModal = useCallback(() => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setNewStudent({
      username: '',
      gender: '',
      phone: '',
      dob: '',
      classOfSchool: '',
      school: '',
      email: '',
      classStudents: [],
    });
    setEditStudent({
      id: '',
      username: '',
      gender: '',
      phone: '',
      dob: '',
      classOfSchool: '',
      school: '',
      email: '',
      classStudents: [],
    });
    setNotification('');
    setNotificationType('');
    setNotificationError('');
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'classStudents') {
      setNewStudent((prev) => ({
        ...prev,
        classStudents: value.split(',').map((item) => item.trim()),
      }));
      setEditStudent((prev) => ({
        ...prev,
        classStudents: value.split(',').map((item) => item.trim()),
      }));
    } else {
      setNewStudent((prev) => ({ ...prev, [name]: value }));
      setEditStudent((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!newStudent.username || !newStudent.phone) {
      setNotificationError('Tên đăng nhập và số điện thoại là bắt buộc.');
      setNotificationType('add');
      return;
    }

    try {
      const addedStudent = await addStudent(newStudent);
      setStudents([addedStudent, ...students]);

      setNotification('Thêm học viên thành công!');
      setNotificationType('add');
      setTimeout(() => {
        handleCloseModal();
        setNotification(null);
        setNotificationType(null);
      }, 1000);
    } catch (error) {
      console.error('Lỗi khi thêm học viên:', error);
      setNotificationError(
        error.response?.data?.message || 'Thêm học viên thất bại.'
      );
      setNotificationType('add');
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    if (!editStudent.username || !editStudent.phone) {
      setNotificationError('Tên đăng nhập và số điện thoại là bắt buộc.');
      setNotificationType('edit');
      return;
    }

    try {
      const updatedStudent = await updateStudent(editStudent);
      setStudents(
        students.map((student) =>
          student.idStudent === updatedStudent.idStudent
            ? updatedStudent
            : student
        )
      );

      setNotification('Cập nhật thông tin học viên thành công!');
      setNotificationType('edit');
      setTimeout(() => {
        handleCloseModal();
        setNotification(null);
        setNotificationType(null);
      }, 1000);
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin học viên:', error);
      setNotificationError(
        error.response?.data?.message || 'Cập nhật thông tin học viên thất bại.'
      );
      setNotificationType('edit');
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to the first page when rows per page changes
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentStudents = students.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(students.length / rowsPerPage);

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
      {/* Hiển thị thông báo */}
      {notification && (
        <div
          className={`notification ${
            notificationType === 'add'
              ? 'bg-green-100 border-green-500 text-green-900'
              : 'bg-red-100 border-red-500 text-red-900'
          } border-t-4 rounded-b px-4 py-3 shadow-md mb-4`}
          role="alert"
        >
          <div className="flex items-center">
            <div className="py-1">
              {notificationType === 'add' ? (
                <svg
                  className="fill-current h-6 w-6 text-green-500 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                </svg>
              ) : (
                <svg
                  className="fill-current h-6 w-6 text-red-500 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.07 7.07 1.414 1.414L10 11.414l7.07 7.07 1.414-1.414L11.414 10l7.07-7.07-1.414-1.414L10 8.586z" />
                </svg>
              )}
            </div>
            <div>
              <p className="font-bold">
                {notificationType === 'add' ? notification : notificationError}
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Modal thêm học viên */}
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
      {/* Modal sửa học viên */}
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
      {/* Bảng danh sách học viên */}
      <StudentTable
        students={currentStudents}
        selectedRows={selectedRows}
        handleRowSelect={handleRowSelect}
        handleOpenEditModal={handleOpenEditModal}
      />
      {/* Phân trang */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        handlePageChange={handlePageChange}
        handleRowsPerPageChange={handleRowsPerPageChange}
        totalStudents={students.length}
      />
    </div>
  );
};

export default StudentList;