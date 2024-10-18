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
  LineChart,
  TooltipProps,
} from "recharts";
import { Stack, Tabs, Tab, List, ListItem } from "@mui/material";

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

  const fontSize =
    Math.min(dimensions.height, dimensions.width) < 444
      ? dimensions.height < dimensions.width
        ? dimensions.height / 30
        : Math.min(dimensions.width / 30, dimensions.height / 33)
      : Math.min(dimensions.width / 40, dimensions.height / 35);
  const axisLabelFontSize = fontSize + 2;
  const tickFontSize = fontSize * 0.7;

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
    fontSize: axisLabelFontSize,
  };

  const generateData = () => {
    const data = [];
    for (let t = 0; t <= 1000; t += 10) {
      const linearDecay = Math.max(1 - t / 1000, 0);
      const exponentialDecay = Math.exp(-0.005 * t);
      const constantDecay = 0.1;

      data.push({
        t,
        linear: linearDecay,
        exponential: exponentialDecay,
        constant: constantDecay,
      });
    }
    return data;
  };

  const εData = generateData();

  interface CustomTooltipProps extends TooltipProps<number, string> {
    active?: boolean;
    payload?: any[];
    label?: string;
  }

  const CustomTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            height: "auto",
            width: "auto",
            paddingLeft: "10px",
            paddingRight: "10px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <p style={{ color: "#804A00" }}>Turn Number: {label}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

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
              ? dimensions.height < dimensions.width
                ? `${dimensions.height - 45 - 10}px`
                : `${dimensions.height * 0.8}px`
              : dimensions.height < dimensions.width
              ? dimensions.height * 0.5 + dimensions.width * 0.2
              : dimensions.height * 0.85,
          paddingLeft: "5px",
          paddingRight: "15px",
          paddingBottom: "0px",
          marginTop:
            Math.min(dimensions.height, dimensions.width) < 444
              ? "45px"
              : "65px",
          marginBottom: "0px",
        }}
      >
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
          <Stack justifyContent="center" alignItems="center" height="80%">
            <ul
              style={{
                color: "#804A00",
                paddingTop: "6px",
                marginTop: 0,
                fontSize: fontSize,
              }}
            >
              <li style={{ marginTop: "5%", marginBottom: "5%" }}>
                <strong>Exploration</strong>: taking a new action to potentially
                discover a more optimal strategy
              </li>
              <li style={{ marginBottom: "5%" }}>
                <strong>Exploitation</strong>: using the current best-known
                actions to maximize rewards based on past experience
              </li>
              <li style={{ marginBottom: "5%" }}>
                <strong>Exploring too much</strong> is inefficient as too much
                time and resources are spent on suboptimal strategies
              </li>
              <li style={{ marginBottom: "5%" }}>
                <strong>Exploiting too much</strong> can lead to getting stuck
                in a local optima
              </li>
              <li style={{ marginBottom: "5%" }}>
                <strong>Balance</strong>: Finding the right balance between
                exploration and exploitation is key to optimizing both learning
                and performance.
              </li>
            </ul>
          </Stack>
        )}
        {tab === 1 && (
          <Stack
            direction={dimensions.height < dimensions.width ? "row" : "column"}
            justifyContent="center"
            alignItems="center"
            height="80%"
          >
            <div
              style={{
                width: dimensions.height < dimensions.width ? "50%" : "auto",
              }}
            >
              <ul
                style={{
                  color: "#804A00",
                  paddingTop: "6px",
                  marginTop: 0,
                  paddingBottom: 0,
                  marginBottom: 10,
                  fontSize: fontSize,
                }}
              >
                <li
                  style={{
                    marginBottom:
                      dimensions.height < dimensions.width &&
                      dimensions.height > 444
                        ? "4%"
                        : "0%",
                  }}
                >
                  Xs and Os is a delayed rewards problem. Non-zero rewards are
                  only received when a game ends, the agent needs time to
                  propagate the reward backward to learn which earlier actions
                  contributed to the final outcome
                </li>
                <li
                  style={{
                    marginBottom:
                      dimensions.height < dimensions.width &&
                      dimensions.height > 444
                        ? "4%"
                        : "0%",
                  }}
                >
                  The number of possible states for a given turn is highest in
                  the mid-to-late game
                </li>
                <li>
                  Starting from a random state instead of the beginning allows
                  the agent to explore a wider range of scenarios and learn more
                  efficiently by directly encountering mid-game and endgame
                  situations
                </li>
              </ul>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 0,
                marginTop: 0,
                width: dimensions.height < dimensions.width ? "50%" : "auto",
              }}
            >
              <ComposedChart
                width={
                  Math.min(dimensions.width, dimensions.height) < 444
                    ? dimensions.height > dimensions.width
                      ? dimensions.width * 0.99
                      : dimensions.width * 0.5
                    : dimensions.height > dimensions.width
                    ? dimensions.width * 0.8
                    : dimensions.width * 0.4
                }
                height={
                  Math.min(dimensions.width, dimensions.height) < 444
                    ? dimensions.height < dimensions.width
                      ? dimensions.height - 125
                      : dimensions.width * dimensions.height * 0.0008
                    : dimensions.height * 0.4
                }
                data={data}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom:
                    Math.min(dimensions.height, dimensions.width) < 444
                      ? 0
                      : 20,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  fill="#ffffff"
                  fillOpacity={0.8}
                  stroke={"#804A00"}
                />
                <XAxis
                  dataKey="turn"
                  stroke={"#804A00"}
                  fontSize={tickFontSize}
                >
                  <Label
                    value={"Turn"}
                    offset={-10}
                    position="bottom"
                    stroke={"#804A00"}
                    fontSize={axisLabelFontSize}
                  />
                </XAxis>
                <YAxis
                  yAxisId="left"
                  orientation="right"
                  stroke={"#804A00"}
                  fontSize={tickFontSize}
                >
                  <Label
                    value={"Unique States"}
                    offset={0}
                    position="right"
                    stroke={"#804A00"}
                    angle={90}
                    style={{ textAnchor: "middle" }}
                    fontSize={axisLabelFontSize}
                  />
                </YAxis>
                <YAxis
                  yAxisId="right"
                  stroke={"#804A00"}
                  fontSize={tickFontSize}
                >
                  <Label
                    value={"Unique Actions"}
                    offset={-25}
                    position="left"
                    stroke={"#804A00"}
                    angle={270}
                    style={{ textAnchor: "middle" }}
                    fontSize={axisLabelFontSize}
                  />
                </YAxis>
                <Tooltip content={<CustomTooltip />} />
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
          </Stack>
        )}
        {tab === 2 && (
          <Stack
            direction={dimensions.height < dimensions.width ? "row" : "column"}
            height="80%"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <div
              style={{
                width: dimensions.height < dimensions.width ? "50%" : "auto",
              }}
            >
              <ul
                style={{
                  color: "#804A00",
                  paddingTop: "6px",
                  marginTop: 0,
                  fontSize: fontSize,
                }}
              >
                <li
                  style={{
                    marginBottom:
                      dimensions.height < dimensions.width ? "10%" : "4%",
                  }}
                >
                  <strong>ε-greedy strategy</strong>: the agent chooses a random
                  action with probability ε and the best-known action with
                  probability 1-ε
                </li>
                <li
                  style={{
                    marginBottom:
                      dimensions.height < dimensions.width ? "10%" : "4%",
                  }}
                >
                  <strong>ε-scheduling</strong>: starting with a high ε for
                  early episodes of training and decreasing ε over time
                </li>
                <li>
                  The less the agent knows, the more it explores. The more the
                  agent knows, the more it exploits.
                </li>
              </ul>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: dimensions.height < dimensions.width ? "50%" : "auto",
              }}
            >
              <LineChart
                data={εData}
                margin={{
                  top: 5,
                  right: 20,
                  left: 20,
                  bottom: 30,
                }}
                width={
                  Math.min(dimensions.width, dimensions.height) < 444
                    ? dimensions.height > dimensions.width
                      ? dimensions.width * 0.99
                      : dimensions.width * 0.5
                    : dimensions.height > dimensions.width
                    ? dimensions.width * 0.8
                    : dimensions.width * 0.4
                }
                height={
                  Math.min(dimensions.width, dimensions.height) < 444
                    ? dimensions.height < dimensions.width
                      ? dimensions.height - 115
                      : dimensions.width * dimensions.height * 0.0008
                    : dimensions.height * 0.4
                }
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  fill="#ffffff"
                  fillOpacity={0.8}
                  stroke={"#804A00"}
                />
                <XAxis dataKey="t" stroke={"#804A00"} fontSize={tickFontSize}>
                  <Label
                    value={"Episode"}
                    offset={2}
                    position="bottom"
                    stroke={"#804A00"}
                    fontSize={axisLabelFontSize}
                  />
                </XAxis>
                <YAxis stroke={"#804A00"} fontSize={tickFontSize}>
                  <Label
                    value={"ε"}
                    offset={-10}
                    position="left"
                    stroke={"#804A00"}
                    angle={270}
                    style={{ textAnchor: "middle" }}
                    fontSize={axisLabelFontSize}
                  />
                </YAxis>
                <Legend
                  verticalAlign="top"
                  layout={"horizontal"}
                  wrapperStyle={{ fontSize: fontSize }}
                />
                <Line
                  type="monotone"
                  dataKey="linear"
                  stroke="#556B2F"
                  strokeWidth={3}
                  name="Linear Decay"
                  dot={false}
                  activeDot={false}
                />
                <Line
                  type="monotone"
                  dataKey="exponential"
                  stroke="#311D3F"
                  strokeWidth={3}
                  name="Exponential Decay"
                  dot={false}
                  activeDot={false}
                />
                <Line
                  type="monotone"
                  dataKey="constant"
                  stroke="#AE0A1E"
                  strokeWidth={3}
                  name="Constant ε"
                  dot={false}
                  activeDot={false}
                />
              </LineChart>
            </div>
          </Stack>
        )}
      </div>
    </div>
  );
};

export default TipsAndTricks;
