import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentCard from "../components/CommentCard";
import axios from "axios";
import { useUser } from "../context/UserContext"; // Импортируем useUser для доступа к данным о пользователе

const Post = () => {
    const { id } = useParams(); // Получаем id из URL
    const { user } = useUser(); // Получаем текущего пользователя из контекста
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        // Загружаем информацию о посте
        axios
            .get(`http://localhost:5245/api/posts/${id}`)
            .then((response) => setPost(response.data))
            .catch((error) => console.error("Ошибка загрузки поста:", error));

        // Загружаем комментарии к посту
        axios
            .get(`http://localhost:5245/api/comments/${id}`)
            .then((response) => {
                setComments(response.data);
                console.log("Загруженные комментарии:", response.data); // Проверим данные
            })
            .catch((error) => console.error("Ошибка загрузки комментариев:", error));
    }, [id]);

    const handleAddComment = () => {
        if (newComment.trim() === "") return;

        if (!user) {
            console.error("Пользователь не авторизован");
            return;
        }

        axios
            .post(`http://localhost:5245/api/comments/${id}`, {
                content: newComment,  // Контент комментария
                authorId: user.id     // ID автора
            })
            .then((response) => {
                setComments((prevComments) => [...prevComments, response.data]); // Добавляем новый комментарий в список
                setNewComment(""); // Очищаем поле ввода
                console.log("Комментарий добавлен:", response.data);
            })
            .catch((error) => {
                console.error("Ошибка добавления комментария:", error.response ? error.response.data : error.message);
            });
    };

    return (
        <div className="post-page">
            {post ? (
                <div>
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                    <p><strong>Автор:</strong> {post.author ? post.author.name : "Неизвестен"}</p>

                    <h2>Комментарии:</h2>
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <CommentCard
                                key={comment.id}
                                content={comment.content}
                                author={comment.author} // Теперь передаем полный объект с автором
                            />
                        ))
                    ) : (
                        <p>Комментариев еще нет.</p>
                    )}

                    <div className="add-comment">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Оставьте комментарий..."
                        />
                        <button onClick={handleAddComment}>Добавить комментарий</button>
                    </div>
                </div>
            ) : (
                <p>Загрузка поста...</p>
            )}
        </div>
    );
};

export default Post;
