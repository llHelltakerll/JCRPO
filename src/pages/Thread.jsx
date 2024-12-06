import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import axios from "axios";
import {useUser} from "../context/UserContext";

const Thread = () => {
    const {user} = useUser();
    const { id } = useParams(); // Получаем id из URL
    const [thread, setThread] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isCreatingPost, setIsCreatingPost] = useState(false); // Для управления формой создания поста
    const [newPostTitle, setNewPostTitle] = useState("");
    const [newPostDescription, setNewPostDescription] = useState("");

    useEffect(() => {
        // Загружаем тему и связанные посты
        const fetchThreadData = async () => {
            try {
                const threadResponse = await axios.get(`http://localhost:5245/api/threads/thread/${id}`);
                setThread(threadResponse.data);

                // Загружаем только посты, относящиеся к теме
                const postsResponse = await axios.get(`http://localhost:5245/api/posts/thread/${id}/posts`);
                setPosts(postsResponse.data);
                setLoading(false);
            } catch (err) {
                setError("Ошибка загрузки данных.");
                setLoading(false);
            }
        };

        fetchThreadData();
    }, [id]);

    const handleCreatePost = async (e) => {
        e.preventDefault();

        if (!newPostTitle.trim() || !newPostDescription.trim()) {
            setError("Заполните все поля формы.");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5245/api/posts/create`, {
                Title: newPostTitle,
                Content: newPostDescription, // Убедитесь, что используете content
                ThreadId: id,
                AuthorId: user.id
            });

            setPosts((prevPosts) => [...prevPosts, response.data]);
            setNewPostTitle("");
            setNewPostDescription(""); // Сброс поля content
            setIsCreatingPost(false);
            setError("");
        } catch (err) {
            setError("Ошибка создания поста: " + (err.response?.data || err.message));
        }

    };

    if (loading) {
        return <p>Загрузка темы...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="thread-page">
            {thread ? (
                <div>
                    <h1>{thread.title}</h1>
                    <p>{thread.description}</p>

                    {/* Кнопка и форма для создания нового поста */}
                    <button onClick={() => setIsCreatingPost(!isCreatingPost)}>
                        {isCreatingPost ? "Отменить" : "Создать новый пост"}
                    </button>

                    {isCreatingPost && (
                        <form onSubmit={handleCreatePost}>
                            <div>
                                <label>Заголовок поста</label>
                                <input
                                    type="text"
                                    value={newPostTitle}
                                    onChange={(e) => setNewPostTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label>Описание поста</label>
                                <textarea
                                    value={newPostDescription}
                                    onChange={(e) => setNewPostDescription(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit">Добавить пост</button>
                        </form>
                    )}

                    <h2>Посты в теме:</h2>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <PostCard
                                key={post.id}
                                id={post.id}
                                title={post.title}
                                content={post.content}
                                author={post.author}
                            />
                        ))
                    ) : (
                        <p>Нет постов в этой теме</p>
                    )}
                </div>
            ) : (
                <p>Тема не найдена</p>
            )}
        </div>
    );
};

export default Thread;
