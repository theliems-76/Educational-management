import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/admin/dashboard/teacher';

export const getTutors = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách giáo viên:', error);
    throw error;
  }
};

export const addTutor = async (teacher) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create`, teacher);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi thêm giáo viên:', error);
    throw error;
  }
};

export const updateTutor = async (teacher) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${teacher.id}`, teacher);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật giáo viên:', error);
    throw error;
  }
};

export const getTutorById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi lấy thông tin giáo viên với ID ${id}:`, error);
    throw error;
  }
};

export const searchTutors = async (username) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search?username=${username}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tìm kiếm giáo viên:', error);
    throw error;
  }
};

export const deleteTutor = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/delete/${id}`);
    return response.data; // Có thể API không trả về data
  } catch (error) {
    console.error(`Lỗi khi xóa giáo viên với ID ${id}:`, error);
    throw error;
  }
};