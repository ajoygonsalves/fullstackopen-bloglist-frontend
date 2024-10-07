import React, { useState } from "react";
import { loginUser } from "../services/users";
import { useNotification } from "../contexts/NotificationContext";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { showNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser({ username, password });
      if (user && user.token) {
        window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
        setUser(user);
        showNotification(`${user.username} logged in`, "success");
        setUsername("");
        setPassword("");
      } else {
        showNotification("Invalid username or password", "error");
      }
    } catch (error) {
      console.error("Login failed:", error);
      showNotification("Invalid username or password", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
