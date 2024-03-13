import React, { ReactNode } from "react";
import { Stack } from "@mui/material";

interface EducationCardProps {
  imagen: string;
  university: string;
  degree: string;
  grade: string;
  date: string;
}

function EducationCard(props: EducationCardProps) {
  const cardStyle = {
    height: "250px",
    width: "500px",
    // background: "#000000",
    // backdropFilter: "blur(10px)", // Apply a blur effect
    // backgroundColor: "rgba(255, 255, 255, 0.5)", // Set a semi-transparent background color
    // padding: "20px",
    // borderRadius: "10px", // Add rounded corners for a more glassy effect
  };

  const imgStyle = {
    height: "250px",
  };

  const fontStyle = {
    fontSize: "16px",
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
      style={cardStyle}
    >
      <img src={props.imagen} style={imgStyle} alt="Graduation" />
      <Stack direction="column" spacing={1} justifyContent="space-evenly">
        <p style={fontStyle}>{props.university}</p>
        <p style={fontStyle}>{props.degree}</p>
        <p style={fontStyle}>{props.grade}</p>
        <p style={fontStyle}>{props.date}</p>
      </Stack>
    </Stack>
  );
}
export default EducationCard;
