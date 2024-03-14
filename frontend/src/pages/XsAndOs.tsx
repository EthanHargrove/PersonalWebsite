// External imports
import React from "react";
// Internal imports
import "../styles/main.css";
import "../styles/XsAndOs.css";
import XsAndOsGame from "../components/XsAndOs/XsAndOsGame";
import Navbar from "../components/Navbar";

function XsAndOs() {
  return (
    <>
      <div className="cyberpunk-background"></div>
      <Navbar active="" />
      <XsAndOsGame />
    </>
  );
}

export default XsAndOs;
