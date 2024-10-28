import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
} from "recharts";

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
    { name: "Bayesian Type Based Reasoning", value: 2.929 },
    { name: "First by Stein and Rapoport", value: 2.651 },
    { name: "First by Grofman", value: 2.578 },
    { name: "Tit For Tat", value: 2.566 },
    { name: "First by Shubik", value: 2.552 },
    { name: "First by Tideman and Chieruzzi", value: 2.503 },
    { name: "First by Nydegger", value: 2.503 },
    { name: "Grudger", value: 2.452 },
    { name: "First by Davis", value: 2.451 },
    { name: "First by Downing", value: 2.223 },
    { name: "First by Graaskamp", value: 2.166 },
    { name: "First by Feld", value: 2.027 },
    { name: "First by Joss", value: 1.945 },
    { name: "First by Tullock", value: 1.727 },
    { name: "First by Anonymous", value: 1.609 },
    { name: "Random", value: 1.525 },
  ];

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
            background: "rgba(0, 0, 0, 0.66)",
            padding: "5px",
          }}
        >
          <h3 className="heading" style={{ textAlign: "center" }}>
            Results: Full Coverage Prior
          </h3>
          <BarChart
            width={dimensions.width * 0.8}
            height={dimensions.width * 0.4}
            data={data}
            layout="vertical"
            margin={{
              top: 5,
              right: 30,
              left: 60,
              bottom: 35,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              tickSize={8}
              tickMargin={8} // Add space between ticks and labels
            >
              <Label
                value="Median Score Per Round"
                position="bottom"
                offset={0} // Distance from the axis
                style={{
                  textAnchor: "middle",
                  fill: "var(--neon-orange)", // Using a CSS color instead of var()
                }}
              />
            </XAxis>
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default FirstResults;
