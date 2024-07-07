import { Comment } from "@/types/comment";

const COMMENTS_API = 'https://jsonplaceholder.typicode.com/comments';

export const fetchComments = async (): Promise<Comment[]> => {
  try {
    const response = await fetch(COMMENTS_API);
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};


export const createComment = async (commentData: Comment): Promise<Comment> => {
  try {
    const response = await fetch(COMMENTS_API, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to create comment');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

export const deleteComment = async (commentId: number): Promise<void> => {
  try {
    const response = await fetch(`${COMMENTS_API}/${commentId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete comment');
    }
  } catch (error) {
    console.error(`Error deleting comment ${commentId}:`, error);
    throw error;
  }
};
