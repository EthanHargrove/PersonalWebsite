import React, { useEffect, useState } from "react";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  Label,
  ComposedChart,
} from "recharts";
import { Stack, Tabs, Tab } from "@mui/material";

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

  const [tab, setTab] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const tabStyles = {
    backgroundColor: "#804A00",
    color: "#ffffff",
    textTransform: "none",
    minWidth: dimensions.width < 444 ? 20 : 100,
    width:
      Math.min(dimensions.width, dimensions.height) < 444
        ? dimensions.width / 3.25
        : dimensions.width / 4,
    borderTop: "2px solid #ffffff",
    fontSize:
      Math.min(dimensions.height, dimensions.width) < 444 ? "16px" : "18px",
  };

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

  const fontSize = Math.min(dimensions.width / 30, dimensions.height / 30);
  const axisLabelFontSize = 16;

  return (
    <div className="section" style={{ margin: 0, padding: 0 }}>
      <div
        className="background"
        style={{
          backgroundImage:
            dimensions.width < 444
              ? "url(./images/ExplorationPortrait.png)"
              : "url(./images/ExplorationLandscape.png)",
        }}
      />
      <div
        style={{
          background: "rgba(255, 255, 255, 0.8)",
          width:
            Math.min(dimensions.width, dimensions.height) < 444
              ? "92vw"
              : "85vw",
          height:
            Math.min(dimensions.width, dimensions.height) < 444
              ? `${dimensions.height - 55 - 20}px`
              : "82vh",
          paddingLeft: "5px",
          paddingRight: "15px",
          paddingBottom: "0px",
          marginTop: "55px",
          marginBottom: "0px",
        }}
      >
        {/* <h3
          style={{
            color: "#804A00",
            paddingTop: "10px",
            paddingLeft: "10px",
            paddingBottom: "6px",
            marginBottom: 0,
          }}
        >
          Tricks for Exploration
        </h3> */}

        <Tabs
          value={tab}
          onChange={handleTabChange}
          textColor="inherit"
          TabIndicatorProps={{
            style: { backgroundColor: "#ffffff" },
          }}
          centered
          sx={{ paddingTop: "7px" }}
        >
          <Tab
            label={"Exploration vs Exploitation"}
            value={0}
            sx={{
              borderLeft: "2px solid #ffffff",
              borderRight: "1px solid #ffffff",
              ...tabStyles,
            }}
          />
          <Tab
            label={"Exploring Starts"}
            value={1}
            sx={{
              borderLeft: "2px solid #ffffff",
              borderRight: "1px solid #ffffff",
              ...tabStyles,
            }}
          />
          <Tab
            label={"ε-scheduling"}
            value={2}
            sx={{
              borderLeft: "1px solid #ffffff",
              borderRight: "2px solid #ffffff",
              ...tabStyles,
            }}
          />
        </Tabs>
        {tab === 0 && (
          <>
            <ul
              style={{
                color: "#804A00",
                paddingTop: "6px",
                marginTop: 0,
                fontSize: fontSize,
              }}
            >
              <li>
                <strong>Exploration</strong>: taking a new action to potentially
                discover a more optimal strategy
              </li>
              <li>
                <strong>Exploitation</strong>: using the current best-known
                actions to maximize rewards based on past experience
              </li>
              <li>The number of possible states increases each turn</li>
            </ul>
          </>
        )}
        {tab === 1 && (
          <>
            <ul
              style={{
                color: "#804A00",
                paddingTop: "6px",
                marginTop: 0,
                fontSize: fontSize,
              }}
            >
              <li>
                The number of possible states for a given turn is highest in the
                mid-to-late game
              </li>
              <li>
                Non-zero rewards are only received when a game ends, needs time
                to propagate backwards
              </li>
              <li>
                Therefore starting from a random state rather than the beginning
                of the game will allow for more efficient exploration
              </li>
            </ul>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ComposedChart
                width={
                  dimensions.width < 444
                    ? dimensions.width * 0.99
                    : dimensions.width * 0.8
                }
                height={
                  dimensions.width < 444
                    ? dimensions.width * 0.8
                    : dimensions.height * 0.4
                }
                data={data}
                margin={{ top: 0, right: 20, left: 20, bottom: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  fill="#ffffff"
                  fillOpacity={0.8}
                  stroke={"#804A00"}
                />
                <XAxis dataKey="turn" stroke={"#804A00"} fontSize={fontSize}>
                  <Label
                    value={"Turn Number"}
                    offset={2}
                    position="bottom"
                    stroke={"#804A00"}
                    fontSize={axisLabelFontSize}
                  />
                </XAxis>
                <YAxis
                  yAxisId="left"
                  orientation="right"
                  stroke={"#804A00"}
                  fontSize={fontSize}
                >
                  <Label
                    value={"Unique States"}
                    offset={5}
                    position="right"
                    stroke={"#804A00"}
                    angle={90}
                    style={{ textAnchor: "middle" }}
                    fontSize={axisLabelFontSize}
                  />
                </YAxis>
                <YAxis yAxisId="right" stroke={"#804A00"} fontSize={fontSize}>
                  <Label
                    value={"Unique Actions"}
                    offset={-10}
                    position="left"
                    stroke={"#804A00"}
                    angle={270}
                    style={{ textAnchor: "middle" }}
                    fontSize={axisLabelFontSize}
                  />
                </YAxis>
                <Tooltip />
                <Legend
                  verticalAlign="top"
                  layout={"horizontal"}
                  wrapperStyle={{ fontSize: "16px" }}
                />
                <Bar
                  yAxisId="left"
                  dataKey="states"
                  fill="#556B2F"
                  name="Unique States"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="actions"
                  stroke="#311D3F"
                  name="Possible Actions"
                  strokeWidth={3}
                />
              </ComposedChart>
            </div>
          </>
        )}
        {tab === 2 && (
          <>
            <ul
              style={{
                color: "#804A00",
                paddingTop: "6px",
                marginTop: 0,
                fontSize: fontSize,
              }}
            >
              <li>
                Starting from a randomly selected mid-game state rather than the
                beginning of the game
              </li>
              <li>
                Non-zero rewards are only received when a game ends, needs time
                to propagate backwards
              </li>
              <li>The number of possible states increases each turn</li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default TipsAndTricks;
