import axios from "axios";

const baseUrlSignUp = "http://localhost:3111/api/users";
const baseUrlLogin = "http://localhost:3111/api/login";

// Add this new function
const getAllUsers = async () => {
  try {
    const users = await axios.get(baseUrlSignUp);

    return users.data.allUsers;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

const createUser = async (user) => {
  try {
    const request = axios.post(baseUrlSignUp, user);
    const response = await request;
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (user) => {
  try {
    const request = axios.post(baseUrlLogin, user);
    const response = await request;
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (id) => {
  try {
    const response = await axios.get(`${baseUrlSignUp}/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    if (error.response && error.response.status === 404) {
      return { username: "Unknown User", blogs: [] };
    }
    throw error;
  }
};

export { createUser, loginUser, getAllUsers, getUserById };
