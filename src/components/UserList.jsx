import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/users";
import { Link } from "react-router-dom";

const UserList = () => {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  if (isLoading) return <div>Loading users...</div>;
  if (isError) return <div>Error fetching users</div>;

  // Check if users is an array and not empty
  if (!Array.isArray(users) || users.length === 0) {
    return <div>No users found</div>;
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs ? user.blogs.length : 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
