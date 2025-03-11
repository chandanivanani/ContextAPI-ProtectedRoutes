import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import UserDashboard from "../pages/UserDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import About from "../pages/About";
import Contact from "../pages/Contact";
import ProtectedRoute from "./ProtectedRoute";
import UserLists from "../pages/UserLists";
import UserDetails from "../components/UserDetails";
import Home from "../pages/Home";
import UserPosts from "../pages/UserPosts";
import { useAuth } from "../context/AuthContext";

export default function AppRoutes() {
    const {isLoggedIn, userType} = useAuth();

    const routes = [
        !isLoggedIn 
        ? { path : "/login",element: <Login /> } 
        : { path: "/login", element: <Navigate to="/" /> },
        !isLoggedIn
        ? { path: "/signup" , element: <SignUp /> }
        : { path: "/signup", element: <Navigate to="/" /> },
        !isLoggedIn ? { path: "/" , element: <Login/> } : null,

        {
            path: "/",
            element: <ProtectedRoute />,
            children : [
                userType === "User"
                ? { path: "/contact" , element: <Contact/>}
                : { path: "/", element: <Navigate to="/admin-dashboard"/> },

                userType === "User" 
                ? { path: "/home" , element: <Home /> }
                : { path: "/admin-dashboard" , element: <AdminDashboard />},

                userType === "User"
                ? {path: "/user-dashboard", element: <UserDashboard /> }
                : null,

                userType === "User"
                ? { path: "/users", element: <UserLists /> }
                : { path: "/users", element: <UserLists /> },
 
                userType === "User"
                ? { path: "/user/:id", element: <UserPosts /> }
                : { path: "/user-details", element: <UserDetails /> },

                userType === "User"
                ? { path: "/" , element: <Navigate to="/home" /> }
                : {path: "/" , element: <Navigate to="/admin-dashboard" /> },
            ].filter(Boolean),
        },

        { path: "/about", element: <About/> },

        {path: "*", element: <Navigate to="/" /> },
    ].filter(Boolean);

    return useRoutes(routes);
}