import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserLists.css";
import Navbar from "../components/Navbar";

const UserLists = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users?.filter(
    (user) =>
      user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user?.company?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <Navbar />
      <div className="searchContainer">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => {
            // console.log(e);
            setSearchQuery(e.target.value);
          }}
          className="searchInput"
        />
      </div>

      <div className="container">
        <div className="Grid">
          {searchQuery === ""
            ? users.map((user) => (
                <div
                  key={user.id}
                  className="card"
                  onClick={() => navigate(`/user/${user.id}`)}
                >
                  <h3>{user.name}</h3>
                  <p>Email: {user.email}</p>
                  <p>Company: {user.company.name}</p>
                </div>
              ))
            : filteredUsers.length > 0 
            ? filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="card"
                  onClick={() => navigate(`/user/${user.id}`)}
                >
                  <h3>{user.name}</h3>
                  <p>Email: {user.email}</p>
                  <p>Company: {user.company.name}</p>
                </div>
              )) : <p className="noResults">No Results found</p>}
        </div>
      </div>
    </>
  );
};

export default UserLists;
