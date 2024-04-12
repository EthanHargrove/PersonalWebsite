import React from "react";
import { useSpring, animated } from "react-spring";
import { Stack } from "@mui/material";

import WorkCard from "./WorkCard";

function WorkExperience() {
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

  const contentStyle = useSpring({
    from: {
      opacity: 0,
      transform: "scale(0.5)",
    },
    to: {
      opacity: 1,
      transform: "scale(1)",
    },
    delay: 200,
  });

  return (
    <div style={{ marginTop: "65px" }}>
      <animated.div style={titleStyle}>
        <h2 className="heading cv-heading" style={{ marginBottom: "15px" }}>
          Work Experience
        </h2>
      </animated.div>
      <animated.div style={contentStyle}>
        <Stack
          direction={{ sm: "column", md: "row" }}
          spacing={{ xs: 4, md: 1 }}
          alignItems="center"
          justifyContent="space-evenly"
        >
          <WorkCard
            imagen="./images/digiLab.jpeg"
            jobTitle="Research and Development Graduate"
            employer="digiLab"
            date="03/2024-PRESENT"
          />
          <WorkCard
            imagen="./images/University-of-Exeter.jpeg"
            jobTitle="Data Scientist"
            employer="University of Exeter"
            date="09/2023-03/2024"
          />
        </Stack>
      </animated.div>
    </div>
  );
}
export default WorkExperience;
