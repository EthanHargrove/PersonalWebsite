import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
  TooltipProps,
} from "recharts";

import { Stack, Tooltip as MUITooltip } from "@mui/material";

interface PlaceholderProps {
  // Define the props for the component here
}

const FirstResults: React.FC<PlaceholderProps> = () => {
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
    { name: "HBA", value: 2.929, value2: 2.747 },
    { name: "First by Stein and Rapoport", value: 2.651, value2: 2.651 },
    { name: "First by Grofman", value: 2.578, value2: 2.578 },
    { name: "Tit For Tat", value: 2.566, value2: 2.566 },
    { name: "First by Shubik", value: 2.552, value2: 2.552 },
    { name: "First by Tideman and Chieruzzi", value: 2.503, value2: 2.503 },
    { name: "First by Nydegger", value: 2.503, value2: 2.503 },
    { name: "Grudger", value: 2.452, value2: 2.452 },
    { name: "First by Davis", value: 2.451, value2: 2.451 },
    { name: "First by Downing", value: 2.223, value2: 2.224 },
    { name: "First by Graaskamp", value: 2.166, value2: 2.253 },
    { name: "First by Feld", value: 2.027, value2: 2.031 },
    { name: "First by Joss", value: 1.945, value2: 1.946 },
    { name: "First by Tullock", value: 1.727, value2: 1.866 },
    { name: "First by Anonymous", value: 1.609, value2: 1.619 },
    { name: "Random", value: 1.525, value2: 1.524 },
  ];

  const fontSize = 0.01 * dimensions.height;
  // Math.min(dimensions.height, dimensions.width) < 444
  //   ? dimensions.height < dimensions.width
  //     ? dimensions.height / 30
  //     : Math.min(dimensions.width / 30, dimensions.height / 33)
  //   : Math.min(dimensions.width / 40, dimensions.height / 35);

  const labels = ["Median Score (fully informed)", "Median Score (subset)"];
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
            backgroundColor: "rgba(30, 30, 30, 0.8)",
          }}
        >
          <p style={{ color: "#ffffff", marginBottom: "1px" }}>
            Policy : {label}
          </p>
          {payload.map((entry, index) => (
            <p
              key={`item-${index}`}
              style={{
                // fontSize: 0.7 * fontSize,
                color: entry.color,
                marginTop: "1px",
                marginBottom: "1px",
              }}
            >
              {labels[index]} : {entry.value.toFixed(3)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const tooltipFontStyle = {
    textDecoration: "underline",
    textDecorationStyle: "dotted" as "dotted",
  };

  return (
    <div className="section">
      <div style={{ overflow: "hidden" }}>
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
            color: "var(--neon-orange)",
            background: "rgba(0, 0, 0, 0.76)",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          <h3
            className="heading"
            style={{ textAlign: "center", color: "#ffffff" }}
          >
            Results
          </h3>
          <p style={{ color: "var(--neon-orange)" }}>
            Reran the original Axelrod tournament including our HBA agent. All
            of the policies are included in the prior belief over opponent
            policies.
          </p>
          <p style={{ color: "var(--neon-purple)" }}>
            Imagine that we don't know the set of all possible policies. We can
            determine some ways to classify policies (nice/nasty, retalitory,
            forgiving) and choose a representative policy for each combination
            of classes:{" "}
            <MUITooltip
              placement="top"
              title={
                "TitForTat (Nice, Retalitory, Forgiving): Starts by cooperating and then mimics the previous action of the opponent."
              }
            >
              <span style={tooltipFontStyle}>TitForTat,</span>
            </MUITooltip>{" "}
            <MUITooltip
              placement="top"
              title={
                "Grudger (Nice, Retalitory, Unforgiving): Cooperates until the opponent defects, then permanently defecting."
              }
            >
              <span style={tooltipFontStyle}>Grudger,</span>
            </MUITooltip>{" "}
            <MUITooltip
              placement="top"
              title={
                "TitFor2Tats (Nice, Less retalitory, Forgiving): Cooperates unless the opponent has defected twice in a row."
              }
            >
              <span style={tooltipFontStyle}>TitFor2Tats,</span>
            </MUITooltip>{" "}
            <MUITooltip
              placement="top"
              title={
                "Bully (Nasty, Not retalitory): Starts by defecting and then does the opposite of opponent's previous move. Also known as Reverse Tit For Tat."
              }
            >
              <span style={tooltipFontStyle}>Bully,</span>
            </MUITooltip>{" "}
            <MUITooltip
              placement="top"
              title={
                "FirstByJoss (Nasty, Retalitory, Forgiving): Cooperates 90% of the time after opponent cooperates, always defects after opponent defects."
              }
            >
              <span style={tooltipFontStyle}>FirstByJoss,</span>
            </MUITooltip>{" "}
            and{" "}
            <MUITooltip
              placement="top"
              title={
                "Predator (Nasty, Retalitory, Unforgiving): A deceptive strategy that starts cooperative but quickly transitions into a predominantly defecting approach based on the opponent's history."
              }
            >
              <span style={tooltipFontStyle}>Predator.</span>
            </MUITooltip>
          </p>
          <Stack alignItems="center">
            <BarChart
              width={
                dimensions.width < 444
                  ? dimensions.width * 0.9
                  : dimensions.width * 0.8
              }
              height={dimensions.height * 0.65}
              data={data}
              layout="vertical"
              margin={{
                top: 5,
                right: 30,
                left: -30,
                bottom: 50,
              }}
              barGap={0}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickSize={8} tickMargin={8}>
                <Label
                  value="Median Score Per Round"
                  position="bottom"
                  offset={20}
                  style={{
                    textAnchor: "middle",
                    fill: "#ffffff",
                  }}
                />
              </XAxis>
              <YAxis dataKey="name" type="category" tick={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill="var(--neon-orange)" />
              <Bar dataKey="value2" fill="var(--neon-purple)" />
            </BarChart>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default FirstResults;
