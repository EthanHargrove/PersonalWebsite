// External imports
import React, { useEffect } from "react";
// Internal imports
import "../styles/main.css";
import Navbar from "../components/Navbar";
import FeaturedProjects from "../components/home/FeaturedProject";

function Home() {
  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);

    // Change document title
    document.title = "Ethan Hargrove - Home";
  }, []);

  return (
    <>
      <div className="cyberpunk-background" style={{ marginTop: "-65px" }} />
      <Navbar active="home" />
      <h1
        className="heading"
        style={{ marginTop: "60px", textAlign: "center" }}
      >
        Ethan Hargrove
      </h1>
    </>
  );
}

export default Home;
