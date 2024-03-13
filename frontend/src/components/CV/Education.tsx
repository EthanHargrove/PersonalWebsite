import React, { ReactNode } from "react";
import { Stack } from "@mui/material";

import EducationCard from "./EducationCard";

function Education() {
  return (
    <div>
      <h2>Education</h2>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        alignContent="center"
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
    </div>
  );
}
export default Education;
