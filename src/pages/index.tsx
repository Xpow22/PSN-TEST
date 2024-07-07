import React, { useState, useEffect } from 'react';
import { fetchComments, deleteComment, createComment } from '@/service/comment';
import { Comment } from '@/types/comment';
import Card from '@/components/Card';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import Modal from '@/components/Modal';
import { Button } from 'primereact/button';
import withAuth from '@/utils/withAuth';
import { Toaster, toast } from 'react-hot-toast';
import { InputText } from 'primereact/inputtext';
import Navbar from '@/components/Navbar';

const Index = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchComments();
        setComments(data);
        setFilteredComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const filteredData = comments.filter(
      (comment) =>
        comment.name.toLowerCase().includes(lowerCaseQuery) ||
        comment.email.toLowerCase().includes(lowerCaseQuery) ||
        comment.body.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredComments(filteredData);
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      const updatedComments = comments.filter((comment) => comment.id !== commentId);
      setComments(updatedComments);
      setFilteredComments(updatedComments.filter(
        (comment) =>
          comment.name.toLowerCase().includes(searchTerm) ||
          comment.email.toLowerCase().includes(searchTerm) ||
          comment.body.toLowerCase().includes(searchTerm)
      ));
      toast.success('Comment deleted successfully');
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error('Failed to delete comment');
    }
  };

  const confirmDelete = (commentId: number) => {
    confirmDialog({
      message: 'Are you sure you want to delete this comment?',
      header: 'Confirmation',
      acceptClassName: 'p-button p-button-danger mt-4 mx-2', 
      acceptLabel: 'Yes',
      rejectClassName: 'p-button p-button-text mt-4 mx-2', 
      rejectLabel: 'No', 
      contentClassName: 'text-center',
      accept: () => handleDeleteComment(commentId),
      reject: () => {
        toast('You have rejected', {
          icon: '⚠️',
        });
      }
    });
  };

  const handleCreateComment = async (values: { name: string; email: string; body: string }) => {
    const newComment = {
      postId: 1,
      id: 0,
      name: values.name,
      email: values.email,
      body: values.body
    };
    try {
      const createdComment = await createComment(newComment);
      setComments([createdComment, ...comments]);
      setFilteredComments([createdComment, ...comments].filter(
        (comment) =>
          comment.name.toLowerCase().includes(searchTerm) ||
          comment.email.toLowerCase().includes(searchTerm) ||
          comment.body.toLowerCase().includes(searchTerm)
      ));
      setIsModalOpen(false);
      toast.success('Comment created successfully');
    } catch (error) {
      console.error('Error creating comment:', error);
      toast.error('Failed to create comment');
    }
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto p-8">
        <Toaster />
        <h1 className="text-3xl font-semibold mb-8">Comments</h1>
        <div className="flex justify-between items-center mb-4">
        <Button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded focus:outline-none"
            onClick={() => setIsModalOpen(true)}
          >
            Create Comment
          </Button>
          <form onSubmit={(e) => { e.preventDefault(); handleSearch(searchTerm); }} className="flex">
            <InputText
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Name, Email, or Body"
              className="px-4 py-2 border rounded-l-md focus:outline-none"
            />
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r-md focus:outline-none"
            >
              Search
            </Button>
          </form>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComments.map((comment) => (
            <Card key={comment.id} comment={comment} onDelete={() => confirmDelete(comment.id)} />
          ))}
        </div>
        <ConfirmDialog
          style={{
            width: '50vw', 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
            padding: '20px', 
            fontSize: '16px', 
          }}
          breakpoints={{
            '1100px': '75vw',
            '960px': '100vw', 
          }}
        />
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleCreateComment} />
      </div>
    </>
  );
};

export default withAuth(Index);
