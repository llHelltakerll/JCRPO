import React from 'react';

const CommentCard = ({ content, author }) => {
    // Проверяем, если автор — это объект, извлекаем имя, иначе используем значение как строку
    const authorName = typeof author === 'object' && author !== null
        ? author.name || "Неизвестен" // Если объект и есть имя
        : author || "Неизвестен";     // Если строка или null/undefined

    return (
        <div className="comment-card">
            <p><strong>Автор:</strong> {authorName}</p>
            <p>{content}</p>
        </div>
    );
};

export default CommentCard;