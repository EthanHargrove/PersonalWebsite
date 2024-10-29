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

  const titleFontSize =
    Math.min(dimensions.width, dimensions.height) < 444 ? "1rem" : "2rem";

  const fontSize =
    Math.min(dimensions.width, dimensions.height) < 444 ? "0.775rem" : "1.5rem";

  const mathFontSize = dimensions.width < 444 ? "\\normalsize" : "\\Large";

  const liGap = dimensions.height > 444 ? "1rem" : "0rem";

  return (
    <div className="section">
      <div
        className="background"
        style={{
          backgroundImage:
            dimensions.width < 444
              ? "url(./images/PrisonCellPortrait.png)"
              : "url(./images/PrisonCellLandscape.png)",
        }}
      />
      <div
        style={{
          overflow: "hidden",
          color: "#ffffff",
          background: "rgba(0, 0, 0, 0.66)",
          padding: "5px",
          fontSize: fontSize,
        }}
      >
        <h3
          className="heading"
          style={{ fontSize: titleFontSize, textAlign: "center" }}
        >
          Calculating Action Probabilities
        </h3>
        <MathJaxContext>
          <ul>
            <li style={{ marginBottom: liGap }}>
              We initialize the class with a set of opponent's potential
              policies (types)
            </li>
            <li style={{ marginBottom: liGap }}>
              Action probabilities are used as the likelihood in the Bayesian
              update{" "}
            </li>
            <li style={{ marginBottom: liGap }}>
              We expect some noise,{" "}
              <MathJax inline dynamic={true}>
                {`\\(${mathFontSize} N\\)`}
              </MathJax>{" "}
              , the probability that a player's intended action is flipped
            </li>
            <li style={{ marginBottom: liGap }}>
              If the opponent's policy is deterministic:
            </li>
            <ul>
              <li style={{ marginBottom: liGap }}>
                Probability is{" "}
                <MathJax inline dynamic={true}>
                  {`\\(${mathFontSize} 1-N\\)`}
                </MathJax>{" "}
                if action matches prediction,{" "}
                <MathJax inline dynamic={true}>
                  {`\\(${mathFontSize} N\\)`}
                </MathJax>{" "}
                otherwise
              </li>
            </ul>
            <li style={{ marginBottom: liGap }}>
              If the opponent's policy is stochastic:
            </li>
            <ul>
              <li style={{ marginBottom: liGap }}>
                Monte Carlo sample the policy to estimate the true cooperation
                rate given the history
              </li>
              <li style={{ marginBottom: liGap }}>
                Use the law of total probability to determine the expected
                observed rate from this true rate
              </li>
            </ul>
          </ul>
          <div style={{ alignItems: "center" }}>
            <MathJax inline dynamic={true}>
              {`\\[${mathFontSize} \\text{obs_rate} = (1 - N) \\times \\text{true_rate} + N \\times (1-\\text{true_rate})\\]`}
            </MathJax>
            <MathJax inline dynamic={true}>
              {`\\[${mathFontSize} \\text{obs_rate} = \\text{true_rate} \\times (1 - 2 \\times N) + N\\]`}
            </MathJax>
          </div>
        </MathJaxContext>
      </div>
    </div>
  );
};

export default ActionProbabilities;
