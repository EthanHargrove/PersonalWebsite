import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";

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

  return (
    <div className="section" style={{ margin: 0, padding: 0 }}>
      <div
        className="blur-background"
        style={{
          backgroundImage:
            dimensions.width < 444
              ? "url(./images/NNPortrait.png)"
              : "url(./images/NNLandscape.png)",
        }}
      />
      <Stack>
        <h3>Xs and Os</h3>
        <ul>
          <li>
            Players alternate turns, aiming to get three marks in a row on a 3x3
            grid.
          </li>
          <li>Rewards:</li>
          <ul>
            <li>Win: +1</li>
            <li>Loss: -1</li>
            <li>Draw: 0</li>
          </ul>
          <li>
            The agent was trained by playing against itself using a single
            Q-table
          </li>
          <li>
            <strong>Potential improvement</strong>: The state space could be
            reduced by using symmetries, grouping equivalent board
            configurations together (e.g., rotations and reflections).
          </li>
          <li>
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
