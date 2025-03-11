import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.css";

const validationSchema = Yup.object().shape({
  role: Yup.string().oneOf(["User", "Admin"], "Invalid role").required(),
  name: Yup.string().required("First name is required"),
  lname: Yup.string().required("Last name is required"),
  email: Yup.string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    ),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),

  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
  role: Yup.string().oneOf(["User", "Admin"], "Invalid role").required(),
  adminKey: Yup.string().when("role", {
    is: "Admin",
    then: (schema) => schema.required("Admin Secret Key is required"),
  }),
});

const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const role = watch("role", "User");

  const handleSignUp = (data) => {
    if (data.role === "Admin" && data.adminKey !== "S123") {
      alert("Invalid Admin Secret Key!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({
      ...data,
      adminKey: data.role === "Admin" ? data.adminKey : null,
    });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Sign up successful. Please login.");
    navigate("/login");
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <div className="radio-group">
          <label>
            <input type="radio" value="User" {...register("role")} />
            User
          </label>

          <label>
            <input type="radio" value="Admin" {...register("role")} />
            Admin
          </label>
          {errors.role && <p style={{ color: "red" }}>{errors.role.message}</p>}
        </div>

        <input
          type="text"
          placeholder="Enter your first name"
          {...register("name")}
        />
        {errors.name && <p style={{ color: "red" }}> {errors.name.message}</p>}

        <input
          type="text"
          placeholder="Enter your last name"
          {...register("lname")}
        />
        {errors.lname && (
          <p style={{ color: "red" }}> {errors.lname.message} </p>
        )}

        <input type="email" placeholder="Email" {...register("email")} />
        {errors.email && (
          <p style={{ color: "red" }}> {errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <p style={{ color: "red" }}> {errors.password.message}</p>
        )}

        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p style={{ color: "red" }}> {errors.confirmPassword.message}</p>
        )}

        {role === "Admin" && (
          <>
            <input
              type="password"
              placeholder="Enter Admin Secret Key"
              {...register("adminKey")}
            />
            {errors.adminKey && (
              <p style={{ color: "red" }}> {errors.adminKey.message}</p>
            )}
          </>
        )}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
