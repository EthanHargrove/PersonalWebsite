import React, { useCallback, useEffect, useState } from "react";
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

  // const handleResize = () => {
  //   setDimensions({
  //     width: window.innerWidth,
  //     height: window.innerHeight,
  //   });
  // };

  const debounce = (func: any, wait: any) => {
    let timeout: any;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const handleResize = useCallback(() => {
    const debouncedResize = debounce(() => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 250);

    debouncedResize();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // useEffect(() => {
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  const CardContainer = styled(Box)(({ theme }) => ({
    width:
      dimensions.width < dimensions.height
        ? "80%"
        : `${dimensions.width * 0.33}px`,
    height: `${Math.min(dimensions.height * 0.4, 250)}px`,
    // backgroundColor: "#181818",
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
      width:
        dimensions.width < dimensions.height
          ? "80%"
          : `${dimensions.width * 0.33}px`,
      height: `${Math.min(dimensions.height * 0.265, 250)}px`,
    },
    [theme.breakpoints.only("md")]: {
      height: `${Math.min(dimensions.height * 0.5, 250)}px`,
      width:
        dimensions.width < dimensions.height
          ? `${Math.min(dimensions.width * 0.38, 400)}px`
          : `${dimensions.width * 0.33}px`,
    },
    [theme.breakpoints.up("lg")]: {
      height: `${Math.min(dimensions.height * 0.5, 300)}px`,
      width: `${Math.min(dimensions.width * 0.38, 475)}px`,
    },
  }));

  const ImageContainer = styled("img")(({ theme }) => ({
    height: `${Math.min(dimensions.height * 0.2, 200)}px`,
    width: `${Math.min(dimensions.height * 0.2, 200)}px`,
    borderRadius: "10px",
    boxShadow: "0 0 10px var(--neon-purple)",
    [theme.breakpoints.down("sm")]: {
      height: `${Math.min(dimensions.width * 0.265 * 0.4, 200)}px`,
      width: `${Math.min(dimensions.width * 0.265 * 0.4, 200)}px`,
    },
    [theme.breakpoints.only("md")]: {
      height: `${Math.min(
        Math.min(dimensions.height * 0.5, 350) * 0.6,
        175
      )}px`,
      width: `${Math.min(Math.min(dimensions.height * 0.5, 350) * 0.6, 175)}px`,
    },
    [theme.breakpoints.up("lg")]: {
      height: `${Math.min(
        Math.min(dimensions.height * 0.5, 350) * 0.6,
        190
      )}px`,
      width: `${Math.min(Math.min(dimensions.height * 0.5, 350) * 0.6, 190)}px`,
    },
  }));

  const TextContainer = styled("p")(({ theme }) => ({
    fontSize: `${Math.min(dimensions.height * 0.0275)}px`,
    textShadow: "0 0 15px #ffffff",
    [theme.breakpoints.down("sm")]: {
      fontSize: `${dimensions.height * 0.015}px`,
    },
    [theme.breakpoints.only("md")]: {
      fontSize: `${Math.min(
        dimensions.width * 0.014,
        dimensions.height * 0.03
      )}px`,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: `${Math.min(
        Math.min(dimensions.width * 0.013, dimensions.height * 0.04),
        17
      )}px`,
    },
  }));

  const TitleContainer = styled("h3")(({ theme }) => ({
    fontSize: `${dimensions.height * 0.0375}px`,
    letterSpacing: "0.4rem",
    margin: 0,
    padding: 0,
    [theme.breakpoints.down("sm")]: {
      fontSize: `${dimensions.height * 0.02}px`,
      letterSpacing: "0.4rem",
    },
    [theme.breakpoints.only("md")]: {
      letterSpacing: "0.66rem",
      fontSize: `${Math.min(
        dimensions.width * 0.018,
        dimensions.height * 0.04
      )}px`,
    },
    [theme.breakpoints.up("lg")]: {
      letterSpacing: "0.66rem",
      fontSize: `${Math.min(
        dimensions.width * 0.0175,
        dimensions.height * 0.06
      )}px`,
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
    fontSize: `${dimensions.height * 0.0275}px`,
    minWidth: `${Math.max(
      dimensions.width * 0.085,
      dimensions.height * 0.085
    )}px`,
    ":hover": {
      backgroundColor: "var(--neon-purple)",
      cursor: "pointer",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: `${dimensions.height * 0.015}px`,
    },
    [theme.breakpoints.only("md")]: {
      fontSize: `${Math.min(
        dimensions.width * 0.014,
        dimensions.height * 0.03
      )}px`,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: `${Math.min(
        Math.min(dimensions.width * 0.013, dimensions.height * 0.04),
        17
      )}px`,
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
    fontSize: `${dimensions.height * 0.0275}px`,
    minWidth: `${Math.max(
      dimensions.width * 0.085,
      dimensions.height * 0.085
    )}px`,
    ":hover": { backgroundColor: "var(--neon-orange)", cursor: "pointer" },
    [theme.breakpoints.down("sm")]: {
      fontSize: `${dimensions.height * 0.015}px`,
    },
    [theme.breakpoints.only("md")]: {
      fontSize: `${Math.min(
        dimensions.width * 0.014,
        dimensions.height * 0.03
      )}px`,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: `${Math.min(
        Math.min(dimensions.width * 0.013, dimensions.height * 0.04),
        17
      )}px`,
    },
  }));

  return (
    <CardContainer>
      <Stack
        spacing={{ xs: 1, lg: 2 }}
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
