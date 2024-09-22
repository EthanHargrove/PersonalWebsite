import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { styled } from "@mui/system";

interface WorkCardProps {
  imagen: string;
  jobTitle: string;
  employer: string;
  date: string;
}

function WorkCard(props: WorkCardProps) {
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

  const TextContainer = styled("p")(({ theme }) => ({
    fontSize: `clamp(2px, 16px, ${dimensions.width * 0.0175}px)`,
    textShadow: "0 0 15px #ffffff",
    [theme.breakpoints.down("sm")]: {
      fontSize: `12px`,
    },
  }));

  const CardContainer = styled(Box)(({ theme }) => ({
    height: "225px",
    width: "425px",
    maxWidth: dimensions.width > dimensions.height ? "37vw" : "",
    maxHeight: dimensions.width > dimensions.height ? "20vw" : "",
    backgroundColor: "#181818",
    boxShadow: "0 0 20px #ffffff",
    padding: theme.spacing(2),
    borderRadius: "10px",
    backdropFilter: "blur(10px)",
    [theme.breakpoints.down("sm")]: {
      width: "75%",
      height: "auto",
    },
    [theme.breakpoints.only("md")]: {
      height: "175px",
      width: "375px",
    },
  }));

  const ImageContainer = styled("img")(({ theme }) => ({
    height: "225px",
    width: "225px",
    maxHeight: dimensions.width > dimensions.height ? "20vw" : "",
    maxWidth: dimensions.width > dimensions.height ? "20vw" : "",
    borderRadius: "10px",
    boxShadow: "0 0 10px #ffffff",
    [theme.breakpoints.down("sm")]: {
      width: "8rem",
      height: "8rem",
    },
    [theme.breakpoints.only("md")]: {
      height: "175px",
      width: "175px",
    },
  }));

  return (
    <CardContainer>
      <Stack
        direction="row"
        spacing={{ xs: 2, md: 4 }}
        // justifyContent="space-evenly"
      >
        <ImageContainer src={props.imagen} draggable={false} alt="Work" />
        <Stack direction="column" spacing={1} justifyContent="space-evenly">
          <TextContainer>{props.jobTitle}</TextContainer>
          <TextContainer>{props.employer}</TextContainer>
          <TextContainer>{props.date}</TextContainer>
        </Stack>
      </Stack>
    </CardContainer>
  );
}
export default WorkCard;
