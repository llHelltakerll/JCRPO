// src/services/api.js
import axios from "axios";


// Получить информацию о теме по ID
export const getThreadById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:5245/swagger/api/threads/${id}`);
        return response.data;
    } catch (error) {
        console.error("Ошибка получения темы:", error);
        throw error;
    }
};

// Получить посты в теме по ID
export const getPostsByThreadId = async (threadId) => {
    try {
        const response = await axios.get(`http://localhost:5245/api/threads/${threadId}/posts`);
        return response.data;
    } catch (error) {
        console.error("Ошибка получения постов:", error);
        throw error;
    }
};
// src/services/api.js

// Получить пост по ID
export const getPostById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:5245/api/posts/${id}`);
        return response.data;
    } catch (error) {
        console.error("Ошибка получения поста:", error);
        throw error;
    }
};

// Получить комментарии к посту
export const getCommentsByPostId = async (postId) => {
    try {
        const response = await axios.get(`http://localhost:5245/api/posts/${postId}/comments`);
        return response.data;
    } catch (error) {
        console.error("Ошибка получения комментариев:", error);
        throw error;
    }
};

// Добавить комментарий к посту
export const addCommentToPost = async (postId, content) => {
    try {
        const response = await axios.post(`http://localhost:5245/api/posts/${postId}/comments`, { content });
        return response.data;
    } catch (error) {
        console.error("Ошибка добавления комментария:", error);
        throw error;
    }
};

// src/services/api.js

// Вход пользователя
export const login = async (email, password) => {
    try {
        const response = await axios.post("http://localhost:5245/api/auth/login", {
            email,
            password,
        });
        return response.data; // Возвращаем токен
    } catch (error) {
        console.error("Ошибка авторизации:", error);
        throw error;
    }
};
export const getThreads = async () => {
    try {
        const response = await axios.get("http://localhost:5245/api/threads");
        return response.data;
    } catch (error) {
        console.error("Ошибка загрузки тем:", error);
        throw error; // Чтобы можно было поймать ошибку в компоненте
    }
};