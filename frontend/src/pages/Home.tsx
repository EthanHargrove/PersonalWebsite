// External imports
import React, { useCallback, useEffect, useState } from "react";
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

  const debounce = (func: any, wait: any) => {
    let timeout: any;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const handleResize = useCallback(
    debounce(() => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 10),
    []
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

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
      // width: dimensions.width < dimensions.height + 50 ? "100%" : "",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    to: {
      opacity: 1,
      transform: "scale(1)",
      // width: dimensions.width < dimensions.height + 50 ? "100%" : "",
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
      width: dimensions.width < dimensions.height ? "100%" : "",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    to: {
      opacity: 1,
      transform: "scale(1)",
      width: dimensions.width < dimensions.height ? "100%" : "",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    delay: dimensions.width < dimensions.height ? 550 : 300,
  });

  return (
    <>
      <div className="cyberpunk-background" style={{ marginTop: "0px" }} />
      <Navbar active="home" />
      <Stack
        direction="column"
        spacing={0}
        justifyContent="center"
        alignItems="space-evenly"
        style={{
          height: dimensions.width < dimensions.height + 50 ? "80vh" : "80vh",
        }}
        paddingTop={`${Math.min(50, dimensions.height / 10)}px`}
        paddingBottom={"20px"}
      >
        <animated.div style={titleStyle}>
          <h1
            className="heading"
            style={{
              marginTop: "20px",
              textAlign: "center",
              fontSize: `${Math.min(
                dimensions.height / 10,
                dimensions.width / 20
              )}px`,
            }}
          >
            Ethan Hargrove
          </h1>
        </animated.div>
        <Stack
          direction={
            dimensions.width > dimensions.height + 50 ? "row" : "column"
          }
          spacing={dimensions.width > dimensions.height + 50 ? 0 : 4}
          padding={0}
          alignItems="center"
          justifyContent="space-evenly"
          style={{ height: "100%", marginBottom: "0px", paddingBottom: "0px" }}
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
      </Stack>
    </>
  );
}

export default Home;
