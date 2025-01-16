import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/user';

export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy thông tin profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (id, profileData, resetPassword) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/profile/update/${id}?resetPassword=${resetPassword}`,
      profileData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật thông tin profile:', error);
    throw error;
  }
};