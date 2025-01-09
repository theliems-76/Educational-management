export const BASE_URL = '/class'; //  Đổi URL cho phù hợp với backend

export const API_ENDPOINTS = {
  GET_ALL_COURSES: `${BASE_URL}/view/all`,
  GET_COURSE_BY_ID: (id) => `${BASE_URL}/search/${id}`,
  GET_COURSES_BY_NAME: `${BASE_URL}/search`,
  GET_COURSES_BY_TEACHER: (teacherId) => `${BASE_URL}/teacher/${teacherId}`,
  CREATE_COURSE: `${BASE_URL}/create-class`,
  UPDATE_COURSE: (id) => `${BASE_URL}/update/${id}`,
  DELETE_COURSE: (id) => `${BASE_URL}/delete/${id}`,
  ADD_STUDENT_TO_COURSE: (classId, studentId) =>
    `${BASE_URL}/${classId}/add-students/${studentId}`,
  REMOVE_STUDENT_FROM_COURSE: (classId, studentId) =>
    `${BASE_URL}/${classId}/delete-students/${studentId}`,
};