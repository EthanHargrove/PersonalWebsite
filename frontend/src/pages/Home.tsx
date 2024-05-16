// External imports
import React, { useEffect } from "react";
import { useSpring, animated } from "react-spring";

// Internal imports
import "../styles/main.css";
import Navbar from "../components/Navbar";
import FeaturedProject from "../components/home/FeaturedProject";

function Home() {
  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);

    // Change document title
    document.title = "Ethan Hargrove - Home";
  }, []);

  const titleStyle = useSpring({
    from: {
      opacity: 0,
      transform: "scale(0.5)",
    },
    to: {
      opacity: 1,
      transform: "scale(1)",
    },
    delay: 50,
  });

  return (
    <>
      <div className="cyberpunk-background" style={{ marginTop: "-60px" }} />
      <Navbar active="home" />
      <animated.div style={titleStyle}>
        <h1
          className="heading"
          style={{ marginTop: "60px", textAlign: "center" }}
        >
          Ethan Hargrove
        </h1>
      </animated.div>
      <FeaturedProject imagen="./images/tic-tac-toe.png" link="/Xs-and-Os" />
    </>
  );
}

export default Home;
