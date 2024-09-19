import { useState } from "react";
import { updateLikes } from "../services/blogs";

const Blog = ({ blog, user, fetchBlogs }) => {
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
        </div>
      )}
    </div>
  );
};

export default Blog;
