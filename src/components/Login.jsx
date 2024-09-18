import React, { useState } from "react";
import { loginUser } from "../services/users";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser({ username, password });
      if (user && user.token) {
        window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
        setUser(user);
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error (e.g., show error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
