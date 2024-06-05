import React, { useState, useEffect } from "react";
import { Stage, Layer, Rect, Text, Arrow } from "react-konva";

interface MDPsProps {
  // Define the props for the component here
}

const MDPs: React.FC<MDPsProps> = () => {
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

  // Determine Agent box params
  const agentWidth = Math.max(stageWidth * 0.2, 200);
  const agentHeight = Math.max(agentWidth / 4, 100);
  const agentX = (stageWidth - agentWidth) / 2;
  const agentY = 100;

  // Determine Environment box params
  const envWidth = Math.max(stageWidth * 0.2, 200);
  const envHeight = Math.max(envWidth / 4, 100);
  const envX = (stageWidth - envWidth) / 2;
  const envY = agentY + envHeight + agentHeight;

  // Set arrow params
  const arrowTextHeight = 50;
  const arrowTextWidth = 100;
  // Arrow 2
  const arrow2_p1_y = envY + 0.5 * envHeight;
  const arrow2_p2_x = envX - 0.75 * agentWidth;
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
  const arrow4_p2_x = envX - 0.5 * agentWidth;
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

  return (
    <div className="section" style={{ background: "#ffffff" }}>
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
          />
          {/* Agent to enviornment arrow */}
          <Arrow
            points={[
              agentX + agentWidth,
              agentY + 0.5 * agentHeight,
              agentX + 1.5 * agentWidth,
              agentY + 0.5 * agentHeight,
              agentX + 1.5 * agentWidth,
              envY + 0.5 * envHeight,
              envX + envWidth,
              envY + 0.5 * envHeight,
            ]}
            pointerLength={10}
            pointerWidth={10}
            fill="black"
            stroke="black"
            strokeWidth={2}
            tension={0}
          />
          <Text
            text={"Action\nA_t"}
            x={agentX + 1.5 * agentWidth + 10}
            y={
              (agentY + 0.5 * agentHeight + (envY + 0.5 * envHeight)) / 2 -
              arrowTextHeight / 2
            }
            height={arrowTextHeight}
            width={arrowTextWidth}
            fontSize={labelFontSize}
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
            pointerLength={10}
            pointerWidth={10}
            fill="black"
            stroke="black"
            strokeWidth={2}
            tension={0}
          />
          <Text
            text={"State\nS_t+1"}
            x={arrow2_p2_x - arrowTextWidth - 10}
            y={(arrow2_p2_y + arrow2_p3_y) / 2 - arrowTextHeight / 2}
            height={arrowTextHeight}
            width={arrowTextWidth}
            fontSize={labelFontSize}
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
            pointerLength={10}
            pointerWidth={10}
            fill="black"
            stroke="black"
            strokeWidth={2}
            tension={0}
          />
          <Text
            text={"State\nS_t"}
            x={arrow2_p2_x - arrowTextWidth - 10}
            y={(arrow3_p1_y + arrow3_p2_y) / 2 - arrowTextHeight / 2}
            height={arrowTextHeight}
            width={arrowTextWidth}
            fontSize={labelFontSize}
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
            pointerLength={10}
            pointerWidth={10}
            fill="black"
            stroke="black"
            strokeWidth={2}
            tension={0}
          />
          <Text
            text={"Reward\nR_t+1"}
            x={arrow4_p2_x + 10}
            y={(arrow4_p2_y + arrow4_p3_y) / 2 - arrowTextHeight / 2}
            height={arrowTextHeight}
            width={arrowTextWidth}
            fontSize={labelFontSize}
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
            pointerLength={10}
            pointerWidth={10}
            fill="black"
            stroke="black"
            strokeWidth={2}
            tension={0}
          />
          <Text
            text={"Reward\nR_t"}
            x={arrow4_p2_x + 10}
            y={(arrow5_p1_y + arrow5_p2_y) / 2 - arrowTextHeight / 2}
            height={arrowTextHeight}
            width={arrowTextWidth}
            fontSize={labelFontSize}
            fontFamily="SpaceGrotesk"
            align="left"
            verticalAlign="middle"
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default MDPs;
