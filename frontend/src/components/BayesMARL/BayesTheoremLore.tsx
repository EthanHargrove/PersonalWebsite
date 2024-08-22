import React, { useState, useEffect } from "react";
import { Stage, Layer, Rect, Text, Arrow, Line, Image } from "react-konva";
import { Tooltip } from "@mui/material";
import useImage from "use-image";
import { MathJax, MathJaxContext } from "better-react-mathjax";

interface BayesTheoremLoreProps {
  // Define the props for the component here
}

const BayesTheoremLore: React.FC<BayesTheoremLoreProps> = () => {
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

  return (
    <div className="section" style={{ background: "#ffffff" }}>
      <div style={{ overflow: "hidden" }}>
        <h3 className="heading" style={{ textAlign: "center" }}>
          Selecting Actions
        </h3>
        <MathJaxContext>
          <ul>
            <li>
              Want to take actions that maximize the <i>Value of Information</i>{" "}
              (VI)
            </li>
            <li>
              VI evaluates how the outcomes of an action may influence the
              learning agent's beliefs about the other agents, and how the
              changed beliefs will in turn influence the future actions of the
              learning agent
            </li>
          </ul>
          <MathJax inline dynamic={true}>
            {"\\[a^* = \\text{argmax}_a \\; Q(s, a)\\]"}
          </MathJax>
          <ul>
            <li>
              The agent selects the action with the highest Q-value for the
              current state.
            </li>
          </ul>
        </MathJaxContext>
      </div>
    </div>
  );
};

export default BayesTheoremLore;