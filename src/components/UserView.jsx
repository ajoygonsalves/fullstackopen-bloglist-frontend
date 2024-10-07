import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../services/users";

const UserView = () => {
  const { id } = useParams();
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
  });

  if (isLoading) return <div>Loading user data...</div>;
  if (isError) return <div>Error fetching user data: {error.message}</div>;

  return (
    <div>
      <h2>{user.username}</h2>
      <h3>Added blogs</h3>
      {!user.blogs || user.blogs.length === 0 ? (
        <p>No blogs added yet.</p>
      ) : (
        <ul key={user.id}>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      )}
      <Link to="/users">Back to Users</Link>
    </div>
  );
};

export default UserView;
