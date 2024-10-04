import React, { useState, useEffect } from "react";
import { Stage, Layer, Rect, Text, Arrow, Line, Image } from "react-konva";
import { Tooltip } from "@mui/material";
import useImage from "use-image";

interface MDPsProps {
  // Define the props for the component here
}

const MDPs: React.FC<MDPsProps> = () => {
  const [showActionTooltip, setShowActionTooltip] = useState(false);
  const [showEnvTooltip, setShowEnvTooltip] = useState(false);
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

  const stageWidth = dimensions.width * 1;
  const stageHeight = dimensions.height * 1;

  // Determine Agent box params
  const agentWidth = Math.min(
    Math.max(stageWidth * 0.225, 135),
    dimensions.height * 0.375
  );
  const agentHeight = Math.min(
    Math.max(agentWidth / 3.1, 55),
    dimensions.height * 0.125
  );
  const agentX = (stageWidth - agentWidth) / 2;
  // const agentY = 66.7;
  const agentY =
    dimensions.height < 444
      ? 70
      : Math.max(
          dimensions.height * 0.2,
          Math.max(dimensions.height * 0.09, 60) +
            agentHeight +
            Math.min(stageWidth * 0.02, 10)
        );

  // Determine Environment box params
  const envWidth = agentWidth;
  const envHeight = agentHeight;
  const envX = (stageWidth - envWidth) / 2;
  const envY = agentY + envHeight + 0.8 * agentHeight;

  // Set arrow params
  const pointerWidth = Math.min(stageWidth * 0.02, 10);
  const pointerLength = pointerWidth;
  const arrowTextHeight = 50;
  const arrowTextWidth = 100;
  // Arrow 1
  const arrow1_p1_x = agentX + agentWidth;
  const arrow1_p1_y = agentY + 0.5 * agentHeight;
  const arrow1_p2_x = agentX + 1.4 * agentWidth;
  const arrow1_p2_y = agentY + 0.5 * agentHeight;
  const arrow1_p3_x = arrow1_p2_x;
  const arrow1_p3_y = envY + 0.5 * envHeight;
  const arrow1_p4_x = envX + envWidth;
  const arrow1_p4_y = envY + 0.5 * envHeight;
  // Arrow 2
  const arrow2_p1_y = envY + 0.5 * envHeight;
  const arrow2_p2_x = envX - 0.55 * agentWidth;
  const arrow2_p2_y = arrow2_p1_y;
  const arrow2_p3_x = arrow2_p2_x;
  const arrow2_p3_y =
    (agentY + 0.5 * agentHeight + (envY + 0.5 * envHeight)) / 2;
  // Arrow 3
  const arrow3_p1_x = arrow2_p3_x;
  const arrow3_p1_y = arrow2_p3_y;
  const arrow3_p2_x = arrow3_p1_x;
  const arrow3_p2_y = agentY + 0.5 * agentHeight;
  const arrow3_p3_x = agentX;
  const arrow3_p3_y = arrow3_p2_y;
  // Arrow 4
  const arrow4_p1_y = envY + 0.5 * envHeight;
  const arrow4_p2_x = envX - 0.4 * agentWidth;
  const arrow4_p2_y = arrow4_p1_y;
  const arrow4_p3_x = arrow4_p2_x;
  const arrow4_p3_y =
    (agentY + 0.5 * agentHeight + (envY + 0.5 * envHeight)) / 2;
  // Arrow 5
  const arrow5_p1_x = arrow4_p3_x;
  const arrow5_p1_y = arrow4_p3_y;
  const arrow5_p2_x = arrow5_p1_x;
  const arrow5_p2_y = agentY + 0.5 * agentHeight;
  const arrow5_p3_x = agentX;
  const arrow5_p3_y = arrow5_p2_y;
  // Set font sizes
  const labelFontSize =
    dimensions.width < 444 ? agentWidth * 0.09 : agentWidth * 0.095;
  const arrowFontSize = agentWidth * 0.075;
  const textOffset = pointerWidth;

  // Explainer text
  const explainerSpacing =
    dimensions.height < 444 || dimensions.height * 1.5 < dimensions.width
      ? "\n\n"
      : "\n\n\n";
  const explainerText = `• The agent interacts with the environment${explainerSpacing}• Observes the result of those actions${explainerSpacing}• Receives a reward based on the result of the action${explainerSpacing}• Uses those rewards to inform future decisions${explainerSpacing}• Next state depends only on the current state and action${explainerSpacing}• Agent balances discovering the results of new actions (exploration) and using known high-reward actions (exploitation)`;

  const explainerFontSize =
    dimensions.width < 444
      ? (labelFontSize + arrowFontSize) / 1.9
      : (labelFontSize + arrowFontSize) / 2.5;

  // Agent underline
  const agentLineY = agentY + 0.5 * agentHeight + 0.4 * labelFontSize;
  const agentLineX1 = agentX + 0.5 * agentWidth - 1.5 * labelFontSize;
  const agentLineX2 = agentX + 0.5 * agentWidth + 1.5 * labelFontSize;
  const agentTooltipText =
    "The entity that autonomously interacts with an environment. Its objective is to learn a policy for choosing actions to maximize cumulative reward over time.";

  // Environment underline
  const envLineY = envY + 0.5 * envHeight + 0.4 * labelFontSize;
  const envLineX1 = envX + 0.5 * envWidth - 3 * labelFontSize;
  const envLineX2 = envX + 0.5 * envWidth + 3 * labelFontSize;
  const envTooltipText =
    "The external system the agent observes and interacts with. It provides states and rewards, and responds to the agent's actions.";

  // Load in images
  const [RLAgentImage] = useImage("./images/RL_agent.png");
  const [TreeImage] = useImage("./images/tree.png");

  // Image Params
  // Agent
  let agentImageY;
  let agentImageX;
  let agentImageDim;
  let agentImageMulti;

  // Tree
  let treeImageY;
  let treeImageX;
  let treeImageDim;
  let treeImageMulti;

  if (Math.min(dimensions.width, dimensions.height) > 444) {
    // Agent
    agentImageMulti = 0.75;
    agentImageDim = agentHeight * agentImageMulti;
    agentImageX =
      agentX +
      agentWidth -
      agentImageDim -
      ((1 - agentImageMulti) / 2) * agentHeight;

    // Tree
    treeImageMulti = 0.75;
    treeImageDim = envHeight * treeImageMulti;
    treeImageX =
      envX + envWidth - treeImageDim + ((1 - treeImageMulti) / 4) * envHeight;
  } else {
    // Agent
    agentImageMulti = 0.65;
    agentImageDim = agentHeight * agentImageMulti;
    agentImageX =
      agentX +
      agentWidth -
      agentImageDim -
      ((1 - agentImageMulti) / 4) * agentHeight;

    // Tree
    treeImageMulti = 0.6;
    treeImageDim = envHeight * treeImageMulti;
    treeImageX =
      envX +
      envWidth -
      treeImageDim -
      ((1 - treeImageMulti) / 2) * envHeight +
      10;
  }
  agentImageY = agentY + ((1 - agentImageMulti) / 2) * agentHeight;
  treeImageY = envY + ((1 - treeImageMulti) / 3) * envHeight;

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
      <Tooltip
        title={agentTooltipText}
        open={showActionTooltip}
        placement="top"
      >
        <div
          style={{
            position: "absolute",
            top: agentY + 0.25 * agentHeight,
            left: agentX,
            height: agentHeight,
            width: agentWidth,
          }}
        />
      </Tooltip>
      <Tooltip title={envTooltipText} open={showEnvTooltip} placement="top">
        <div
          style={{
            position: "absolute",
            top: envY + 0.5 * envHeight,
            left: envX,
            height: envHeight,
            width: envWidth,
          }}
        />
      </Tooltip>
      <Stage width={stageWidth} height={stageHeight}>
        <Layer>
          {stageHeight > 444 && (
            <>
              <Rect
                x={(stageWidth - 2 * agentWidth) / 2}
                y={Math.max(dimensions.height * 0.09, 60)}
                width={2 * agentWidth}
                height={agentHeight}
                cornerRadius={agentHeight / 6}
                fill="#b85959"
                shadowBlur={25}
                shadowColor="lightblue"
              />
              <Text
                text="Markov Decision Process (MDP)"
                x={(stageWidth - 2 * agentWidth) / 2}
                y={Math.max(dimensions.height * 0.09, 60)}
                width={2 * agentWidth}
                height={agentHeight}
                fontSize={1.8 * labelFontSize}
                fontFamily="SpaceGrotesk"
                align="center"
                verticalAlign="middle"
                letterSpacing={2}
                fill="white"
              />
            </>
          )}
          {/* Agent rectangle */}
          <Rect
            x={agentX}
            y={agentY}
            width={agentWidth}
            height={agentHeight}
            cornerRadius={agentHeight / 6}
            fill="lightblue"
            shadowBlur={25}
            shadowColor="#b85959"
          />
          <Text
            text="Agent"
            x={agentX}
            y={agentY}
            width={agentWidth}
            height={agentHeight}
            fontSize={labelFontSize}
            fontFamily="SpaceGrotesk"
            align="center"
            verticalAlign="middle"
            onMouseEnter={() => setShowActionTooltip(true)}
            onMouseLeave={() => setShowActionTooltip(false)}
            onTouchStart={() => setShowActionTooltip(true)}
            onTouchEnd={() => setShowActionTooltip(false)}
          />
          <Image
            x={agentImageX}
            y={agentImageY}
            width={agentImageDim}
            height={agentImageDim}
            image={RLAgentImage}
          />
          <Line
            points={[agentLineX1, agentLineY, agentLineX2, agentLineY]}
            stroke="black"
            strokeWidth={1}
            dash={[1]}
          />
          {/* Environment rectangle */}
          <Rect
            x={envX}
            y={envY}
            width={envWidth}
            height={envHeight}
            cornerRadius={envHeight / 6}
            fill="lightblue"
            shadowBlur={25}
            shadowColor="#b85959"
          />
          <Text
            text="Environment"
            x={envX}
            y={envY}
            width={envWidth}
            height={envHeight}
            fontSize={labelFontSize}
            fontFamily="SpaceGrotesk"
            align="center"
            verticalAlign="middle"
            onMouseEnter={() => setShowEnvTooltip(true)}
            onMouseLeave={() => setShowEnvTooltip(false)}
            onTouchStart={() => setShowEnvTooltip(true)}
            onTouchEnd={() => setShowEnvTooltip(false)}
          />
          <Image
            x={treeImageX}
            y={treeImageY}
            width={treeImageDim}
            height={treeImageDim}
            image={TreeImage}
          />
          <Line
            points={[envLineX1, envLineY, envLineX2, envLineY]}
            stroke="black"
            strokeWidth={1}
            dash={[1]}
          />
          {/* Agent to enviornment arrow */}
          <Arrow
            points={[
              arrow1_p1_x,
              arrow1_p1_y,
              arrow1_p2_x,
              arrow1_p2_y,
              arrow1_p3_x,
              arrow1_p3_y,
              arrow1_p4_x,
              arrow1_p4_y,
            ]}
            pointerLength={pointerLength}
            pointerWidth={pointerWidth}
            fill="black"
            stroke="black"
            strokeWidth={2}
            tension={0}
            shadowBlur={5}
            shadowColor="#ffffff"
          />
          <Text
            text={"Action\nA_t"}
            x={arrow1_p2_x + textOffset}
            y={
              (agentY + 0.5 * agentHeight + (envY + 0.5 * envHeight)) / 2 -
              arrowTextHeight / 2
            }
            height={arrowTextHeight}
            width={arrowTextWidth}
            fontSize={arrowFontSize}
            fontFamily="SpaceGrotesk"
            align="left"
            verticalAlign="middle"
            shadowBlur={5}
            shadowColor="#ffffff"
          />
          {/* Env to agent arrows */}
          <Arrow
            points={[
              envX,
              arrow2_p1_y,
              arrow2_p2_x,
              arrow2_p2_y,
              arrow2_p3_x,
              arrow2_p3_y,
            ]}
            pointerLength={pointerLength}
            pointerWidth={pointerWidth}
            fill="black"
            stroke="black"
            strokeWidth={2}
            tension={0}
            shadowBlur={5}
            shadowColor="#ffffff"
          />
          <Text
            text={"State\nS_t+1"}
            x={arrow2_p2_x - arrowTextWidth - textOffset}
            y={(arrow2_p2_y + arrow2_p3_y) / 2 - arrowTextHeight / 2}
            height={arrowTextHeight}
            width={arrowTextWidth}
            fontSize={arrowFontSize}
            fontFamily="SpaceGrotesk"
            align="right"
            verticalAlign="middle"
            shadowBlur={5}
            shadowColor="#ffffff"
          />
          <Arrow
            points={[
              arrow3_p1_x,
              arrow3_p1_y,
              arrow3_p2_x,
              arrow3_p2_y,
              arrow3_p3_x,
              arrow3_p3_y,
            ]}
            pointerLength={pointerLength}
            pointerWidth={pointerWidth}
            fill="black"
            stroke="black"
            strokeWidth={2}
            tension={0}
            shadowBlur={5}
            shadowColor="#ffffff"
          />
          <Text
            text={"State\nS_t"}
            x={arrow2_p2_x - arrowTextWidth - textOffset}
            y={(arrow3_p1_y + arrow3_p2_y) / 2 - arrowTextHeight / 2}
            height={arrowTextHeight}
            width={arrowTextWidth}
            fontSize={arrowFontSize}
            fontFamily="SpaceGrotesk"
            align="right"
            verticalAlign="middle"
            shadowBlur={5}
            shadowColor="#ffffff"
          />
          <Arrow
            points={[
              envX,
              arrow4_p1_y,
              arrow4_p2_x,
              arrow4_p2_y,
              arrow4_p3_x,
              arrow4_p3_y,
            ]}
            pointerLength={pointerLength}
            pointerWidth={pointerWidth}
            fill="black"
            stroke="black"
            strokeWidth={2}
            tension={0}
            shadowBlur={5}
            shadowColor="#ffffff"
          />
          <Text
            text={"Reward\nR_t+1"}
            x={arrow4_p2_x + textOffset}
            y={(arrow4_p2_y + arrow4_p3_y) / 2 - arrowTextHeight / 2}
            height={arrowTextHeight}
            width={arrowTextWidth}
            fontSize={arrowFontSize}
            fontFamily="SpaceGrotesk"
            align="left"
            verticalAlign="middle"
            shadowBlur={5}
            shadowColor="#ffffff"
          />
          <Arrow
            points={[
              arrow5_p1_x,
              arrow5_p1_y,
              arrow5_p2_x,
              arrow5_p2_y,
              arrow5_p3_x,
              arrow5_p3_y,
            ]}
            pointerLength={pointerLength}
            pointerWidth={pointerWidth}
            fill="black"
            stroke="black"
            strokeWidth={2}
            tension={0}
            shadowBlur={5}
            shadowColor="#ffffff"
          />
          <Text
            text={"Reward\nR_t"}
            x={arrow4_p2_x + textOffset}
            y={(arrow5_p1_y + arrow5_p2_y) / 2 - arrowTextHeight / 2}
            height={arrowTextHeight}
            width={arrowTextWidth}
            fontSize={arrowFontSize}
            fontFamily="SpaceGrotesk"
            align="left"
            verticalAlign="middle"
            shadowBlur={5}
            shadowColor="#ffffff"
          />
          <Rect
            // x={
            //   dimensions.width < 444
            //     ? arrow3_p2_x - 4 * textOffset
            //     : arrow3_p2_x - 5.75 * textOffset
            // }
            x={dimensions.width / 2 - (2 * textOffset + agentWidth * 2.55) / 2}
            y={
              dimensions.width < 444
                ? envY + envHeight + 6 * textOffset
                : envY + envHeight + 2 * textOffset
            }
            height={
              (dimensions.height < 444 ||
              dimensions.height * 1.5 < dimensions.width
                ? agentHeight * 2.5
                : dimensions.width < 444
                ? agentHeight * 3.8
                : agentHeight * 3.55) +
              2 * textOffset
            }
            width={2 * textOffset + agentWidth * 2.55}
            cornerRadius={envHeight / 6}
            fill="#ffffff"
            opacity={0.25}
          />
          <Text
            text={explainerText}
            // x={
            //   dimensions.width < 444
            //     ? arrow3_p2_x - 3 * textOffset
            //     : arrow3_p2_x - 4.75 * textOffset
            // }
            x={
              textOffset +
              dimensions.width / 2 -
              (2 * textOffset + agentWidth * 2.55) / 2
            }
            y={
              dimensions.width < 444
                ? envY + envHeight + 7 * textOffset
                : envY + envHeight + 3 * textOffset
            }
            height={
              dimensions.height < 444 ||
              dimensions.height * 1.5 < dimensions.width
                ? agentHeight * 2.825
                : agentHeight * 3.9
            }
            width={agentWidth * 2.55}
            fontFamily="SpaceGrotesk"
            wrap="word"
            fontSize={explainerFontSize}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default MDPs;
