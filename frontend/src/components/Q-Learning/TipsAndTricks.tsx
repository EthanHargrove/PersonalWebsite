import React, { useEffect, useState } from "react";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ComposedChart,
} from "recharts";
import { Stack, Tabs, Tab } from "@mui/material";

import PlayAgainstAI from "./PlayAgainstAI";

const TipsAndTricks: React.FC = () => {
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

  const data = [
    { turn: 1, states: 1, actions: 9 },
    { turn: 2, states: 9, actions: 8 },
    { turn: 3, states: 72, actions: 7 },
    { turn: 4, states: 252, actions: 6 },
    { turn: 5, states: 756, actions: 5 },
    { turn: 6, states: 1140, actions: 4 },
    { turn: 7, states: 1520, actions: 3 },
    { turn: 8, states: 780, actions: 2 },
    { turn: 9, states: 390, actions: 1 },
  ];

  return (
    <div className="section">
      <div
        className="background"
        style={{
          backgroundImage:
            dimensions.width < 444
              ? "url(./images/ExplorationPortrait.png)"
              : "url(./images/ExplorationLandscape.png)",
        }}
      />
      <PlayAgainstAI dark={false} />
      <div
        style={{
          background: "rgba(255, 255, 255, 0.75)",
          width: dimensions.width < 444 ? "92vw" : "85vw",
          height: dimensions.width < 444 ? "480px" : "82vh",
          paddingLeft: "5px",
          paddingRight: "15px",
        }}
      >
        <h3
          style={{
            color: "var(--neon-pink)",
            paddingTop: "10px",
            paddingLeft: "10px",
          }}
        >
          Tricks for Exploration
        </h3>
        <h4>Exploring Starts</h4>
        <ul>
          <li>
            Starting from a randomly selected mid-game state rather than the
            beginning of the game
          </li>
          <li>
            Non-zero rewards are only received when a game ends, needs time to
            propagate backwards
          </li>
          <li>The number of possible states increases each turn</li>
        </ul>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ComposedChart width={dimensions.width < 444 ? dimensions.width * 0.8 : dimensions.width * 0.5} height={dimensions.width < 444 ? dimensions.width * 0.8 : dimensions.height * 0.4} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="turn" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="states"
              fill="#8884d8"
              name="Unique States"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="actions"
              stroke="#82ca9d"
              name="Possible Actions"
            />
          </ComposedChart>
        </div>
      </div>
    </div>
  );
};

export default TipsAndTricks;
