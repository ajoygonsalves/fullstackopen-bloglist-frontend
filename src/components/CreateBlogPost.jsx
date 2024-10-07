import { createBlogPost } from "../services/blogs";
import { useState } from "react";
import { useNotification } from "../contexts/NotificationContext";
// Create a component for creating a new blog post

const CreateBlogPost = ({ user, fetchBlogs }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [visible, setVisible] = useState(false);
  const { showNotification } = useNotification();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createBlogPost({ title, author, url, user });
      setTitle("");
      setAuthor("");
      setUrl("");
      fetchBlogs();
      showNotification(
        `a new blog ${title} by ${author} with URL ${url} added`,
      );
    } catch (error) {
      console.error("Failed to create blog post:", error);
    }
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  if (!visible) {
    return (
      <div>
        <button onClick={toggleVisibility}>Create new blog post</button>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2>Create a new blog post</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input
            type="text"
            id="url"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
        <button type="button" onClick={toggleVisibility}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPost;
