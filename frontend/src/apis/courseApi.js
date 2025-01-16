import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/admin'; // Điều chỉnh base URL

// Lấy danh sách tất cả lớp học
export const getCourses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/class/view/all`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách lớp học:', error);
    throw error;
  }
};

// Thêm lớp học mới
export const addCourse = async (course) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/class/create-class`, course);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi thêm lớp học:', error);
    throw error;
  }
};

// Cập nhật thông tin lớp học
export const updateCourse = async (courseId, courseData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/class/update/${courseId}`,
      courseData
    );
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật lớp học:', error);
    throw error;
  }
};

// Xóa lớp học
export const deleteCourse = async (courseId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/class/delete/${courseId}`
    );
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa lớp học:', error);
    throw error;
  }
};

// Tìm kiếm lớp học theo tên
export const searchCourses = async (searchTerm) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/class/search`, {
      params: { name: searchTerm },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tìm kiếm lớp học:', error);
    throw error;
  }
};

// Lấy thông tin lớp học theo ID
export const getCourseById = async (classId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/class/search/${classId}`
    );
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy thông tin lớp học:', error);
    throw error;
  }
};

// Lấy danh sách lớp học theo giáo viên
export const getCoursesByTeacher = async (teacherId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/class/teacher/${teacherId}`
    );
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách lớp học theo giáo viên:', error);
    throw error;
  }
};

// Lấy danh sách học viên của một lớp học
export const getStudentsByCourse = async (classId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/class/class/${classId}/list-students`
    );
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách học viên của lớp học:', error);
    throw error;
  }
};

// Thêm học viên vào lớp học
export const addStudentToCourse = async (classId, studentId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/class/${classId}/add-students/${studentId}`
    );
    return response.data;
  } catch (error) {
    console.error('Lỗi khi thêm học viên vào lớp học:', error);
    throw error;
  }
};

// Xóa học viên khỏi lớp học
export const removeStudentFromCourse = async (classId, studentId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/class/${classId}/delete-students/${studentId}`
    );
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa học viên khỏi lớp học:', error);
    throw error;
  }
};