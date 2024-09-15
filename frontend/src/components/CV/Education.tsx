import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import { Stack } from "@mui/material";

import EducationCard from "./EducationCard";

function Education() {
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
    delay: dimensions.width < dimensions.height ? 550 : 375,
  });

  const bathStyle = useSpring({
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
    delay: dimensions.width < dimensions.height ? 700 : 500,
  });

  const uoftStyle = useSpring({
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
    delay: dimensions.width < dimensions.height ? 850 : 500,
  });

  return (
    <>
      <animated.div style={titleStyle}>
        <h2
          className="heading cv-heading"
          style={{ marginTop: "30px", marginBottom: "15px" }}
        >
          Education
        </h2>
      </animated.div>
      <Stack
        direction={dimensions.width > dimensions.height ? "row" : "column"}
        spacing={dimensions.width > dimensions.height ? 1 : 4}
        alignItems="center"
        justifyContent="space-evenly"
      >
        <animated.div style={bathStyle}>
          <EducationCard
            imagen="./images/Bath-grad.jpeg"
            university="University of Bath"
            degree="MSc Computer Science"
            grade="Merit (75%)"
            date="10/2022-09/2023"
          />
        </animated.div>
        <animated.div style={uoftStyle}>
          <EducationCard
            imagen="./images/UofT-grad.jpg"
            university="University of Toronto"
            degree="HBSc - Planetary Science Specialist, Mathematics Minor"
            grade="Distinction (79%)"
            date="09/2018-04/2022"
          />
        </animated.div>
      </Stack>
    </>
  );
}
export default Education;
