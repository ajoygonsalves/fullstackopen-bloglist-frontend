import { UserProvider, useUser } from "./contexts/UserContext";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Blog from "./components/Blog";
import Login from "./components/Login";
import CreateBlogPost from "./components/CreateBlogPost";
import UserList from "./components/UserList";
import UserView from "./components/UserView"; // Add this import
import { NotificationProvider } from "./contexts/NotificationContext";
import "./styles/index.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAll } from "./services/blogs";
import BlogView from "./components/BlogView";

const BlogList = ({ blogs }) => (
  <div>
    {blogs
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <div key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author}
        </div>
      ))}
    <CreateBlogPost />
  </div>
);

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
    <Router>
      <div>
        {user === null ? (
          <Login />
        ) : (
          <div>
            <nav>
              <Link to="/">blogs</Link>
              <Link to="/users">users</Link>
              <span>{user.username} logged in</span>
              <button onClick={handleLogout}>logout</button>
            </nav>

            <Routes>
              <Route path="/users/:id" element={<UserView />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/blogs/:id" element={<BlogView />} />
              <Route path="/" element={<BlogList blogs={blogs} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
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
