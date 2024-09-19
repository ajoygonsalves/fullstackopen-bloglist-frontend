import { useState } from "react";
import { updateLikes, deleteBlog } from "../services/blogs";

const Blog = ({ blog, user, fetchBlogs }) => {
  console.log(blog);
  // Add inline styling to the blog post
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = async () => {
    try {
      const updatedBlog = {
        id: blog.id,
        likes: blog.likes + 1,
      };
      await updateLikes(updatedBlog, user);
      await fetchBlogs();
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleRemove = async () => {
    try {
      window.confirm(`Remove blog ${blog.title} by ${blog.author}?`);
      await deleteBlog(blog.id, user);
      await fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  // make sure the toggle button is on the right side of the blog post
  const toggleButtonStyle = {
    display: "flex",
    justifyContent: "flex-start",
  };

  return (
    <div style={blogStyle}>
      <div style={toggleButtonStyle}>
        {blog.title}
        <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      </div>

      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>
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

export default Blog;
