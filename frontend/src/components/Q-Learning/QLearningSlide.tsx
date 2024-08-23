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

  const mathFontSize = Math.max(dimensions.width * 0.0225, 12);
  const textFontSize = Math.max(dimensions.width * 0.019, 12);
  const mathJaxStyles = `
    .MathJax {
      font-size: ${mathFontSize}px !important;
      color: #ffffff;
      overflow: hidden;
    }
    p {
      font-size: ${textFontSize}px !important;
      color: #ffffff;
}
  `;

  const [tab, setTab] = React.useState(0);
  const tabStyles = {
    backgroundColor: "var(--neon-pink)",
    color: "#000000",
    textTransform: "none",
  };
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  const equations: { [key: number]: any } = {
    0: (
      <MathJaxContext>
        <ul>
          <li style={{ color: "var(--neon-pink)" }}>
            <p style={{ color: "#ffffff", fontSize: textFontSize }}>
              <MathJax inline>{"\\(Q(S_t, A_t)\\)"}</MathJax>: the expected
              cumulative reward for taking action{" "}
              <MathJax inline>{"\\(A\\)"}</MathJax> in state{" "}
              <MathJax inline>{"\\(S\\)"}</MathJax> (at time ‘t'), and then
              following the optimal policy thereafter.
            </p>
          </li>
        </ul>
      </MathJaxContext>
    ),
    1: "?",
    2: (
      <MathJaxContext>
        <ul>
          <li style={{ color: "var(--neon-pink)" }}>
            <p style={{ color: "#ffffff", fontSize: textFontSize }}>
              The learning rate, ranging between 0 and 1
            </p>
          </li>
          <li style={{ color: "var(--neon-pink)" }}>
            <p style={{ color: "#ffffff", fontSize: textFontSize }}>
              Determines how much newly acquired information overrides the old
              information when updating the Q-values
            </p>
          </li>
          <li style={{ color: "var(--neon-pink)" }}>
            <p style={{ color: "#ffffff", fontSize: textFontSize }}>
              A higher learning rate favours recent experiences, causing
              Q-values to change more quickly, at the cost of stability
            </p>
          </li>
          <li style={{ color: "var(--neon-pink)" }}>
            <p style={{ color: "#ffffff", fontSize: textFontSize }}>
              A lower learning rate favours past experiences, leading to slower
              changes in Q-values that converge more reliably
            </p>
          </li>
        </ul>
      </MathJaxContext>
    ),
    3: (
      <MathJaxContext>
        <ul>
          <li style={{ color: "var(--neon-pink)" }}>
            <p style={{ color: "#ffffff", fontSize: textFontSize }}>
              The reward received after taking action{" "}
              <MathJax inline>{"\\(A\\)"}</MathJax> in state{" "}
              <MathJax inline>{"\\(S\\)"}</MathJax>
            </p>
          </li>
        </ul>
      </MathJaxContext>
    ),
    4: (
      <MathJaxContext>
        <ul>
          <li style={{ color: "var(--neon-pink)" }}>
            <p style={{ color: "#ffffff", fontSize: textFontSize }}>
              The discount factor
            </p>
          </li>
        </ul>
      </MathJaxContext>
    ),
  };

  return (
    <div className="section" style={{ background: "#ffffff", zIndex: "-4" }}>
      <div
        className="blur-background"
        style={{
          marginTop: dimensions.width < 444 ? "-53px" : "-51px",
          marginLeft: dimensions.width < 444 ? "-15px" : "-73px",
          backgroundImage:
            dimensions.width < 444
              ? "url(./images/QPortrait.png)"
              : "url(./images/QLandscape.png)",
        }}
      />
      <PlayAgainstAI dark={false} />
      <style>{mathJaxStyles}</style>
      <div
        style={{
          background: "rgba(0, 0, 0, 0.75)",
          width: dimensions.width < 444 ? "92vw" : "85vw",
          height: dimensions.width < 444 ? "480px" : "82vh",
          paddingRight: "15px",
        }}
      >
        <h3
          style={{
            color: "var(--neon-pink)",
            paddingTop: "10px",
            paddingLeft: "10px",
          }}
        >
          Q-Learning
        </h3>
        <MathJaxContext>
          <ul>
            <li style={{ color: "var(--neon-pink)" }}>
              <p style={{ color: "#ffffff", fontSize: textFontSize }}>
                Q-Learning is a reinforcement learning algorithm that aims to
                learn the value of state-action pairs (Q-values)
              </p>
            </li>
            <li style={{ color: "var(--neon-pink)" }}>
              <p style={{ color: "#ffffff", fontSize: textFontSize }}>
                These values are stored in a ‘Q-table', with values being
                updated using the following update rule:
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
          textColor="secondary"
          TabIndicatorProps={{ style: { backgroundColor: "#ffffff" } }}
          centered
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
        <p>{equations[tab]}</p>
      </div>
    </div>
  );
};

export default QLearningSlide;
