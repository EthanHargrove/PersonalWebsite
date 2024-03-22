// External imports
import React, { useEffect } from "react";
// Internal imports
import "../styles/main.css";
import Navbar from "../components/Navbar";
import FeaturedProjects from "../components/home/FeaturedProject";

function Home() {
  useEffect(() => {
    document.title = "Ethan Hargrove - Home";
  }, []);

  return (
    <>
      <div className="cyberpunk-background" />
      <Navbar active="home" />
      <FeaturedProjects />
      <FeaturedProjects />
      <FeaturedProjects />
      <FeaturedProjects />
    </>
  );
}

export default Home;
