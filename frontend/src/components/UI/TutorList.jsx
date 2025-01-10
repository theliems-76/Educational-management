import React, { useState, useCallback, useEffect } from 'react';
import TutorTable from '../share/TutorTable';
import Pagination from '../share/Pagination';
import AddTutorModal from '../share/AddTutorModal';
import EditTutorModal from '../share/EditTutorModal';
import TutorSearch from '../share/TutorSearch';
import {
  addTutor,
  updateTutor,
  getTutorById,
  searchTutors,
} from '../../apis/teacherApi';

const TutorList = ({ teachers, setTeachers }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newTutor, setNewTutor] = useState({
    username: '',
    email: '',
    phone: '',
    subject_name: '',
    gender: 'Nam',
    school: '',
    dob: '',
    income: 0,
  });
  const [editTutor, setEditTutor] = useState({
    id: '',
    username: '',
    email: '',
    phone: '',
    subject_name: '',
    gender: '',
    school: '',
    dob: '',
    income: 0,
  });
  const [notification, setNotification] = useState('');
  const [notificationType, setNotificationType] = useState('');
  const [notificationError, setNotificationError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Tìm kiếm giáo viên khi searchQuery thay đổi
  useEffect(() => {
    const timerId = setTimeout(() => {
      const fetchTutorsBySearch = async () => {
        try {
          if (searchQuery) {
            const filteredTutors = await searchTutors(searchQuery);
            setTeachers(filteredTutors);
          } else {
            // Không gọi lại getTutors() nữa.
            // Dữ liệu đã được load từ component cha TutorManagement.
          }
        } catch (error) {
          console.error('Lỗi khi tìm kiếm giáo viên:', error);
        }
      };

      fetchTutorsBySearch();
    }, 500);

    return () => clearTimeout(timerId);
  }, [searchQuery, setTeachers]);

  // Cập nhật lại số trang khi thay đổi danh sách giáo viên
  useEffect(() => {
    const totalPages = Math.ceil(teachers.length / rowsPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages > 0 ? totalPages : 1);
    }
  }, [currentPage, teachers.length, rowsPerPage]);

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
      const allIds = teachers.map((teacher) => teacher.id);
      setSelectedRows(allIds);
    } else {
      setSelectedRows([]);
    }
  };

  const handleOpenModal = () => {
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = async (tutor) => {
    setEditTutor(tutor);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = useCallback(() => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setNewTutor({
      username: '',
      email: '',
      phone: '',
      subject_name: '',
      gender: 'Nam',
      school: '',
      dob: '',
      income: 0,
    });
    setEditTutor({
      id: '',
      username: '',
      email: '',
      phone: '',
      subject_name: '',
      gender: '',
      school: '',
      dob: '',
      income: 0,
    });
    setNotification('');
    setNotificationType('');
    setNotificationError('');
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewTutor((prev) => ({ ...prev, [name]: value }));
    setEditTutor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newTutor.username || !newTutor.email) {
      setNotificationError('Vui lòng điền đầy đủ thông tin.');
      setNotificationType('add');
      return;
    }

    try {
      const addedTutor = await addTutor(newTutor);
      setTeachers([addedTutor, ...teachers]);

      setNotification('Thêm giáo viên thành công!');
      setNotificationType('add');
      setTimeout(() => {
        handleCloseModal();
        setNotification(null);
        setNotificationType(null);
      }, 1000);
    } catch (error) {
      console.error('Lỗi khi thêm giáo viên:', error);
      setNotificationError(
        error.response?.data?.message || 'Thêm giáo viên thất bại.'
      );
      setNotificationType('add');
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    if (!editTutor.username || !editTutor.email) {
      setNotificationError('Vui lòng điền đầy đủ thông tin.');
      setNotificationType('edit');
      return;
    }
    try {
      const updatedTutor = await updateTutor(editTutor);
      setTeachers((prevTutors) =>
        prevTutors.map((tutor) =>
          tutor.id === updatedTutor.id ? updatedTutor : tutor
        )
      );

      setNotification('Cập nhật thông tin giáo viên thành công!');
      setNotificationType('edit');
      setTimeout(() => {
        handleCloseModal();
        setNotification(null);
        setNotificationType(null);
      }, 1000);
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin giáo viên:', error);
      setNotificationError(
        error.response?.data?.message || 'Cập nhật thông tin giáo viên thất bại.'
      );
      setNotificationType('edit');
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentTutors = teachers.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(teachers.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async () => {
    if (selectedRows.length === 0) {
      setNotificationError('Vui lòng chọn ít nhất một giáo viên để xóa.');
      setNotificationType('error');
      return;
    }

    if (
      window.confirm(
        `Bạn có chắc chắn muốn xóa ${selectedRows.length} giáo viên không?`
      )
    ) {
      try {
        for (const id of selectedRows) {
          await deleteTutor(id);
        }

        setTeachers((prevTeachers) =>
          prevTeachers.filter((teacher) => !selectedRows.includes(teacher.id))
        );

        setNotification('Xóa giáo viên thành công!');
        setNotificationType('success');
        setSelectedRows([]);
      } catch (error) {
        console.error('Lỗi khi xóa giáo viên:', error);
        setNotificationError(
          error.response?.data?.message || 'Xóa giáo viên thất bại.'
        );
        setNotificationType('error');
      } finally {
        setTimeout(() => {
          setNotification(null);
          setNotificationType(null);
          setNotificationError(null);
        }, 3000);
      }
    }
  };

  return (
    <div className="w-full font-sans p-4 relative">
      <div className="mb-4 flex items-center justify-between">
        <TutorSearch searchQuery={searchQuery} handleSearch={handleSearch} />
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={handleOpenModal}
          >
            + Thêm giáo viên
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDelete}
            disabled={selectedRows.length === 0}
          >
            Xóa
          </button>
        </div>
      </div>
      {notification && (
        <div
          className={`notification ${
            notificationType === 'add' || notificationType === 'success'
              ? 'bg-green-100 border-green-500 text-green-900'
              : 'bg-red-100 border-red-500 text-red-900'
          } border-t-4 rounded-b px-4 py-3 shadow-md mb-4`}
          role="alert"
        >
          <div className="flex items-center">
            <div className="py-1">
              {notificationType === 'add' || notificationType === 'success' ? (
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
                {notificationType === 'add' || notificationType === 'edit'
                  ? notification
                  : notificationError}
              </p>
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
        teachers={currentTutors}
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
        totalStudents={teachers.length}
      />
    </div>
  );
};

export default TutorList;