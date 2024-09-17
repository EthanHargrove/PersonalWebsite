import React, { useCallback, useState, useEffect } from "react";
import { Stage, Layer, Rect, Text, Arrow, Line, Image } from "react-konva";
import { Tooltip } from "@mui/material";
import useImage from "use-image";
import { MathJax, MathJaxContext } from "better-react-mathjax";

interface BeliefOverPoliciesProps {
  // Define the props for the component here
}

const BeliefOverPolicies: React.FC<BeliefOverPoliciesProps> = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const debounce = (func: any, wait: any) => {
    let timeout: any;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const handleResize = useCallback(
    debounce(() => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 1000),
    []
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <div className="section" style={{ background: "#ffffff" }}>
      <div style={{ overflow: "hidden" }}>
        <h3 className="heading" style={{ textAlign: "center" }}>
          Belief Over Opponent's Policies
        </h3>
        <MathJaxContext>
          <ul>
            <li>
              Use Bayes' theorem to update our belief of the opponent's policy:
            </li>
          </ul>
          <MathJax inline dynamic={true}>
            {
              "\\[P(\\pi_j \\mid h_{t+1}) = \\frac{\\pi_j(a_t \\mid h_t) \\; P(\\pi_j \\mid h_t)}{\\sum_{\\pi \\in \\Pi} \\pi_j(a_t \\mid h_t) \\; P(\\pi_j \\mid h_t)} \\]"
            }
          </MathJax>
        </MathJaxContext>
      </div>
    </div>
  );
};

export default BeliefOverPolicies;
