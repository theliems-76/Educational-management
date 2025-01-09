import axios from 'axios';
import { API_ENDPOINTS } from '../apis/courseApi';

export const getAllCourses = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.GET_ALL_COURSES);
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

export const getCourseById = async (id) => {
  try {
    const response = await axios.get(API_ENDPOINTS.GET_COURSE_BY_ID(id));
    return response.data;
  } catch (error) {
    console.error('Error fetching course:', error);
    throw error;
  }
};

export const getClassesByName = async (name) => {
  try {
    const response = await axios.get(API_ENDPOINTS.GET_COURSES_BY_NAME, {
      params: { name },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching courses by name:', error);
    throw error;
  }
};

export const getAllClassesByTeacher = async (teacherId) => {
  try {
    const response = await axios.get(
      API_ENDPOINTS.GET_COURSES_BY_TEACHER(teacherId)
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching courses by teacher:', error);
    throw error;
  }
};

export const createCourse = async (request) => {
    try {
        const response = await axios.post(API_ENDPOINTS.CREATE_COURSE, request);
        return response.data;
    } catch (error) {
        console.error('Error creating course:', error);
        throw error;
    }
};

export const updateCourse = async (id, request) => {
  try {
    const response = await axios.put(API_ENDPOINTS.UPDATE_COURSE(id), request);
    return response.data;
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
};

export const deleteCourse = async (id) => {
  try {
    const response = await axios.delete(API_ENDPOINTS.DELETE_COURSE(id));
    return response.data;
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
};

export const addStudentToCourse = async (classId, studentId) => {
  try {
    const response = await axios.post(
      API_ENDPOINTS.ADD_STUDENT_TO_COURSE(classId, studentId)
    );
    return response.data;
  } catch (error) {
    console.error('Error adding student to course:', error);
    throw error;
  }
};

export const removeStudentFromCourse = async (classId, studentId) => {
  try {
    const response = await axios.delete(
      API_ENDPOINTS.REMOVE_STUDENT_FROM_COURSE(classId, studentId)
    );
    return response.data;
  } catch (error) {
    console.error('Error removing student from course:', error);
    throw error;
  }
};