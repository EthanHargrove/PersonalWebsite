import React, { ReactNode } from "react";
import { Stack } from "@mui/material";

import WorkCard from "./WorkCard";

function WorkExperience() {
  return (
    <>
      <h2 className="heading cv-heading">Work Experience</h2>
      <Stack
        direction={{ sm: "column", md: "row" }}
        spacing={{ xs: 4, md: 1 }}
        alignItems="center"
        justifyContent="space-evenly"
      >
        <WorkCard
          imagen="./images/University-of-Exeter.jpeg"
          jobTitle="Data Scientist"
          employer="University of Exeter"
          date="09/2023-Present"
        />
      </Stack>
    </>
  );
}
export default WorkExperience;
