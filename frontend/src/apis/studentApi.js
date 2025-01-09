import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/admin/home/student'; // Sửa đường dẫn base URL

export const getStudents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all`); // Lấy tất cả học viên
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách học viên:', error);
    throw error;
  }
};

export const addStudent = async (student) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create`, student); // Thêm học viên mới
    return response.data;
  } catch (error) {
    console.error('Lỗi khi thêm học viên:', error);
    throw error;
  }
};

export const updateStudent = async (student) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${student.id}`, student); // Cập nhật học viên
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật học viên:', error);
    throw error;
  }
};
export const getStudentById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi lấy thông tin học viên với ID ${id}:`, error);
    throw error;
  }
};
export const searchStudents = async (username) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search?username=${username}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tìm kiếm học viên:', error);
    throw error;
  }
};
export const deleteStudent = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi xóa học viên với ID ${id}:`, error);
    throw error;
  }
};