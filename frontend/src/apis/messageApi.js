// src/apis/messageApi.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/chat';

// Lấy danh sách tin nhắn với một người
export const getMessages = async (receiverId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/view/${receiverId}`, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy tin nhắn:', error);
    throw error;
  }
};

// Lấy danh sách tin nhắn chưa đọc
export const getUnreadMessages = async (receiverId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/unread/${receiverId}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy tin nhắn chưa đọc:', error);
    throw error;
  }
};

// Lấy danh sách tất cả tin nhắn (gộp từ nhiều người)
export const getAllMessages = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/list`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tin nhắn:', error);
    throw error;
  }
};

// Tìm kiếm người dùng để nhắn tin
export const searchUsers = async (keyword) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search?keyword=${keyword}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tìm kiếm người dùng:', error);
    throw error;
  }
};

// Gửi tin nhắn mới
export const sendMessage = async (receiverId, content) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/send`, {
      receiverId,
      content,
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gửi tin nhắn:', error);
    throw error;
  }
};