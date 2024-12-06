// src/context/UserContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Загружаем данные из localStorage, если они есть
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (userData) => {
        // Сохраняем данные пользователя, включая id, name, email и password
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); // Сохраняем в localStorage
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); // Удаляем из localStorage
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
