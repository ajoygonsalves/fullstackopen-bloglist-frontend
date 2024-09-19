import { useState } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import { useEffect } from "react";
import { getAll } from "./services/blogs";
import CreateBlogPost from "./components/CreateBlogPost";
import { NotificationProvider } from "./contexts/NotificationContext";
import "./styles/index.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const fetchBlogs = async () => {
    try {
      const blogs = await getAll(user);
      setBlogs(blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBlogs();
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogAppUser");
  };

  return (
    <NotificationProvider>
      <div>
        {user === null ? (
          <Login setUser={setUser} />
        ) : (
          <div>
            <h2>blogs</h2>
            <div>
              <p>{user.username} is logged in</p>
              <button onClick={handleLogout}>logout</button>
            </div>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                fetchBlogs={fetchBlogs}
              />
            ))}
            <CreateBlogPost user={user} fetchBlogs={fetchBlogs} />
            <button onClick={() => console.log(user)}>Display User</button>
          </div>
        )}
      </div>
    </NotificationProvider>
  );
};

export default App;
