import React, { useEffect, useState } from "react";

const Home = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(loggedInUser);
  }, []);

  return (
    <div>
      <h2>Home page</h2>

      <div>
        <h3>
          Welcome, {user?.name} {user?.lname}!
        </h3>
        <p>Email: {user?.email}</p>
        <p>Role: {user?.role}</p>
      </div>
    </div>
  );
};

export default Home;
