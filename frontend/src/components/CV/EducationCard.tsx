import React, { useEffect, useState } from "react";
import { Stack, Box } from "@mui/material";
import { styled } from "@mui/system";

interface EducationCardProps {
  imagen: string;
  university: string;
  degree: string;
  grade: string;
  date: string;
}

function EducationCard(props: EducationCardProps) {
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

  const TextContainer = styled("p")(({ theme }) => ({
    fontSize: `clamp(2px, 16px, ${dimensions.width * 0.0175}px)`,
    textShadow: "0 0 15px #ffffff",
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
  }));

  return (
    <CardContainer>
      <Stack
        direction="row"
        spacing={{ xs: 2, md: 4 }}
        // justifyContent="space-evenly"
      >
        <ImageContainer src={props.imagen} draggable={false} alt="Graduation" />
        <Stack direction="column" spacing={1} justifyContent="space-evenly">
          <TextContainer>{props.university}</TextContainer>
          <TextContainer>{props.degree}</TextContainer>
          {/* <TextContainer>{props.grade}</TextContainer> */}
          <TextContainer>{props.date}</TextContainer>
        </Stack>
      </Stack>
    </CardContainer>
  );
}
export default EducationCard;
