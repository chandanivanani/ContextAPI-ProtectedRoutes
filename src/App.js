import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}
