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
          Calculating Action Probabilities
        </h3>
        <MathJaxContext>
          <ul>
            <li>
              We initialize the class with a set of opponent's potential
              policies (types)
            </li>
            <li>
              Action probabilities are used as the likelihood in the Bayesian
              update{" "}
            </li>
            <li>
              We expect some noise,{" "}
              <MathJax inline dynamic={true}>
                {"\\(N\\)"}
              </MathJax>{" "}
              , the probability that a player's intended action is flipped
            </li>
            <li>If the opponent's policy is deterministic:</li>
            <ul>
              <li></li>
            </ul>
            <li>If the opponent's policy is stochastic:</li>
            <ul>
              <li>
                Monte Carlo sample the policy to estimate the true cooperation
                rate given the history
              </li>
              <li>
                Use the law of total probability to determine the expected
                observed rate from this true rate
              </li>
              <MathJax inline dynamic={true}>
                {
                  "\\[\\text{obs_rate} = (1 - N) \\times \\text{true_rate} + N \\times (1-\\text{true_rate})\\]"
                }
              </MathJax>
              <MathJax inline dynamic={true}>
                {
                  "\\[\\text{obs_rate} = \\text{true_rate} \\times (1 - 2 \\times N) + N\\]"
                }
              </MathJax>
            </ul>
          </ul>
        </MathJaxContext>
      </div>
    </div>
  );
};

export default ActionProbabilities;
