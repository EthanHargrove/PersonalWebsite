import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";

import "../../styles/card.css";

interface SkillsCardProps {
  background: string;
  imgBackground?: string | undefined;
  textColour: string;
  imagen: string;
  title: string;
}

function SkillsCard(props: SkillsCardProps) {
  const cardStyle = {
    display: "flex",
    justifyContent: "center",
    background: props.background,
    borderRadius: "20px",
    height: "250px",
    width: "200px",
    boxShadow: `0 0 10px 5px ${props.textColour}`,
  };

  const imgStyle = {
    maxHeight: "150px",
    maxWidth: "150px",
  };

  const imgBackground = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "170px",
    width: "170px",
    backgroundColor: props.imgBackground,
    borderRadius: "50%",
  };

  return (
    <div style={cardStyle}>
      <Stack
        alignItems="center"
        justifyContent="center"
        direction="column"
        spacing={2}
      >
        <div style={imgBackground}>
          <img
            src={props.imagen}
            style={imgStyle}
            alt={`${props.title} Logo`}
          />
        </div>
        <h3 style={{ color: props.textColour }}>{props.title}</h3>
      </Stack>
    </div>
  );
}

export default SkillsCard;
