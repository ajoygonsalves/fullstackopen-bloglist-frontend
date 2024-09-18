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

export { getAll, createBlogPost };
