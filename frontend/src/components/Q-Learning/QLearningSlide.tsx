import React, { useEffect, useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { Tabs, Tab } from "@mui/material";

import PlayAgainstAI from "./PlayAgainstAI";

const QLearningSlide: React.FC = () => {
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

  const mathFontSize = Math.max(dimensions.width * 0.02, 12);
  const textFontSize = Math.max(dimensions.width * 0.014, 12);
  const mathJaxStyles = `
    .MathJax {
      font-size: ${mathFontSize}px !important;
      color: #333;
      overflow: hidden;
    }
    p {
      font-size: ${textFontSize}px;
      color: #333;
}
  `;
  return (
    <div className="section" style={{ background: "#ffffff" }}>
      <PlayAgainstAI />
      <style>{mathJaxStyles}</style>
      <h3>Q-Learning</h3>
      <MathJaxContext>
        <ul>
          <li>
            <p>
              Q-Learning is a reinforcement learning algorithm that aims to
              learn the value of state-action pairs.
            </p>
          </li>
          <li>
            <p>
              <MathJax inline>{"\\(Q(S, A)\\)"}</MathJax> is the expected
              cumulative reward for taking action{" "}
              <MathJax inline>{"\\(A\\)"}</MathJax> in state{" "}
              <MathJax inline>{"\\(S\\)"}</MathJax>, and then following the
              optimal policy thereafter.
            </p>
          </li>
          <li>
            <p>
              These values are stored in a ‘Q-table', with values being updated
              using the following update rule:
            </p>
          </li>
        </ul>
        <MathJax>
          {
            "\\[Q(S_t, A_t) \\leftarrow Q(S_t,A_t) + \\alpha (R_{t+1} + \\gamma \\, \\max\\limits_{a} \\, Q(S_{t+1},a) - Q(S_t,A_t))\\]"
          }
        </MathJax>
      </MathJaxContext>
      <Tabs>
        <Tab label="Exploration vs. Exploitation" />
        <Tab label="Epsilon-Greedy Strategy" />
      </Tabs>
    </div>
  );
};

export default QLearningSlide;
