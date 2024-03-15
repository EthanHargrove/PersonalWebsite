import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";
import { Stack, Box } from "@mui/material";
import { styled } from "@mui/system";

import "../../styles/card.css";

interface SkillsCardProps {
  background: string;
  imgBackground?: string | undefined;
  textColour: string;
  imagen: string;
  title: string;
}

function SkillsCard(props: SkillsCardProps) {
  const [show, setShown] = useState(false);

  const CardContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    background: props.background,
    borderRadius: "20px",
    height: "250px",
    width: "200px",
    boxShadow: show
      ? `0 0 15px 7.5px ${props.textColour}`
      : `0 0 10px 5px ${props.textColour}`,
    marginTop: "25px",
    marginBottom: "25px",
    transform: show ? "scale(1.05)" : "scale(1)",
    [theme.breakpoints.down("sm")]: {
      width: "75%",
      height: "auto",
    },
  }));

  const ImageContainer = styled("img")(({ theme }) => ({
    maxHeight: "150px",
    maxWidth: "150px",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "85%",
      maxHeight: "85%",
    },
  }));

  const ImageBackground = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "170px",
    width: "170px",
    backgroundColor: props.imgBackground,
    borderRadius: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "8rem",
      height: "8rem",
    },
  }));

  const TitleContainer = styled("h3")(({ theme }) => ({
    color: props.textColour,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  }));

  return (
    <CardContainer
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        direction="column"
        spacing={2}
      >
        <ImageBackground>
          <ImageContainer src={props.imagen} alt={`${props.title} Logo`} />
        </ImageBackground>
        <TitleContainer>{props.title}</TitleContainer>
      </Stack>
    </CardContainer>
  );
}

export default SkillsCard;
