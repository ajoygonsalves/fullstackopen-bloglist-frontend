import axios from "axios";
const baseUrl = "http://localhost:3111/api/blogs";

const getAll = async (user) => {
  try {
    const request = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return request.data;
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

export { getAll, createBlogPost, updateLikes, deleteBlog };
