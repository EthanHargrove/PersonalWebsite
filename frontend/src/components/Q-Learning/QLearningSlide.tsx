import React, { useEffect, useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { Tabs, Tab } from "@mui/material";

import PlayAgainstAI from "./PlayAgainstAI";
import { delimiter } from "path";

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
  const textFontSize = Math.max(dimensions.width * 0.013, 12);
  const mathJaxStyles = `
    .MathJax {
      font-size: ${mathFontSize}px !important;
      color: #333;
      overflow: hidden;
    }
    p {
      font-size: ${textFontSize}px !important;
      color: #333;
}
  `;

  const [tab, setTab] = React.useState(0);
  const tabStyles = {
    backgroundColor: "#f0f0f0",
    color: "#000000",
    fontWeight: "bold",
    textTransform: "none",
  };
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  const equations: { [key: number]: any } = {
    0: (
      <p>
        <MathJaxContext>
          <MathJax inline>{"\\(Q(S_t, A_t)\\)"}</MathJax>: the expected
          cumulative reward for taking action{" "}
          <MathJax inline>{"\\(A\\)"}</MathJax> in state{" "}
          <MathJax inline>{"\\(S\\)"}</MathJax> (at time ‘t'), and then
          following the optimal policy thereafter.
        </MathJaxContext>
      </p>
    ),
    1: "?",
    2: (
      <MathJaxContext>
        <ul>
          <li>
            <p>The learning rate</p>
          </li>
          <li>
            <p>
              Determines how much newly acquired information overrides the old
              information when updating the Q-values
            </p>
          </li>
          <li>
            <p>Ranges between 0 and 1</p>
          </li>
          <li>
            <p>
              A higher learning rate favours recent experiences, causing
              Q-values to change more quickly, at the cost of stability
            </p>
          </li>
          <li>
            <p>
              A lower learning rate favours past experiences, leading to slower
              changes in Q-values that converge more reliably
            </p>
          </li>
        </ul>
      </MathJaxContext>
    ),
    3: "hello",
    4: "wagwan",
  };

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
          {/* <li>
            <p>
              <MathJax inline>{"\\(Q(S, A)\\)"}</MathJax> is the expected
              cumulative reward for taking action{" "}
              <MathJax inline>{"\\(A\\)"}</MathJax> in state{" "}
              <MathJax inline>{"\\(S\\)"}</MathJax>, and then following the
              optimal policy thereafter.
            </p>
          </li> */}
          <li>
            <p>
              These values are stored in a ‘Q-table', with values being updated
              using the following update rule:
            </p>
          </li>
        </ul>
        <MathJax inline dynamic={true}>
          {
            "\\[Q(S_t, A_t) \\leftarrow Q(S_t,A_t) + \\alpha (R_{t+1} + \\gamma \\, \\max\\limits_{a} \\, Q(S_{t+1},a) - Q(S_t,A_t))\\]"
          }
        </MathJax>
      </MathJaxContext>
      <Tabs
        value={tab}
        onChange={handleTabChange}
        TabIndicatorProps={{ style: { backgroundColor: "#000000" } }}
      >
        <Tab
          label={
            <MathJaxContext>
              <MathJax>{"\\( Q(S_t,A_t) \\)"}</MathJax>
            </MathJaxContext>
          }
          value={0}
          sx={tabStyles}
        />
        <Tab
          label={
            <MathJaxContext>
              <MathJax>{"\\( \\leftarrow \\)"}</MathJax>
            </MathJaxContext>
          }
          value={1}
          sx={tabStyles}
        />
        <Tab
          label={
            <MathJaxContext>
              <MathJax>{"\\( \\alpha \\)"}</MathJax>
            </MathJaxContext>
          }
          value={2}
          sx={tabStyles}
        />
        <Tab
          label={
            <MathJaxContext>
              <MathJax>{"\\(R_{t+1} \\)"}</MathJax>
            </MathJaxContext>
          }
          value={3}
          sx={tabStyles}
        />
        <Tab
          label={
            <MathJaxContext>
              <MathJax>{"\\( \\gamma \\)"}</MathJax>
            </MathJaxContext>
          }
          value={4}
          sx={tabStyles}
        />
      </Tabs>
      <h3>{equations[tab]}</h3>
    </div>
  );
};

export default QLearningSlide;
