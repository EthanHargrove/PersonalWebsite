import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Stack, Box } from "@mui/material";
import { styled } from "@mui/system";

import "../../styles/featured-project.css";

interface FeaturedProjectProps {
  title: string;
  imagen: string;
  subtitle: string;
  blurb: string;
  leftButtonText: string;
  leftButtonLink: string;
  rightButtonText: string;
  rightButtonLink: string;
}

function FeaturedProject(props: FeaturedProjectProps) {
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

  let cardWidth: number;
  let cardHeight: number;
  if (dimensions.width <= 600) {
    cardWidth =
      dimensions.width < dimensions.height + 50
        ? dimensions.width * 0.7
        : dimensions.width * 0.33;
    cardHeight = Math.min(dimensions.height * 0.265, 250);
  } else if (dimensions.width <= 900) {
    cardWidth =
      dimensions.width < dimensions.height + 50
        ? Math.min(dimensions.width * 0.8, 500)
        : dimensions.width * 0.33;
    const recommendedHeight =
      dimensions.width < dimensions.height + 50
        ? dimensions.height * 0.25
        : dimensions.height * 0.4;
    cardHeight = Math.min(Math.max(recommendedHeight, 150), 600);
  } else {
    cardWidth =
      dimensions.width < dimensions.height + 50
        ? Math.min(dimensions.width * 0.8, 700)
        : Math.min(dimensions.width * 0.38, 475);
    cardHeight = Math.max(dimensions.height * 0.33, 250);
  }
  const imageHeight = Math.min(0.6 * cardHeight, 0.5 * cardWidth);
  const imageWidth = Math.min(0.6 * cardHeight, 0.5 * cardWidth);
  const titleFontSize = 0.045 * cardWidth;
  const fontSize = Math.min(
    dimensions.width < dimensions.height + 50
      ? 0.00017 * cardHeight * cardWidth
      : 0.00017 * cardHeight * cardWidth,
    0.9 * titleFontSize
  );
  const buttonFontSize = fontSize;

  const CardContainer = styled(Box)(({ theme }) => ({
    width: `${cardWidth}px`,
    height: `${cardHeight}px`,
    backgroundColor: "#202020",
    boxShadow: "0 0 20px var(--neon-purple)",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    borderRadius: "10px",
    backdropFilter: "blur(10px)",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  }));

  const ImageContainer = styled("img")(({ theme }) => ({
    height: `${imageHeight}px`,
    width: `${imageWidth}px`,
    borderRadius: "10px",
    boxShadow: "0 0 10px var(--neon-purple)",
  }));

  const TextContainer = styled("p")(({ theme }) => ({
    fontSize: `clamp(10px, ${fontSize}px, 24px)`,
    textShadow: "0 0 15px #ffffff",
  }));

  const TitleContainer = styled("h3")(({ theme }) => ({
    fontSize: `clamp(12px, ${titleFontSize}px, 32px)`,
    letterSpacing: "0.4rem",
    margin: 0,
    padding: 0,
    paddingBottom: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      letterSpacing: "0.4rem",
    },
    [theme.breakpoints.only("md")]: {
      letterSpacing: "0.66rem",
    },
    [theme.breakpoints.up("lg")]: {
      letterSpacing: "0.66rem",
    },
  }));

  const ProjectButton = styled("button")(({ theme }) => ({
    backgroundColor: "transparent",
    color: "#fff",
    padding: "5px 10px",
    margin: "0px",
    border: "none",
    borderRadius: "20px",
    boxShadow: "0 0 20px var(--neon-purple)",
    outline: "1px solid var(--neon-purple)",
    textDecoration: "none",
    fontSize: `${buttonFontSize}px`,
    ":hover": {
      backgroundColor: "var(--neon-purple)",
      cursor: "pointer",
    },
  }));

  const ProjectsButton = styled("button")(({ theme }) => ({
    backgroundColor: "transparent",
    color: "#fff",
    padding: "5px 10px",
    margin: "0px",
    textDecoration: "none",
    border: "none",
    boxShadow: "0 0 20px var(--neon-orange)",
    outline: "1px solid var(--neon-orange)",
    borderRadius: "20px",
    fontSize: `${buttonFontSize}px`,
    ":hover": { backgroundColor: "var(--neon-orange)", cursor: "pointer" },
  }));

  return (
    <CardContainer>
      <Stack
        spacing={0}
        alignItems="center"
        justifyContent="space-evenly"
        height="100%"
        padding="0px"
      >
        <TitleContainer className="heading">{props.title}</TitleContainer>
        <Stack
          direction="row"
          spacing={{ xs: 2, md: 4 }}
          justifyContent="space-evenly"
          padding="0px"
        >
          <ImageContainer
            src={props.imagen}
            draggable={false}
            alt="Featured Project"
          />
          <Stack direction="column" spacing={1} justifyContent="space-evenly">
            <TextContainer>{props.subtitle}</TextContainer>
            <TextContainer>{props.blurb}</TextContainer>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-evenly"
          className="project-buttons"
          width="100%"
          padding="0px"
        >
          <Link to={props.leftButtonLink} className="link">
            <ProjectButton>{props.leftButtonText}</ProjectButton>
          </Link>
          <Link to={props.rightButtonLink} className="link">
            <ProjectsButton>{props.rightButtonText}</ProjectsButton>
          </Link>
        </Stack>
      </Stack>
    </CardContainer>
  );
}

export default FeaturedProject;
