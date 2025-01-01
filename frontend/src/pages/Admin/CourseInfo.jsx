import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CustomStudentTable from '../../components/UI/CustomStudentTable';
import AddStudentForCourseModal from '../../components/UI/AddStudentForCourseModal';
import dummyCourses from '../../utils/dummyCourses';
import { tutors as dummyTutors } from '../../utils/dummyTutors';
import Pagination from '../../components/share/Pagination';
import EditCourseModal from '../../components/share/EditCourseModal';

const CourseInfo = () => {
  const [isEditCourseModalOpen, setIsEditCourseModalOpen] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [course, setCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState(null);
  const [notificationError, setNotificationError] = useState(null);
  const [newStudent, setNewStudent] = useState({
    name: '',
    phoneNumber: '',
    gender: '',
    dateOfBirth: '',
    grade: '',
    school: '',
    extraClasses: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [teacherName, setTeacherName] = useState('Unknown Teacher');

  useEffect(() => {
    const storedCourses =
      JSON.parse(localStorage.getItem('dummyCourses')) || dummyCourses;
    const selectedCourse = storedCourses.find((c) => c.id === courseId);
    if (selectedCourse) {
      setCourse(selectedCourse);
      setStudents(selectedCourse.students);

      const teacher = dummyTutors.find(
        (tutor) => tutor.id === selectedCourse.teacher
      );
      setTeacherName(teacher ? teacher.name : 'Unknown Teacher');
    } else {
      navigate('/admin/lesson-time-management/courselist');
    }
  }, [courseId]);

  useEffect(() => {
    if (course) {
      setStudents(course.students);
      setCurrentPage(1);
    }
  }, [course]);

  const handleRowSelect = (studentId) => {
    if (selectedRows.includes(studentId)) {
      setSelectedRows(selectedRows.filter((id) => id !== studentId));
    } else {
      setSelectedRows([...selectedRows, studentId]);
    }
  };

  const handleOpenEditModal = (student) => {
    alert(`Chỉnh sửa sinh viên: ${student.name}`);
  };

  const handleCloseAddStudentModal = () => {
    setIsAddStudentModalOpen(false);
  };

  const handleOpenAddStudentModal = () => {
    setIsAddStudentModalOpen(true);
  };

  const handleAddStudentInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleAddStudentSubmit = (e) => {
    e.preventDefault();
    const newStudentId =
      course && course.students.length > 0
        ? parseInt(course.students[course.students.length - 1].id) + 1
        : 1; // Sửa lại logic tạo id
    const updatedStudent = { ...newStudent, id: newStudentId };

    const updatedCourse = {
      ...course,
      students: [...course.students, updatedStudent],
    };

    const storedCourses =
      JSON.parse(localStorage.getItem('dummyCourses')) || dummyCourses;
    const updatedCourses = storedCourses.map((c) =>
      c.id === course.id ? updatedCourse : c
    );
    localStorage.setItem('dummyCourses', JSON.stringify(updatedCourses));

    setCourse(updatedCourse);
    setStudents(updatedCourse.students);

    handleCloseAddStudentModal();
    setNewStudent({
      name: '',
      phoneNumber: '',
      gender: '',
      dateOfBirth: '',
      grade: '',
      school: '',
      extraClasses: [],
    });

    setNotification('Thêm sinh viên thành công');
    setNotificationType('add');
  };

  const handleDeleteStudents = () => {
    const updatedStudents = students.filter(
      (student) => !selectedRows.includes(student.id)
    );
    const updatedCourse = {
      ...course,
      students: updatedStudents,
    };

    const storedCourses =
      JSON.parse(localStorage.getItem('dummyCourses')) || dummyCourses;
    const updatedCourses = storedCourses.map((c) =>
      c.id === course.id ? updatedCourse : c
    );
    localStorage.setItem('dummyCourses', JSON.stringify(updatedCourses));

    setCourse(updatedCourse);
    setStudents(updatedStudents);
    setSelectedRows([]);

    setNotification('Xóa sinh viên thành công');
    setNotificationType('delete');
  };

  const handleOpenEditCourseModal = () => {
    setEditCourse(course);
    setIsEditCourseModalOpen(true);
  };

  const handleCloseEditCourseModal = () => {
    setIsEditCourseModalOpen(false);
    setEditCourse(null);
  };

  const handleEditCourseSubmit = async (updatedCourseData) => {
    setCourse(updatedCourseData);
  
    const storedCourses =
      JSON.parse(localStorage.getItem('dummyCourses')) || dummyCourses;
    const updatedCourses = storedCourses.map((c) =>
      c.id === updatedCourseData.id ? updatedCourseData : c
    );
    localStorage.setItem('dummyCourses', JSON.stringify(updatedCourses));
    setNotification('Đã chỉnh sửa thông tin lớp học');
    setNotificationType('edit');
    setTimeout(() => {
      setNotification(null);
      setNotificationType(null);
      setNotificationError(null);
      handleCloseEditCourseModal();
      window.location.reload(); // Reload trang
    }, 1000);
  };

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(null);
        setNotificationType(null);
      }, 3000);
    }
  }, [notification]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(students.length / rowsPerPage);
  const currentStudents = students.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      {/* Hiển thị thông báo */}
      {notification && notificationType === 'add' && (
        <div
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4"
          role="alert"
        >
          {notification}
        </div>
      )}

      {notification && notificationType === 'delete' && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
          role="alert"
        >
          {notification}
        </div>
      )}

      {notification && notificationType === 'edit' && (
          <div
            className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4"
            role="alert"
          >
            {notification}
          </div>
        )}

      {/* Nút và tiêu đề */}
      <div className="mb-4 flex justify-end items-center">
        <h2
          className="text-2xl font-bold mr-auto"
          style={{ fontFamily: 'Roboto' }}
        >
          Thông tin lớp học: {course.className}
        </h2>
        <div className="flex items-center">
          <Link
            to="/admin/lesson-time-management/courselist"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Trở lại danh sách khóa học
          </Link>
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleOpenEditCourseModal}
          >
            Chỉnh sửa thông tin khóa học
          </button>
        </div>
      </div>

      {/* Thông tin khóa học */}
      <div className="mb-4">
        <p>
          <span className="font-semibold">Giáo viên:</span> {teacherName}
        </p>
        <p>
          <span className="font-semibold">Lịch học:</span> {course.schedule}
        </p>
        <p>
          <span className="font-semibold">Ngày khai giảng:</span>{' '}
          {course.startDate}
        </p>
        <p>
          <span className="font-semibold">Học phí/tháng:</span>{' '}
          {course.tuitionFee}
        </p>
      </div>

      {/* Bảng sinh viên */}
      <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Roboto' }}>
        Danh sách học viên
      </h3>
      <CustomStudentTable
        students={currentStudents}
        selectedRows={selectedRows}
        handleRowSelect={handleRowSelect}
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

      {/* Nút chức năng */}
      <div className="mt-4">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={handleOpenAddStudentModal}
        >
          Thêm sinh viên
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDeleteStudents}
          disabled={selectedRows.length === 0}
        >
          Xóa sinh viên đã chọn
        </button>
      </div>

      {/* Modal thêm sinh viên */}
      <AddStudentForCourseModal
        isModalOpen={isAddStudentModalOpen}
        handleCloseModal={handleCloseAddStudentModal}
        handleSubmit={handleAddStudentSubmit}
        handleChange={handleAddStudentInputChange}
        newStudent={newStudent}
        notification={notification}
        notificationType={notificationType}
        notificationError={notificationError}
      />

      {/* Modal chỉnh sửa khóa học */}
      <EditCourseModal
        isModalOpen={isEditCourseModalOpen}
        handleCloseModal={handleCloseEditCourseModal}
        handleEditSubmit={handleEditCourseSubmit}
        editCourse={editCourse}
        notification={notification}
        notificationType={notificationType}
        notificationError={notificationError}
        tutors={dummyTutors}
        setNotification={setNotification}
        setNotificationType={setNotificationType}
        setNotificationError={setNotificationError}
      />
    </div>
  );
};

export default CourseInfo;