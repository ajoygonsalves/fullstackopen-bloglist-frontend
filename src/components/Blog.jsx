import { useState } from "react";

const Blog = ({ blog }) => {
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
          <p>likes: {blog.likes}</p>
          <p>author: {blog.author}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
