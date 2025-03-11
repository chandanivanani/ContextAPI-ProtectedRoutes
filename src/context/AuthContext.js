import { createContext,useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("loggedIn"));
    const [userType, setUserType] = useState(() => localStorage.getItem("userRole"));

    useEffect(() => {
        const updateAuthState = () => {
            setIsLoggedIn(localStorage.getItem("loggedIn"));
            setUserType(localStorage.getItem("userRole"));
        }

        window.addEventListener("storage",updateAuthState);
    },[]);

    const login = (role) => {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("userRole", role);
        setIsLoggedIn("true");
        setUserType(role);
    };

    const logout = () => {
        // const navigate = useNavigate();
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("userRole");
        setIsLoggedIn(null);
        setUserType(null);
        // navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userType, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};