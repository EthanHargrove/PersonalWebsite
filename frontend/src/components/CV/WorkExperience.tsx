import React, { ReactNode } from "react";
import { Stack } from "@mui/material";
import { styled } from "@mui/system";

import WorkCard from "./WorkCard";

function WorkExperience() {
  return (
    <div style={{ marginTop: "65px" }}>
      <h2 className="heading cv-heading" style={{ marginBottom: "15px" }}>
        Work Experience
      </h2>
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
    </div>
  );
}
export default WorkExperience;
