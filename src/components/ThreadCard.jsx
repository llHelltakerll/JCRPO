// src/components/ThreadCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const ThreadCard = ({ id, title, description, postCount }) => (
    <div className="thread-card">
        <h2>{title}</h2>
        <p>{description}</p>
        <p>{postCount} постов</p>
        <Link to={`/thread/${id}`}>Перейти к теме</Link>
    </div>
);

export default ThreadCard;
