import React from "react";
import { useSpring, animated } from "react-spring";
import { Stack } from "@mui/material";

import EducationCard from "./EducationCard";

function Education() {
  const titleStyle = useSpring({
    from: {
      opacity: 0,
      transform: "scale(0.5)",
    },
    to: {
      opacity: 1,
      transform: "scale(1)",
    },
    delay: 350,
  });

  const contentStyle = useSpring({
    from: {
      opacity: 0,
      transform: "scale(0.5)",
    },
    to: {
      opacity: 1,
      transform: "scale(1)",
    },
    delay: 500,
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
      <animated.div style={contentStyle}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 1 }}
          alignItems="center"
          justifyContent="space-evenly"
        >
          <EducationCard
            imagen="./images/Bath-grad.jpeg"
            university="University of Bath"
            degree="MSc Computer Science"
            grade="Merit (75%)"
            date="10/2022-09/2023"
          />
          <EducationCard
            imagen="./images/UofT-grad.jpg"
            university="University of Toronto"
            degree="HBSc - Planetary Science Specialist, Mathematics Minor"
            grade="Distinction (79%)"
            date="09/2018-04/2022"
          />
        </Stack>
      </animated.div>
    </>
  );
}
export default Education;
