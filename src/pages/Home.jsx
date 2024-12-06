// src/pages/Home.jsx

import React, { useEffect, useState } from "react";
import ThreadCard from "../components/ThreadCard";
import axios from "axios";
import { getThreads } from "../services/api";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Home = () => {
    const [threads, setThreads] = useState([]);
    const { user, logout } = useUser(); // Используем UserContext для получения пользователя и выхода

    useEffect(() => {
        // Загружаем данные с сервера
        axios
            .get("http://localhost:5245/api/threads") // Пример URL
            .then((response) => setThreads(response.data))
            .catch((error) => console.error("Ошибка загрузки тем:", error));
    }, []);

    useEffect(() => {
        getThreads()
            .then((data) => setThreads(data))
            .catch((error) => console.error("Ошибка:", error));
    }, []);

    return (
        <div className="home-page">
            <h1>Темы форума</h1>

            {/* Если пользователь вошел, показываем имя и кнопку выхода */}
            {user ? (
                <div>
                    <p>Привет, {user.name}!</p>
                    <button onClick={logout}>Выйти</button>
                    <Link to="/profile">Перейти в профиль</Link>
                </div>
            ) : (
                // Если не вошел, показываем кнопку входа
                <Link to="/login">Войти</Link>
            )}

            {/* Отображаем список тем */}
            {threads.length > 0 ? (
                threads.map((thread) => (
                    <ThreadCard
                        key={thread.id}
                        id={thread.id}
                        title={thread.title}
                        description={thread.description}
                        postCount={thread.postCount}
                    />
                ))
            ) : (
                <p>Загрузка тем...</p>
            )}
        </div>
    );
};

export default Home;
