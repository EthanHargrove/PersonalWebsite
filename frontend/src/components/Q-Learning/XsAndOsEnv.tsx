import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import XsAndOsGame from "../XsAndOs/XsAndOsGame";

const XsAndOsEnv: React.FC = () => {
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

  const boxWidth =
    dimensions.width < 444 ? "90%" : dimensions.height < 444 ? "75%" : "66%";

  // const fontSize =
  //   dimensions.width < 444
  //     ? "90%"
  //     : dimensions.height < 444
  //     ? "75%"
  //     : Math.min(dimensions.height * 0.02 + dimensions.width * 0.005, 30);

  const fontSize = Math.min(
    dimensions.height * 0.015 + dimensions.width * 0.007,
    30
  );

  return (
    <div className="section" style={{ margin: 0, padding: 0 }}>
      <div
        className="blur-background"
        style={{
          backgroundImage:
            dimensions.width < 444
              ? "url(./images/CyberpunkBackground.png)"
              : "url(./images/CyberpunkBackground.png)",
        }}
      />
      <Stack
        style={{
          // background: "rgba(155, 155, 155, 0.75)",
          // color: "black",
          background: "rgba(5, 5, 5, 0.5)",
          color: "white",
          position: "absolute",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: boxWidth,
          height: "auto",
        }}
      >
        <h3 style={{ textAlign: "center", fontSize: 1.75 * fontSize }}>
          Xs and Os Environment
        </h3>
        <ul style={{ fontSize: fontSize }}>
          <li style={{ paddingBottom: "3vh" }}>
            Players alternate turns, aiming to get three marks in a row on a 3x3
            grid.
          </li>
          <li>Rewards:</li>
          <ul>
            <li>Win: +1</li>
            <li>Loss: -1</li>
            <li style={{ paddingBottom: "3vh" }}>Draw: 0</li>
          </ul>
          <li style={{ paddingBottom: "3vh" }}>
            The agent was trained by playing against itself using a single
            Q-table
          </li>
          <li style={{ paddingBottom: "3vh" }}>
            <strong>Potential improvement</strong>: The state space could be
            reduced by using symmetries, grouping equivalent board
            configurations together (e.g., rotations and reflections).
          </li>
          <li style={{ paddingBottom: "3vh" }}>
            <strong>Limitations:</strong> Q-learning may struggle in multi-agent
            scenarios due to the non-stationary environment, where each agent's
            strategy evolves, complicating convergence to optimal policies.
          </li>
        </ul>
      </Stack>
    </div>
  );
};

export default XsAndOsEnv;
