import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import { Stack } from "@mui/material";

import WorkCard from "./WorkCard";

function WorkExperience() {
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

  const digiLabStyle = useSpring({
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
    delay: 200,
  });

  const exeterStyle = useSpring({
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
    delay: dimensions.width < 900 ? 400 : 200,
  });

  return (
    <div style={{ marginTop: "65px" }}>
      <animated.div style={titleStyle}>
        <h2 className="heading cv-heading" style={{ marginBottom: "15px" }}>
          Work Experience
        </h2>
      </animated.div>
      <Stack
        direction={{ sm: "column", md: "row" }}
        spacing={{ xs: 4, md: 1 }}
        alignItems="center"
        justifyContent="space-evenly"
      >
        <animated.div style={digiLabStyle}>
          <WorkCard
            imagen="./images/digiLab.jpeg"
            jobTitle="Research and Development Graduate"
            employer="digiLab"
            date="03/2024-PRESENT"
          />
        </animated.div>
        <animated.div style={exeterStyle}>
          <WorkCard
            imagen="./images/University-of-Exeter.jpeg"
            jobTitle="Data Scientist"
            employer="University of Exeter"
            date="09/2023-03/2024"
          />
        </animated.div>
      </Stack>
    </div>
  );
}
export default WorkExperience;
