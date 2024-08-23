import React from "react";
import { Link } from "react-router-dom";
import { Stack, Box } from "@mui/material";
import { styled } from "@mui/system";

import EncryptButton from "../EncryptButton";
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
  const CardContainer = styled(Box)(({ theme }) => ({
    height: "350px",
    width: "475px",
    // backgroundColor: "#181818",
    backgroundColor: "#202020",
    boxShadow: "0 0 20px var(--neon-purple)",
    padding: theme.spacing(3),
    borderRadius: "10px",
    backdropFilter: "blur(10px)",
    [theme.breakpoints.down("sm")]: {
      width: "75%",
      height: "auto",
    },
    [theme.breakpoints.only("md")]: {
      height: "300px",
      width: "38vw",
    },
  }));

  const ImageContainer = styled("img")(({ theme }) => ({
    height: "225px",
    width: "225px",
    borderRadius: "10px",
    boxShadow: "0 0 10px var(--neon-purple)",
    [theme.breakpoints.down("sm")]: {
      width: "8rem",
      height: "8rem",
    },
    [theme.breakpoints.only("md")]: {
      height: "175px",
      width: "175px",
    },
  }));

  const TextContainer = styled("p")(({ theme }) => ({
    fontSize: "16px",
    textShadow: "0 0 15px #ffffff",
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
  }));

  const TitleContainer = styled("h3")(({ theme }) => ({
    fontSize: "28px",
    [theme.breakpoints.down("sm")]: {
      letterSpacing: "0.33rem",
      fontSize: "17px",
    },
    [theme.breakpoints.only("md")]: {
      fontSize: "21px",
    },
  }));

  const ProjectButton = styled("button")(({ theme }) => ({
    backgroundColor: "var(--neon-purple)",
    color: "#fff",
    border: "none",
    bordeRadius: "5px",
    padding: "10px 20px",
    margin: "0 10px",
    textDecoration: "none",
    fontSize: "16px",
    ":hover": { backgroundColor: "#0056b3" },
  }));

  const ProjectsButton = styled("button")(({ theme }) => ({
    backgroundColor: "var(--neon-orange)",
    color: "#fff",
    border: "none",
    bordeRadius: "5px",
    padding: "10px 20px",
    margin: "0 10px",
    textDecoration: "none",
    fontSize: "16px",
    ":hover": { backgroundColor: "#218838" },
  }));

  return (
    <CardContainer>
      <Stack direction="column" spacing={3} alignItems="center">
        <TitleContainer className="heading">{props.title}</TitleContainer>
        <Stack
          direction="row"
          spacing={{ xs: 2, md: 4 }}
          justifyContent="space-evenly"
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
        <div className="project-buttons">
          <Link to={props.leftButtonLink} className="link">
            <ProjectButton>{props.leftButtonText}</ProjectButton>
          </Link>
          <Link to={props.rightButtonLink} className="link">
            <ProjectsButton>{props.rightButtonText}</ProjectsButton>
          </Link>
        </div>
      </Stack>
    </CardContainer>
  );
}

export default FeaturedProject;
