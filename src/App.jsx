import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import CreateBlogPost from "./components/CreateBlogPost";
import { NotificationProvider } from "./contexts/NotificationContext";
import "./styles/index.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAll } from "./services/blogs";

const App = () => {
  const [user, setUser] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => getAll(user),
    enabled: !!user,
  });

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogAppUser");
    queryClient.clear();
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching blogs</div>;

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
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Blog key={blog.id} blog={blog} user={user} />
              ))}
            <CreateBlogPost user={user} />
          </div>
        )}
      </div>
    </NotificationProvider>
  );
};

export default App;
