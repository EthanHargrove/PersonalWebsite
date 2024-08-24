// External imports
import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import { Stack } from "@mui/material";

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

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
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

  const animationStyle1 = useSpring({
    from: {
      opacity: 0,
      transform: "scale(0.5)",
      width: dimensions.width < 900 ? "100%" : "",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    to: {
      opacity: 1,
      transform: "scale(1)",
      width: dimensions.width < 900 ? "100%" : "",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    delay: 300,
  });

  const animationStyle2 = useSpring({
    from: {
      opacity: 0,
      transform: "scale(0.5)",
      width: dimensions.width < 900 ? "100%" : "",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    to: {
      opacity: 1,
      transform: "scale(1)",
      width: dimensions.width < 900 ? "100%" : "",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    delay: dimensions.width < 900 ? 550 : 300,
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
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 4, md: 1 }}
        padding={2}
        alignItems="center"
        justifyContent="space-evenly"
      >
        <animated.div style={animationStyle1}>
          <FeaturedProject
            title="About Me"
            imagen="./images/tic-tac-toe.png"
            subtitle="Machine Learning Professional"
            blurb="Passionately creating AI solutions to optimize complex decision-making"
            leftButtonText="CV"
            leftButtonLink="/CV"
            rightButtonText="View All Projects"
            rightButtonLink="/projects"
          />
        </animated.div>
        <animated.div style={animationStyle2}>
          <FeaturedProject
            title="Featured Project"
            imagen="./images/tic-tac-toe.png"
            subtitle="An introduction to reinforcement learning"
            blurb="Teaching an agent to play Xs and Os using Q-learning"
            leftButtonText="View Project"
            leftButtonLink="/Xs-and-Os"
            rightButtonText="View All Projects"
            rightButtonLink="/projects"
          />
        </animated.div>
      </Stack>
    </>
  );
}

export default Home;
