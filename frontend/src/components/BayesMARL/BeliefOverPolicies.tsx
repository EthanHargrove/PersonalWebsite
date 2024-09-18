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
    }, 10),
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
          Bayesian Belief Over the Other Agent's Policy
        </h3>
        <MathJaxContext>
          <ul>
            <li>
              Use Bayes' theorem to update our belief of the other agent's
              policy for a discrete set of policies:
            </li>
          </ul>
          <MathJax inline dynamic={true}>
            {
              "\\[P(\\pi_j \\mid h_{t+1}) = \\frac{\\pi_j(a_t \\mid h_t) \\; P(\\pi_j \\mid h_t)}{\\sum_{\\pi \\in \\Pi} \\pi_j(a_t \\mid h_t) \\; P(\\pi_j \\mid h_t)} \\]"
            }
          </MathJax>
          <ul>
            <li>
              <MathJax inline dynamic={true}>
                {"\\(P(\\pi_j \\mid h_{t+1})\\)"}
              </MathJax>
              : posterior probability the other agent is using policy{" "}
              <MathJax inline dynamic={true}>
                {"\\(\\pi_j \\in \\Pi\\)"}
              </MathJax>{" "}
              given the history{" "}
              <MathJax inline dynamic={true}>
                {"\\(h_{t+1}\\)"}
              </MathJax>
            </li>
            <li>
              <MathJax inline dynamic={true}>
                {"\\(\\pi_j(a_t \\mid h_t)\\)"}
              </MathJax>
              : probability that an agent using policy{" "}
              <MathJax inline dynamic={true}>
                {"\\(\\pi_j\\)"}
              </MathJax>{" "}
              would take their most recent action,{" "}
              <MathJax inline dynamic={true}>
                {"\\(a_t\\)"}
              </MathJax>
              , given the history up to that point{" "}
              <MathJax inline dynamic={true}>
                {"\\(h_t\\)"}
              </MathJax>
            </li>
            <li>
              <MathJax inline dynamic={true}>
                {"\\(P(\\pi_j \\mid h)\\)"}
              </MathJax>
              : prior belief over the other agent's policy based on the previous
              history
              <ul>
                <li>
                  An effective biased prior can be initialized using historical
                  metagame data or the agent's own past experiences
                </li>
              </ul>
            </li>
            <li>
              <MathJax inline dynamic={true}>
                {
                  "\\(\\sum_{\\pi \\in \\Pi} \\pi_j(a_t \\mid h_t) \\; P(\\pi_j \\mid h_t)\\)"
                }
              </MathJax>
              : calculating the numerator for each potential policy to ensure
              beliefs are normalized as a valid probability distribution
            </li>
          </ul>
        </MathJaxContext>
      </div>
    </div>
  );
};

export default BeliefOverPolicies;
