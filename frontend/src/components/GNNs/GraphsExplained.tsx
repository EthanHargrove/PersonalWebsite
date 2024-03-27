import React, { useState } from "react";
import { Stage, Layer, Circle, Line, Arrow, Text } from "react-konva";
// import { useSpring, animated } from "react-spring";
// import { Link } from "react-router-dom";
import { Grid, Stack } from "@mui/material";
// import { styled } from "@mui/system";

// interface SkillsCardProps {
//   background: string;
//   imgBackground?: string | undefined;
//   textColour: string;
//   imagen: string;
//   title: string;
// }

function GraphsExplained() {
  const [selectedNode, setSelectedNode] = useState<number | undefined>(
    undefined
  );
  const [directed, setDirected] = useState<boolean>(true);

  const nodes = [
    { id: 1, x: 100, y: 100 },
    { id: 2, x: 200, y: 200 },
    { id: 3, x: 300, y: 100 },
    { id: 4, x: 400, y: 200 },
  ];

  const edges = [
    { source: 1, target: 2 },
    { source: 2, target: 3 },
    { source: 3, target: 4 },
  ];

  const radius = 25;
  const strokeWidth = 5;
  const pointerWidth = 12;

  const getEdgePoint = (node: any, targetNode: any) => {
    const dx = targetNode.x - node.x;
    const dy = targetNode.y - node.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const ratio = radius / distance;
    return {
      x: node.x + dx * ratio,
      y: node.y + dy * ratio,
    };
  };

  return (
    <div className="section" style={{ background: "#ffffff" }}>
      <h2 className="heading">What is a Graph?</h2>
      <ul>
        <li>
          A set of objects (Nodes) and relationships between the objects
          (Edges).
        </li>
      </ul>
      <Grid container spacing={0}>
        <Grid item xs={12} md={6}>
          <Stage width={600} height={400}>
            <Layer>
              {edges.map((edge, index) => {
                const sourceNode = nodes.find(
                  (node) => node.id === edge.source
                );
                const targetNode = nodes.find(
                  (node) => node.id === edge.target
                );

                if (sourceNode && targetNode && directed) {
                  const sourceEdgePoint = getEdgePoint(sourceNode, targetNode);
                  const targetEdgePoint = getEdgePoint(targetNode, sourceNode);
                  return (
                    <Arrow
                      key={index}
                      points={[
                        targetEdgePoint.x,
                        targetEdgePoint.y,
                        sourceEdgePoint.x,
                        sourceEdgePoint.y,
                      ]}
                      stroke="black"
                      strokeWidth={strokeWidth}
                      fill="black"
                      pointerLength={pointerWidth}
                      pointerWidth={pointerWidth}
                    />
                  );
                } else if (sourceNode && targetNode) {
                  return (
                    <Arrow
                      key={index}
                      points={[
                        sourceNode.x,
                        sourceNode.y,
                        targetNode.x,
                        targetNode.y,
                      ]}
                      stroke="black"
                      strokeWidth={strokeWidth}
                      fill="black"
                      pointerLength={pointerWidth}
                      pointerWidth={pointerWidth}
                    />
                  );
                }
              })}
              {nodes.map((node) => (
                <React.Fragment key={node.id}>
                  <Circle
                    x={node.x}
                    y={node.y}
                    radius={radius}
                    fill={node.id === selectedNode ? "red" : "black"}
                    onClick={() => setSelectedNode(node.id)}
                    onMouseEnter={() => setSelectedNode(node.id)}
                    onMouseLeave={() => setSelectedNode(undefined)}
                  />
                  <Text
                    x={node.x - 4}
                    y={node.y - 5}
                    text={node.id.toString()}
                    fill="white"
                  />
                </React.Fragment>
              ))}
            </Layer>
          </Stage>
        </Grid>
        <Grid item xs={12} md={1}>
          <h1>h1</h1>
        </Grid>
      </Grid>
    </div>
  );
}

export default GraphsExplained;
