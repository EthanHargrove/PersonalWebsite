import React, { useState, useEffect } from "react";
import { Stage, Layer, Rect, Text, Arrow, Line } from "react-konva";
import { Tooltip } from "@mui/material";

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
  const stageHeight = dimensions.height * 0.9;

  // Determine Agent box params
  const agentWidth = Math.max(stageWidth * 0.225, 110);
  const agentHeight = Math.max(agentWidth / 3, 55);
  const agentX = (stageWidth - agentWidth) / 2;
  const agentY = 66.7;

  // Determine Environment box params
  const envWidth = Math.max(stageWidth * 0.225, 110);
  const envHeight = Math.max(envWidth / 3, 55);
  const envX = (stageWidth - envWidth) / 2;
  const envY = agentY + envHeight + agentHeight;

  // Set arrow params
  const pointerWidth = Math.min(stageWidth * 0.02, 10);
  const pointerLength = pointerWidth;
  const arrowTextHeight = 50;
  const arrowTextWidth = 100;
  // Arrow 1
  const arrow1_p1_x = agentX + agentWidth;
  const arrow1_p1_y = agentY + 0.5 * agentHeight;
  const arrow1_p2_x = agentX + 1.45 * agentWidth;
  const arrow1_p2_y = agentY + 0.5 * agentHeight;
  const arrow1_p3_x = agentX + 1.45 * agentWidth;
  const arrow1_p3_y = envY + 0.5 * envHeight;
  const arrow1_p4_x = envX + envWidth;
  const arrow1_p4_y = envY + 0.5 * envHeight;
  // Arrow 2
  const arrow2_p1_y = envY + 0.5 * envHeight;
  const arrow2_p2_x = envX - 0.65 * agentWidth;
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
  const arrow4_p2_x = envX - 0.45 * agentWidth;
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
  const labelFontSize = agentWidth * 0.1;
  const arrowFontSize = agentWidth * 0.075;
  const textOffset = pointerWidth;

  // Explainer text
  const explainerText =
    "• The agent interacts with the environment\n\n\n• Observes the result of those actions\n\n\n• Receives a reward based on the result of the action\n\n\n• Uses those rewards to inform future decisions\n\n\n";
  const explainerFontSize = (labelFontSize + arrowFontSize) / 2;

  // Agent underline
  const agentLineY = agentY + 0.5 * agentHeight + 0.4 * labelFontSize;
  const agentLineX1 = agentX + 0.5 * agentWidth - 1.5 * labelFontSize;
  const agentLineX2 = agentX + 0.5 * agentWidth + 1.5 * labelFontSize;
  const agentTooltipText =
    "The entity that autonomously interacts with an environment. Its objective is to learn a policy for choosing actions to maximise cumulative reward over time.";

  // Environment underline
  const envLineY = envY + 0.5 * envHeight + 0.4 * labelFontSize;
  const envLineX1 = envX + 0.5 * envWidth - 3 * labelFontSize;
  const envLineX2 = envX + 0.5 * envWidth + 3 * labelFontSize;
  const envTooltipText =
    "The external system the agent observes and interacts with. It provides states and rewards, and responds to the agent's actions.";

  return (
    <div className="section" style={{ background: "#ffffff" }}>
      <Tooltip
        title={agentTooltipText}
        open={showActionTooltip}
        placement="bottom"
      >
        <div
          style={{
            position: "absolute",
            top: agentY + 0.5 * agentHeight,
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
          {/* Agent rectangle */}
          <Rect
            x={agentX}
            y={agentY}
            width={agentWidth}
            height={agentHeight}
            cornerRadius={agentHeight / 6}
            fill="lightblue"
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
          />
          <Text
            text={explainerText}
            x={arrow3_p2_x}
            y={envY + envHeight + 5 * textOffset}
            height={stageHeight}
            width={stageWidth}
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
