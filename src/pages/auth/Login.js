import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "./Login.css";

const validationSchema = Yup.object().shape({
  role: Yup.string().oneOf(["User", "Admin"], "Invalid role").required(),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  email: Yup.string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    ),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleLogin = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) =>
        u.email === data.email &&
        u.password === data.password &&
        u.role === data.role
    );

    if (user) {
      login(data.role);
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      navigate("/home");
    } else {
      alert("Invalid Credentials or Role! Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="User"
              {...register("role")}
              // defaultChecked
            />
            User
          </label>

          <label>
            <input type="radio" value="Admin" {...register("role")} />
            Admin
          </label>
          {errors.role && <p style={{ color: "red" }}>{errors.role.message}</p>}
        </div>

        <input
          type="email"
          placeholder="Enter your Email"
          {...register("email")}
        />
        {errors.email && (
          <p style={{ color: "red" }}> {errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="Enter your Password"
          {...register("password")}
        />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}

        <button type="submit">Login</button>
      </form>

      {/* Redirect to Signup Page */}
      <p>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
};

export default Login;
