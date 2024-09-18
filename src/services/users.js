import axios from "axios";

const baseUrlSignUp = "http://localhost:3111/api/users";
const baseUrlLogin = "http://localhost:3111/api/login";
// const getAllUsers = async () => {
//   const request = axios.get(baseUrl);
//   const response = await request;
//   return response.data;
// };

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

export { createUser, loginUser };
