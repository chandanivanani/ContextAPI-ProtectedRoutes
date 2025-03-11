import React, { useState, useEffect } from "react";

const UserDetails = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const handleDelete = (email) => {
    const updatedUsers = users.filter((user) => user.email !== email);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    alert("User deleted successfully!");
  };

  return (
    <div>
      <h2>Registered Users</h2>
      {users.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>firstName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.lname}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    onClick={() => handleDelete(user.email)}
                    disabled={user.role === "Admin"}
                    style={{
                      backgroundColor: user.role === "Admin" ? "gray" : "red",
                      cursor: user.role === "Admin" ? "not-allowed" : "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};
export default UserDetails;
