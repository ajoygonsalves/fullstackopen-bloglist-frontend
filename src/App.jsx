import { UserProvider, useUser } from "./contexts/UserContext";
import { useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import CreateBlogPost from "./components/CreateBlogPost";
import { NotificationProvider } from "./contexts/NotificationContext";
import "./styles/index.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAll } from "./services/blogs";

const AppContent = () => {
  const { user, dispatch } = useUser();
  const queryClient = useQueryClient();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch({ type: "LOGIN", payload: user });
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("loggedBlogAppUser");
    queryClient.clear();
  };

  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: getAll,
    enabled: !!user,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching blogs</div>;

  return (
    <div>
      {user === null ? (
        <Login />
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
              <Blog key={blog.id} blog={blog} />
            ))}
          <CreateBlogPost />
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <UserProvider>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </UserProvider>
  );
};

export default App;
