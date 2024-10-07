import axios from "axios";
const baseUrl = "http://localhost:3111/api/blogs";

const getAll = async () => {
  try {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      const request = await axios.get(baseUrl, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return request.data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

const createBlogPost = async ({ title, author, url, user }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };
    const blogData = { title, author, url };
    const response = await axios.post(baseUrl, blogData, config);
    return response.data;
  } catch (error) {
    console.error("Error creating blog post:", error);
    throw error;
  }
};

const updateLikes = async ({ blog, user }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config);
    return response.data;
  } catch (error) {
    console.error("Error updating likes:", error);
    throw error;
  }
};

const deleteBlog = async ({ id, user }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response.data;
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};

const getBlogById = async (id) => {
  try {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      const response = await axios.get(`${baseUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error;
  }
};

const addComment = async ({ id, comment }) => {
  try {
    console.log("id", id);
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.post(
        `${baseUrl}/${id}/comments`,
        { content: comment },
        config,
      );
      console.log("response", response);
      return response.data;
    }
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

export {
  getAll,
  createBlogPost,
  updateLikes,
  deleteBlog,
  getBlogById,
  addComment,
};
