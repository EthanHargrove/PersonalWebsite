import React, { useCallback, useState, useEffect } from "react";
import { Stage, Layer, Rect, Text, Arrow, Line, Image } from "react-konva";
import { Tooltip } from "@mui/material";
import useImage from "use-image";
import { MathJax, MathJaxContext } from "better-react-mathjax";

interface PlaceholderProps {
  // Define the props for the component here
}

const ActionProbabilities: React.FC<PlaceholderProps> = () => {
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
          Action Probabilities
        </h3>
        <MathJaxContext>
          <ul>
            <li>
              We initialize the class with a list of policies (types) and some
              expected noise
            </li>
            <li>If the opponent's policy is deterministic:</li>
            <ul>
              <li></li>
            </ul>
            <li>If the opponent's policy is stochastic:</li>
            <ul>
              <li>
                Determine the policy's action{" "}
                <MathJax inline dynamic={true}>
                  {"\\(N\\)"}
                </MathJax>{" "}
                times
              </li>
              <li>
                Use the law of total probability to determine the expected
                observed rate from the this true rate
              </li>
              <MathJax inline dynamic={true}>
                {"\\[\\text{obs_rate} = \\text{}\\]"}
              </MathJax>
            </ul>
          </ul>
        </MathJaxContext>
      </div>
    </div>
  );
};

export default ActionProbabilities;
