import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBlogById, addComment } from "../services/blogs";
import { useUser } from "../contexts/UserContext";
import { useNotification } from "../contexts/NotificationContext";

const BlogView = () => {
  const { id } = useParams();
  const { user } = useUser();
  const { setNotification } = useNotification();
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();

  const {
    data: blog,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogById(id),
  });

  const addCommentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["blog", id]);
      setNotification("Comment added successfully", "success");
      setComment("");
    },
    onError: (error) => {
      setNotification(`Error adding comment: ${error.message}`, "error");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      addCommentMutation.mutate({ id, comment });
      setComment("");
    }
  };

  if (isLoading) return <div>Loading blog data...</div>;
  if (isError) return <div>Error fetching blog data: {error.message}</div>;

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>Author: {blog.author}</p>
      <p>
        URL:{" "}
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
      </p>
      <p>Likes: {blog.likes}</p>
      {blog.user && <p>Added by: {blog.user.username}</p>}

      <h3>Comments</h3>
      {blog.comments && blog.comments.length > 0 ? (
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment.content}</li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}

      {user && (
        <form onSubmit={handleSubmit}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button type="submit">Add Comment</button>
        </form>
      )}

      <Link to="/">Back to Blogs</Link>
    </div>
  );
};

export default BlogView;
