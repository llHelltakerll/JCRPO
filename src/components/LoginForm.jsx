import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false); // Управление режимом регистрации
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useUser();

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerName, setRegisterName] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const loginResponse = await axios.post("http://localhost:5245/api/auth/login", {
                email,
                password,
            });

            const token = loginResponse.data.token;
            localStorage.setItem("authToken", token);

            const profileResponse = await axios.get("http://localhost:5245/api/auth/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            login({
                id: profileResponse.data.id,
                name: profileResponse.data.name,
                email: profileResponse.data.email,
            });

            navigate("/profile");
        } catch (err) {
            setError("Неверный логин или пароль");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!registerEmail.trim() || !registerPassword.trim() || !registerName.trim()) {
            setError("Заполните все поля для регистрации");
            return;
        }

        try {
            await axios.post("http://localhost:5245/api/auth/register", {
                email: registerEmail,
                name: registerName,
                passwordhash: registerPassword,
            });

            setError("");
            alert("Регистрация успешна! Теперь войдите в систему.");
            setIsRegistering(false); // Возвращаемся в режим логина
        } catch (err) {
            setError("Ошибка регистрации: " + (err.response?.data || err.message));
        }
    };

    return (
        <div className="login-form">
            <h1>{isRegistering ? "Регистрация" : "Вход"}</h1>
            {error && <p className="error">{error}</p>}
            {isRegistering ? (
                <form onSubmit={handleRegister}>
                    <div>
                        <label>Имя аккаунта</label>
                        <input
                            type="text"
                            value={registerName}
                            onChange={(e) => setRegisterName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Пароль</label>
                        <input
                            type="password"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Зарегистрироваться</button>
                    <button type="button" onClick={() => setIsRegistering(false)}>
                        Отмена
                    </button>
                </form>
            ) : (
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Пароль</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Войти</button>
                </form>
            )}

            <div className="toggle-register">
                <input
                    type="checkbox"
                    checked={isRegistering}
                    onChange={() => setIsRegistering(!isRegistering)}
                />
                <label>Нет аккаунта?</label>
            </div>
        </div>
    );
};

export default LoginForm;
