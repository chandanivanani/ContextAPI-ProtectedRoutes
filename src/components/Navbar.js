import React from "react";
import { Link,useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const{isLoggedIn,logout,userType} = useAuth();

  const handleLogout = () => {
    logout()
    navigate('/login');
  }
  
  return (
    <>
      <nav className="navbar">
        
          {!isLoggedIn && (
            <>
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-link">
                  Register
                </Link>
              </li>
              </ul>
            </>
          )}

          {isLoggedIn && userType === "Admin" ? (
            <>
              <ul className="nav-list">
              <li className="nav-item">
                <Link className="nav-link" to="/admin-dashboard">Admin Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">UserLists</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/user-Details">userDetails</Link>
              </li>
              </ul>
              
            </>
          ) : (
            isLoggedIn && (
              <>
                <ul className="nav-list">
                <li className="nav-item">
                  <Link to="/home">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/about">About</Link>
                </li>
                <li className="nav-item">
                  <Link to="/user-dashboard">UserDashboard</Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact">Contact</Link>
                </li>
                <li className="nav-item">
                  <Link to="/users">UserLists</Link>
                </li>
                </ul>
              </>
            )
          )}

          {isLoggedIn && (userType === "Admin" || userType === "User") && (
            <div className="navbarActions">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}

      </nav>
    </>
  );
};

export default Navbar;
