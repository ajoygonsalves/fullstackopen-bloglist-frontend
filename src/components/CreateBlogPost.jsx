import { useUser } from "../contexts/UserContext";
import { createBlogPost } from "../services/blogs";
import { useState } from "react";
import { useNotification } from "../contexts/NotificationContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CreateBlogPost = () => {
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [visible, setVisible] = useState(false);
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();

  const createBlogMutation = useMutation({
    mutationFn: createBlogPost,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      showNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        "success",
      );
      setTitle("");
      setAuthor("");
      setUrl("");
      setVisible(false);
    },
    onError: (error) => {
      showNotification("Failed to create blog post", "error");
      console.error("Failed to create blog post:", error);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    createBlogMutation.mutate({ title, author, url, user });
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
