import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/homePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Logistics Management</h2>
      <button
        className="homePageButtons"
        onClick={() => {
          navigate("/signup");
        }}
      >
        Sign up
      </button>
      <button
        className="homePageButtons"
        onClick={() => {
          navigate("login");
        }}
      >
        Log in
      </button>
    </div>
  );
};

export default HomePage;
