import React, { useCallback, useState, useEffect } from "react";
import { Stage, Layer, Rect, Text, Arrow, Line, Image } from "react-konva";
import { Tooltip } from "@mui/material";
import useImage from "use-image";
import { MathJax, MathJaxContext } from "better-react-mathjax";

interface PlaceholderProps {
  // Define the props for the component here
}

const HBAIntro: React.FC<PlaceholderProps> = () => {
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

  const fontStyle: React.CSSProperties = {
    fontSize: Math.min(dimensions.width * 0.03, dimensions.height * 0.0225),
    paddingBottom: "10px",
    userSelect: "none",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
  };

  return (
    <div className="section" style={{ background: "#ffffff" }}>
      <div style={{ overflow: "hidden" }}>
        <h3 className="heading" style={{ textAlign: "center" }}>
          Harsanyi–Bellman Ad Hoc Coordination (HBA)
        </h3>
        <ul>
          <li>
            <a
              href={"http://www.dklevine.com/archive/refs41175.pdf"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Harsanyi (1967)
            </a>{" "}
            introduced Bayesian games in which the private information of a
            player is abstractly represented by its type.
          </li>
          <li>
            <a
              href={
                "https://www.ams.org/journals/bull/1954-60-06/S0002-9904-1954-09848-8/S0002-9904-1954-09848-8.pdf"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              Bellman (1954)
            </a>{" "}
            determined the value of a decision problem by its immediate payoff
            from a decision and the expected future payoffs, discounted over
            time. This is known as the Bellman equation, and is a foundational
            concept in reinforcement learning.
            <MathJaxContext>
              <MathJax>
                {`\\[V^{\\pi}(s_t) = R\\bigl(s_t, \\pi(s_t)\\bigr) + \\gamma \\sum_{s_{t+1}} P(s_{t+1} \\mid s_t, a_t) V^{\\pi}(s_{t+1})\\]`}
              </MathJax>
            </MathJaxContext>
          </li>
          <li>
            <a
              href={"https://arxiv.org/abs/1506.01170"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Albrecht & Ramamoorthy (2013)
            </a>{" "}
            combined these two concepts to create the Harsanyi–Bellman Ad Hoc
            Coordination (HBA) algorithm.
          </li>
        </ul>
        <MathJaxContext>
          <MathJax inline dynamic={true} style={fontStyle}>
            {`\\[\\]`}
          </MathJax>
        </MathJaxContext>
      </div>
    </div>
  );
};

export default HBAIntro;
