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

export { getAll };
