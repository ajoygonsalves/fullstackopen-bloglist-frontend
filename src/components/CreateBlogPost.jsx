import { createBlogPost } from "../services/blogs";
import { useState } from "react";

// Create a component for creating a new blog post

const CreateBlogPost = ({ user, fetchBlogs }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createBlogPost({ title, author, url, user });
      setTitle("");
      setAuthor("");
      setUrl("");
      fetchBlogs();
    } catch (error) {
      console.error("Failed to create blog post:", error);
    }
  };

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
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateBlogPost;
