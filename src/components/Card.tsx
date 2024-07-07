import React from 'react';
import { Comment } from '@/types/comment';

interface CardProps {
  comment: Comment;
  onDelete: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ comment, onDelete }) => {
  const { id, name, email, body } = comment;

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="flex flex-col p-4 m-4 rounded-lg shadow-2xl bg-gradient-to-r from-purple-400 to-indigo-500">
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-gray-600">{email}</p>
      <p className="mt-2 flex-grow">{body}</p>
      <button
        className="mt-auto bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default Card;
