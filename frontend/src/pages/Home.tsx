// External imports
import React, { useEffect } from "react";
// Internal imports
import "../styles/main.css";
import Navbar from "../components/Navbar";

function Home() {
  useEffect(() => {
    document.title = "Ethan Hargrove - Home";
  }, []);

  return (
    <>
      <div className="cyberpunk-background"></div>
      <Navbar active="home" />
    </>
  );
}

export default Home;
