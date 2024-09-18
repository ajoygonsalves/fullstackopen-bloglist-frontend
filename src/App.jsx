import { useState } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import { useEffect } from "react";
import { getAll } from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchBlogs = async () => {
        try {
          const blogs = await getAll(user);
          setBlogs(blogs);
        } catch (error) {
          console.error("Error fetching blogs:", error);
        }
      };
      fetchBlogs();
    }
  }, [user]);

  return (
    <div>
      {user === null ? (
        <Login setUser={setUser} />
      ) : (
        <div>
          <h2>blogs</h2>
          <div>
            <p>{user.username} is logged in</p>
            <button onClick={() => setUser(null)}>logout</button>
          </div>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
