import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate
import { useUser } from "../context/UserContext";

const Profile = () => {
    const { user } = useUser(); // Получаем данные пользователя из контекста
    const [profileData, setProfileData] = useState(null);
    const navigate = useNavigate(); // Инициализируем useNavigate

    useEffect(() => {
        if (user) {
            // Используем данные, полученные из контекста
            setProfileData({
                name: user.name,
                email: user.email,
                id: user.id,
            });
        }
    }, [user]);

    const handleGoHome = () => {
        navigate("/"); // Перенаправляем на главную
    };

    return (
        <div>
            {user ? (
                <div>
                    <h1>{profileData ? profileData.name : "Загрузка профиля..."}</h1>
                    <p>{profileData ? profileData.email : ""}</p>
                    <p>ID пользователя: {profileData ? profileData.id : ""}</p>
                    <button onClick={handleGoHome}>На главную</button>
                </div>
            ) : (
                <p>Вы не вошли в систему.</p>
            )}
        </div>
    );
};

export default Profile;
