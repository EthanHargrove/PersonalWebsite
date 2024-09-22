import React, { useState, useEffect } from "react";
import { Stage, Layer, Circle, Arrow, Text, Rect, Image } from "react-konva";
import useImage from "use-image";

import PlayAgainstAI from "./PlayAgainstAI";

interface IntroToMLProps {
  defaultParadigm: string;
}
function IntroToML({ defaultParadigm }: IntroToMLProps) {
  const [currentParadigm, setCurrentParadigm] = useState(defaultParadigm);
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
  const rectWidth = Math.min(
    Math.max(stageWidth * 0.5, 260),
    dimensions.height * 0.65
  );
  const rectHeight = rectWidth / 5;
  const cornerRadius = rectHeight / 7;
  const rectX = (stageWidth - rectWidth) / 2;
  const rectY =
    dimensions.width < 444
      ? dimensions.height * 0.125
      : dimensions.height * 0.1;
  const fontSize = rectWidth * 0.075;
  const letterSpacing = fontSize * 0.15;

  // Circle properties
  const [image1] = useImage("./images/supervised_learning.png");
  const [image2] = useImage("./images/unsupervised_learning.png");
  const [image3] = useImage("./images/reinforcement_learning.png");

  const circleRadius = Math.max(
    Math.min(dimensions.width * 0.055, dimensions.height * 0.085),
    dimensions.height * 0.05
  );
  const circleY =
    dimensions.width > 444
      ? rectY + rectHeight + circleRadius * 1.9
      : rectY + rectHeight + dimensions.height * 0.135;
  const circleSpacing = dimensions.width > 444 ? rectWidth / 8 : 20;
  const circles = [
    {
      x: rectX + circleSpacing,
      image: image1,
      title: "Supervised\nLearning",
      displayInfo: currentParadigm === "Supervised\nLearning",
      infoText:
        "• Trained on labelled data\n\n\n• Model learns the relationship between inputs and outputs by identifying patterns in the training data\n\n\n• Once trained, the model can predict outputs for new, unseen inputs",
    },
    {
      x: rectX + rectWidth / 2,
      image: image2,
      title: "Unsupervised\nLearning",
      displayInfo: currentParadigm === "Unsupervised\nLearning",
      infoText:
        "• Trained on unlabelled data\n\n\n• Model aims to identify patterns, structures, or relationships within the data\n\n\n• Often used for clustering, dimensionality reduction, and anomaly detection",
    },
    {
      x: rectX + rectWidth - circleSpacing,
      image: image3,
      title: "Reinforcement\nLearning",
      displayInfo: currentParadigm === "Reinforcement\nLearning",
      infoText:
        "• Learning from experience, through trial and error\n\n\n• An agent interacts with an environemnt, receives rewards based on actions taken, and uses those rewards to inform future decisions\n\n\n• Often used to solve complex control problems",
    },
  ];

  const getControlPoints = (x1: number, y1: number, x2: number, y2: number) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return [
      { x: x1 + dx * 0.05, y: y1 + dy * 0.4 }, // First control point (curve outward)
      { x: x1 + dx * 0.8, y: y1 + dy * 0.4 }, // Second control point (curve outward)
    ];
  };

  const titleFontSize = circleRadius * 0.27;
  const titleY = circleY + circleRadius * 1.1;
  const infoY =
    dimensions.width > 444
      ? titleY + 1.65 * circleRadius
      : titleY + 2.25 * circleRadius;

  return (
    <div className="section">
      <div
        className="blur-background"
        style={{
          backgroundImage:
            dimensions.width < 444
              ? "url(./images/NNPortrait.png)"
              : "url(./images/NNLandscape.png)",
        }}
      />
      <PlayAgainstAI dark={true} />
      <Stage width={stageWidth} height={stageHeight}>
        <Layer>
          <Rect
            x={rectX}
            y={rectY}
            width={rectWidth}
            height={rectHeight}
            cornerRadius={cornerRadius}
            fill="lightblue"
            shadowBlur={15}
            shadowColor="#b85959"
          />
          <Text
            x={rectX}
            y={rectY}
            width={rectWidth}
            height={rectHeight}
            text="Machine Learning"
            letterSpacing={letterSpacing}
            fontSize={fontSize}
            fontFamily="SpaceGrotesk"
            fill="black"
            align="center"
            verticalAlign="middle"
          />
          {circles.map((circle, index) => {
            let shadowBlur;
            let titleFontStyle;
            let shadowColour = "black";
            if (circle.displayInfo) {
              shadowBlur = 25;
              titleFontStyle = "500";
              shadowColour = "#b85959";
            } else {
              shadowBlur = 5;
            }
            const controlPoints = getControlPoints(
              rectX + rectWidth / 2,
              rectY + rectHeight,
              circle.x,
              circleY - circleRadius
            );
            return (
              <React.Fragment key={index}>
                {/* info background */}
                <Rect
                  x={rectX + circleSpacing - circleRadius - 10}
                  y={infoY - circleRadius * 0.725}
                  width={rectWidth - 2 * (circleSpacing - circleRadius - 10)}
                  height={circleRadius * 3.75}
                  cornerRadius={[
                    circle.title === "Supervised\nLearning" ? 0 : circleRadius,
                    circle.title === "Reinforcement\nLearning"
                      ? 0
                      : circleRadius,
                    circleRadius,
                    circleRadius,
                  ]}
                  fill={circle.displayInfo ? "#b85959" : ""}
                />
                {/* image background */}
                <Circle
                  x={circle.x}
                  y={circleY}
                  radius={circleRadius + 10}
                  fill={circle.displayInfo ? "#b85959" : ""}
                />
                {/* background connector */}
                <Rect
                  x={circle.x - circleRadius - 10}
                  y={circleY}
                  width={2 * circleRadius + 20}
                  height={circleRadius * 3.75}
                  fill={circle.displayInfo ? "#b85959" : ""}
                />
                <Image
                  x={circle.x - circleRadius}
                  y={circleY - circleRadius}
                  width={circleRadius * 2}
                  height={circleRadius * 2}
                  image={circle.image}
                  cornerRadius={circleRadius}
                  shadowColor={shadowColour}
                  shadowBlur={shadowBlur}
                  listening
                  onClick={() => setCurrentParadigm(circle.title)}
                  onTouchStart={() => setCurrentParadigm(circle.title)}
                  onMouseEnter={(e) => {
                    const container = e.target.getStage()!.container();
                    container.style.cursor = "pointer";
                    setCurrentParadigm(circle.title);
                  }}
                  onMouseLeave={(e) => {
                    const container = e.target.getStage()!.container();
                    container.style.cursor = "default";
                  }}
                />
                <Arrow
                  points={[
                    rectX + rectWidth / 2,
                    rectY + rectHeight,
                    controlPoints[0].x,
                    controlPoints[0].y,
                    controlPoints[1].x,
                    controlPoints[1].y,
                    circle.x,
                    circleY -
                      circleRadius -
                      5 -
                      Math.min(stageHeight, stageWidth) * 0.015,
                  ]}
                  pointerLength={10}
                  pointerWidth={10}
                  fill="black"
                  stroke="black"
                  strokeWidth={2}
                  tension={0.5}
                />
                {/* title */}
                <Text
                  x={circle.x - circleRadius - 10}
                  y={titleY}
                  text={circle.title}
                  width={2 * circleRadius + 18}
                  fontSize={titleFontSize}
                  fontFamily="SpaceGrotesk"
                  fontStyle={titleFontStyle}
                  wrap="word"
                  fill={currentParadigm === circle.title ? "white" : "black"}
                  shadowBlur={currentParadigm === circle.title ? 0 : 5}
                  shadowColor="#ffffff"
                  align="center"
                  verticalAlign="middle"
                  onClick={() => setCurrentParadigm(circle.title)}
                  onTouchStart={() => setCurrentParadigm(circle.title)}
                  onMouseEnter={(e) => {
                    const container = e.target.getStage()!.container();
                    container.style.cursor = "pointer";
                    setCurrentParadigm(circle.title);
                  }}
                  onMouseLeave={(e) => {
                    const container = e.target.getStage()!.container();
                    container.style.cursor = "default";
                  }}
                />
                {/* info text */}
                <Text
                  x={rectX + circleSpacing - circleRadius + 5}
                  y={infoY}
                  text={circle.displayInfo ? circle.infoText : ""}
                  width={
                    rectWidth - 2 * (circleSpacing - circleRadius - 10) - 20
                  }
                  fontSize={titleFontSize}
                  fontFamily="SpaceGrotesk"
                  wrap="word"
                  fill="white"
                  listening={false}
                />
              </React.Fragment>
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
}

export default IntroToML;
