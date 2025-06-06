import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Update this with your backend URL

// Create axios instance with default config
const examApi = axios.create({
    baseURL: `${API_URL}/exams`,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor to include auth token
examApi.interceptors.request.use(
    (config) =>
    {
        const token = localStorage.getItem('token');
        if (token)
        {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) =>
    {
        return Promise.reject(error);
    }
);

// API functions
export const examService = {
    // Get all exams with optional filters
    getAllExams: async (filters = {}) =>
    {
        try
        {
            const response = await examApi.get('/', { params: filters });
            return response.data;
        } catch (error)
        {
            throw error.response?.data || error.message;
        }
    },

    // Get exams for a specific course
    getCourseExams: async (courseId, filters = {}) =>
    {
        try
        {
            const response = await examApi.get(`/course/${courseId}`, { params: filters });
            return response.data;
        } catch (error)
        {
            throw error.response?.data || error.message;
        }
    },

    // Get exams created by a user
    getUserExams: async (userId, filters = {}) =>
    {
        try
        {
            const response = await examApi.get(`/user/${userId}`, { params: filters });
            return response.data;
        } catch (error)
        {
            throw error.response?.data || error.message;
        }
    },

    // Create new exam
    createExam: async (examData) =>
    {
        try
        {
            const response = await examApi.post('/', examData);
            return response.data;
        } catch (error)
        {
            throw error.response?.data || error.message;
        }
    },

    // Delete exam (soft delete)
    deleteExam: async (examId) =>
    {
        try
        {
            const response = await examApi.delete(`/${examId}`);
            return response.data;
        } catch (error)
        {
            throw error.response?.data || error.message;
        }
    },

    // Hard delete exam
    hardDeleteExam: async (examId) =>
    {
        try
        {
            const response = await examApi.delete(`/${examId}/hard`);
            return response.data;
        } catch (error)
        {
            throw error.response?.data || error.message;
        }
    }
}; 