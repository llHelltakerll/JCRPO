// src/components/PostCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ id, title, content, author }) => (
    <div className="post-card">
        <h3>{title}</h3>
        <p>{content}</p>
        <p><strong>Автор:</strong> {author.name}</p>
        <Link to={`/post/${id}`}>Читать подробнее</Link>
    </div>
);

export default PostCard;
