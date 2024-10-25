import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Grid, Stack } from "@mui/material";

interface PlaceholderProps {
  // Define the props for the component here
}

const Axelrod: React.FC<PlaceholderProps> = () => {
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

  const fontStyle = {
    fontFamily: "SpaceGrotesk",
    color: "#000000",
    textShadow:
      "1px 1px 0 #FFFFFF, -1px -1px 0 #FFFFFF, 1px -1px 0 #FFFFFF, -1px 1px 0 #FFFFFF",
  };

  const titleFontSize =
    Math.min(dimensions.width, dimensions.height) < 444 ? "1rem" : "2rem";

  const fontSize =
    Math.min(dimensions.width, dimensions.height) < 444 ? "0.8rem" : "1.5rem";

  return (
    <div className="section">
      <div
        className="background"
        style={{
          backgroundImage:
            dimensions.width < 444
              ? "url(./images/PrisonCellPortrait.png)"
              : "url(./images/PrisonCellLandscape.png)",
        }}
      />
      <div
        style={{
          overflow: "hidden",
          background: "rgba(0, 0, 0, 0.66)",
          paddingLeft: dimensions.width < 444 ? "5px" : "30px",
          paddingRight: dimensions.width < 444 ? "10px" : "35px",
          paddingBottom: "5px",
          marginTop: dimensions.height < dimensions.width ? "15px" : "0px",
        }}
      >
        <h3
          className="heading"
          style={{
            color: "var(--neon-orange)",
            textAlign: "center",
            marginBottom: dimensions.width < 444 ? 0 : -10,
            paddingBottom: dimensions.width < 444 ? 0 : -10,
            fontSize: titleFontSize,
          }}
        >
          Axelrod's Tournament
        </h3>
        <ul
          style={{
            marginBottom:
              dimensions.width < 444 ? dimensions.height * 0.005 : 0,
            paddingBottom:
              dimensions.width < 444 ? dimensions.height * 0.005 : 0,
          }}
        >
          <li
            style={{
              color: "var(--neon-orange)",
              fontSize: fontSize,
            }}
          >
            Dr. Robert Axelrod, a Professor of Political Science and Public
            Policy, organized a tournament in 1980 to find the best strategy for
            the repeated Prisoner's Dilemma
          </li>
          <li
            style={{
              color: "var(--neon-orange)",
              fontSize: fontSize,
            }}
          >
            14 different strategies were submitted by various game theory
            researchers
          </li>
          <li
            style={{
              color: "var(--neon-orange)",
              fontSize: fontSize,
            }}
          >
            Each strategy played against each other strategy for 200 rounds
          </li>
        </ul>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src="./images/axelrod_tournament.png"
            style={{
              height: Math.min(dimensions.width, dimensions.height) * 0.4,
              width: Math.min(dimensions.width, dimensions.height) * 0.4,
            }}
            alt="Axelrod Tournament"
          />
        </div>
      </div>
    </div>
  );
};

export default Axelrod;
