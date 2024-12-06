// src/components/CommentBox.jsx
import React from "react";

const CommentBox = ({ comment, onCommentChange, onCommentSubmit }) => (
    <div className="comment-box">
    <textarea
        value={comment}
        onChange={onCommentChange}
        placeholder="Оставьте комментарий..."
    />
        <button onClick={onCommentSubmit}>Добавить комментарий</button>
    </div>
);

export default CommentBox;
