import React, { useState, useEffect } from "react";
// import { useSpring, animated } from "react-spring";
// import { Link } from "react-router-dom";
import { Grid, Stack } from "@mui/material";
import {
  Stage,
  Layer,
  Circle,
  Line,
  Arrow,
  Text,
  Rect,
  Image,
} from "react-konva";
import useImage from "use-image";
// import { styled } from "@mui/system";

function IntroToRL() {
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

  const stageWidth = dimensions.width * 0.9;
  const stageHeight = dimensions.height * 0.9;
  const rectWidth = Math.max(stageWidth * 0.45, 275);
  const rectHeight = rectWidth / 5;
  const cornerRadius = rectHeight / 7;
  const rectX = (stageWidth - rectWidth) / 2;
  const rectY = 50;
  const fontSize = rectWidth * 0.1;

  // Circle properties
  const [image1] = useImage("./images/supervised_learning.png");
  const [image2] = useImage("./images/tic-tac-toe.png");
  const [image3] = useImage("./images/tic-tac-toe.png");

  const circleRadius = Math.min(stageHeight, stageWidth) * 0.11; // 5% of the smaller window dimension
  const circleY = rectY + rectHeight + circleRadius * 2;
  const circleSpacing = rectWidth / 8;
  const circles = [
    { x: rectX + circleSpacing, image: image1 },
    { x: rectX + rectWidth / 2, image: image2 },
    { x: rectX + rectWidth - circleSpacing, image: image3 },
  ];

  const getControlPoints = (x1: number, y1: number, x2: number, y2: number) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return [
      { x: x1 + dx * 0.05, y: y1 + dy * 0.4 }, // First control point (curve outward)
      { x: x1 + dx * 0.8, y: y1 + dy * 0.4 }, // Second control point (curve outward)
    ];
  };

  return (
    <div className="section" style={{ background: "#ffffff" }}>
      <Stage width={stageWidth} height={stageHeight}>
        <Layer>
          <Rect
            x={rectX}
            y={rectY}
            width={rectWidth}
            height={rectHeight}
            cornerRadius={cornerRadius}
            fill="lightblue"
            shadowBlur={5}
          />
          <Text
            x={rectX}
            y={rectY}
            width={rectWidth}
            height={rectHeight}
            text="Machine Learning"
            fontSize={fontSize}
            fontFamily="SpaceGrotesk"
            fill="black"
            align="center"
            verticalAlign="middle"
          />
          {circles.map((circle, index) => {
            const controlPoints = getControlPoints(
              rectX + rectWidth / 2,
              rectY + rectHeight,
              circle.x,
              circleY - circleRadius
            );
            return (
              <React.Fragment key={index}>
                <Circle
                  x={circle.x}
                  y={circleY}
                  radius={circleRadius}
                  fill="white"
                  shadowBlur={5}
                />
                <Image
                  x={circle.x - circleRadius}
                  y={circleY - circleRadius}
                  width={circleRadius * 2}
                  height={circleRadius * 2}
                  image={circle.image}
                  cornerRadius={circleRadius}
                />
                <Arrow
                  points={[
                    rectX + rectWidth / 2,
                    rectY + rectHeight, // Start point
                    controlPoints[0].x,
                    controlPoints[0].y, // First control point
                    controlPoints[1].x,
                    controlPoints[1].y, // Second control point
                    circle.x,
                    circleY -
                      circleRadius -
                      Math.min(stageHeight, stageWidth) * 0.015, // End point
                  ]}
                  pointerLength={10}
                  pointerWidth={10}
                  fill="black"
                  stroke="black"
                  strokeWidth={2}
                  tension={0.5}
                />
              </React.Fragment>
            );
          })}
        </Layer>
      </Stage>
      {/* <h1>Machine Learning</h1>
      <ul>
        <li>
          Reinforcement Learning (RL) is one of the three main machine learning
          paradigms, alongside supervised learning and unsupervised learning.
        </li>
        <li>
          It is used to solve control problems, where learning is achieved
          through trial and error.
        </li>
      </ul> */}
    </div>
  );
}

export default IntroToRL;

// const IntroToRL = () => {
//   return (
//     <div className="section" style={styles.container}>
//       <h1 style={styles.title}>Introduction to Reinforcement Learning</h1>
//       <section style={styles.section}>
//         <h2 style={styles.subtitle}>What is Reinforcement Learning?</h2>
//         <p style={styles.text}>
//           Reinforcement Learning (RL) is a type of machine learning where an
//           agent learns to make decisions by performing actions in an environment
//           to maximize cumulative rewards.
//         </p>
//       </section>
//       <section style={styles.section}>
//         <h2 style={styles.subtitle}>Key Concepts</h2>
//         <ul style={styles.list}>
//           <li style={styles.listItem}>
//             <strong>Agent:</strong> The learner or decision-maker.
//           </li>
//           <li style={styles.listItem}>
//             <strong>Environment:</strong> The external system the agent
//             interacts with.
//           </li>
//           <li style={styles.listItem}>
//             <strong>State:</strong> A representation of the current situation.
//           </li>
//           <li style={styles.listItem}>
//             <strong>Action:</strong> Choices available to the agent.
//           </li>
//           <li style={styles.listItem}>
//             <strong>Reward:</strong> Feedback from the environment.
//           </li>
//         </ul>
//       </section>
//       <section style={styles.section}>
//         <h2 style={styles.subtitle}>Objective</h2>
//         <p style={styles.text}>
//           The main objective of reinforcement learning is to learn optimal
//           policies that maximize cumulative rewards over time.
//         </p>
//       </section>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     fontFamily: "Arial, sans-serif",
//     padding: "20px",
//     maxWidth: "800px",
//     margin: "0 auto",
//     backgroundColor: "#f4f4f4",
//     borderRadius: "10px",
//     boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
//   },
//   title: {
//     color: "#333",
//   },
//   section: {
//     marginBottom: "20px",
//   },
//   subtitle: {
//     color: "#666",
//     fontSize: "20px",
//     borderBottom: "1px solid #ddd",
//     paddingBottom: "5px",
//     marginBottom: "10px",
//   },
//   text: {
//     color: "#333",
//     fontSize: "16px",
//     lineHeight: "1.6",
//   },
//   list: {
//     listStyleType: "none",
//     padding: "0",
//   },
//   listItem: {
//     color: "#333",
//     fontSize: "16px",
//     marginBottom: "5px",
//   },
// };

// export default IntroToRL;
