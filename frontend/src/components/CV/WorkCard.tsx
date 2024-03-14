import React, { ReactNode } from "react";
import { Stack } from "@mui/material";

interface WorkCardProps {
  imagen: string;
  jobTitle: string;
  employer: string;
  date: string;
}

function WorkCard(props: WorkCardProps) {
  //   const cardStyle = {
  //     height: "250px",
  //     width: "500px",
  //     backgroundColor: "#181818",
  //     boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
  //     padding: "20px",
  //     borderRadius: "10px",
  //     backdropFilter: "blur(10px)",
  //     // background: "#000000",
  //     // backdropFilter: "blur(10px)", // Apply a blur effect
  //     // backgroundColor: "rgba(255, 255, 255, 0.5)", // Set a semi-transparent background color
  //     // padding: "20px",
  //     // borderRadius: "10px", // Add rounded corners for a more glassy effect
  //   };

  //   const imgStyle = {
  //     height: "250px",
  //     width: "250px",
  //     borderRadius: "10px",
  //   };

  //   const fontStyle = {
  //     fontSize: "16px",
  //     textShadow: "0 0 10px #00d9ff",
  //   };

  const cardStyle = {
    height: "250px",
    width: "450px",
    backgroundColor: "#181818",
    boxShadow: "0 0 20px #ffffff",
    padding: "20px",
    borderRadius: "10px",
    backdropFilter: "blur(10px)",
    // background: "#000000",
    // backdropFilter: "blur(10px)", // Apply a blur effect
    // backgroundColor: "rgba(255, 255, 255, 0.5)", // Set a semi-transparent background color
    // padding: "20px",
    // borderRadius: "10px", // Add rounded corners for a more glassy effect
  };

  const imgStyle = {
    height: "250px",
    width: "250px",
    borderRadius: "10px",
    boxShadow: "0 0 15px #ffffff",
  };

  const fontStyle = {
    fontSize: "16px",
    textShadow: "0 0 10px #ffffff",
  };

  return (
    <Stack
      direction="row"
      spacing={{ xs: 1, sm: 2, md: 4 }}
      justifyContent="space-evenly"
      style={cardStyle}
    >
      <img src={props.imagen} style={imgStyle} alt="Work" />
      <Stack direction="column" spacing={1} justifyContent="space-evenly">
        <p style={fontStyle}>{props.jobTitle}</p>
        <p style={fontStyle}>{props.employer}</p>
        <p style={fontStyle}>{props.date}</p>
      </Stack>
    </Stack>
  );
}
export default WorkCard;
