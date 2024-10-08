import { useUser } from "../contexts/UserContext";
import { useState } from "react";
import { updateLikes, deleteBlog } from "../services/blogs";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "../contexts/NotificationContext";

const Blog = ({ blog }) => {
  const { user } = useUser();
  const [visible, setVisible] = useState(false);
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  const updateLikesMutation = useMutation({
    mutationFn: updateLikes,
    onSuccess: (updatedBlog) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      showNotification(`Blog '${updatedBlog.title}' liked!`, "success");
    },
    onError: (error) => {
      console.error("Error updating likes:", error);
      showNotification("Failed to update likes", "error");
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      showNotification(`Blog '${blog.title}' deleted successfully`, "success");
    },
    onError: (error) => {
      console.error("Error deleting blog:", error);
      showNotification("Failed to delete blog", "error");
    },
  });

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    updateLikesMutation.mutate({ blog: updatedBlog, user });
  };

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlogMutation.mutate({ id: blog.id, user });
    }
  };

  const toggleButtonStyle = {
    display: "flex",
    justifyContent: "flex-start",
  };

  return (
    <div>
      <div style={toggleButtonStyle}>
        <span className="blog-title">{blog.title} - </span>
        <span className="blog-author">{blog.author}</span>
        <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      </div>

      {visible && (
        <div className="blog-details">
          <p className="blog-url">{blog.url}</p>
          <p className="blog-likes">
            likes: {blog.likes}
            <button onClick={handleLike}>like</button>
          </p>
          <p>author: {blog.author}</p>
          {blog.user.username === user.username && (
            <button onClick={handleRemove}>remove</button>
          )}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
