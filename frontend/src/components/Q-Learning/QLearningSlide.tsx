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
    minWidth: dimensions.width < 444 ? 20 : 100,
    width:
      dimensions.width < 444 ? dimensions.width / 6.5 : dimensions.width / 9.5,
    borderTop: "2px solid #ffffff",
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
              following the optimal policy thereafter
            </p>
          </li>
          <li style={{ color: "var(--neon-pink)" }}>
            <p style={{ color: "#ffffff", fontSize: textFontSize }}>
              While exploiting, the agent selects the action with the highest
              Q-value in the current state
            </p>
          </li>
        </ul>
      </MathJaxContext>
    ),
    1: (
      <MathJaxContext>
        <ul>
          <li style={{ color: "var(--neon-pink)" }}>
            <p style={{ color: "#ffffff", fontSize: textFontSize }}>
              The left arrow symbolizes updating or overwriting existing
              Q-values in the Q-table
            </p>
          </li>
          <li style={{ color: "var(--neon-pink)" }}>
            <p style={{ color: "#ffffff", fontSize: textFontSize }}>
              The Q-table must be initialized before training, we must assign
              values to each state-action pair before they are observed
            </p>
          </li>
          <li style={{ color: "var(--neon-pink)" }}>
            <p style={{ color: "#ffffff", fontSize: textFontSize }}>
              Initializing all unknown Q-values to zero is a common and
              straightforward approach. It is particularily useful when the
              agent receives negative rewards each timestep, as the agent will
              always be incentivized to take new actions (if one exists)
            </p>
          </li>
        </ul>
      </MathJaxContext>
    ),
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
    4: (
      <MathJaxContext>
        <ul>
          <li style={{ color: "var(--neon-pink)" }}>
            <p style={{ color: "#ffffff", fontSize: textFontSize }}>
              The Temporal Difference (TD) Error
              <MathJax inline>
                {
                  "\\(\\;\\bigl(R_{t+1} + \\gamma \\, \\max\\limits_{a} \\, Q(S_{t+1},a) - Q(S_t,A_t)\\bigr)\\;\\)"
                }
              </MathJax>
              is the difference between the estimated Q-value and the target
              Q-value
            </p>
          </li>
          <li style={{ color: "var(--neon-pink)" }}>
            <p style={{ color: "#ffffff", fontSize: textFontSize }}>
              A positive value indicates underestimation and a negative value
              indicates overestimation
            </p>
          </li>
          <li style={{ color: "var(--neon-pink)" }}>
            <p style={{ color: "#ffffff", fontSize: textFontSize }}>
              The magnitude quantifies how ‘surprised' the agent is, and
              determines (alongside <MathJax inline>{"\\(\\alpha\\)"}</MathJax>)
              how much the Q-value should be adjusted
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
              The discount factor, a hyperparameter ranging between 0 and 1
            </p>
          </li>
          <li style={{ color: "var(--neon-pink)" }}>
            <p style={{ color: "#ffffff", fontSize: textFontSize }}>
              Determines the importance of future rewards
            </p>
          </li>
          <li style={{ color: "var(--neon-pink)" }}>
            <p style={{ color: "#ffffff", fontSize: textFontSize }}>
              The effective horizon, the number of future time steps that
              significantly influence the agent's decision, is mathematically
              linked to γ:
              <MathJax inline>
                {
                  "\\(\\; \\text{Effective Horizon} \\approx \\sum_{k=0}^{\\infty} \\gamma^k = \\frac{1}{1-\\gamma}\\)"
                }
              </MathJax>
            </p>
          </li>
          <li style={{ color: "var(--neon-pink)" }}>
            <p style={{ color: "#ffffff", fontSize: textFontSize }}>
              A discount factor of 0.98 results in an effective horizon of 50
              timesteps:
              <MathJax inline>{"\\(\\;\\frac{1}{1-0.98} = 50\\)"}</MathJax>
            </p>
          </li>
        </ul>
      </MathJaxContext>
    ),
  };

  return (
    <div className="section">
      <div
        className="background"
        style={{
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
          paddingLeft: "5px",
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
          TabIndicatorProps={{
            style: { backgroundColor: "#ffffff" },
          }}
          centered
        >
          <Tab
            label={
              <MathJaxContext>
                <MathJax>{"\\( Q(S_t,A_t) \\)"}</MathJax>
              </MathJaxContext>
            }
            value={0}
            sx={{ borderLeft: "2px solid #ffffff", ...tabStyles }}
          />
          <Tab
            label={
              <MathJaxContext>
                <MathJax>{"\\( \\leftarrow \\)"}</MathJax>
              </MathJaxContext>
            }
            value={1}
            sx={{ borderLeft: "2px solid #ffffff", ...tabStyles }}
          />
          <Tab
            label={
              <MathJaxContext>
                <MathJax>{"\\( \\alpha \\)"}</MathJax>
              </MathJaxContext>
            }
            value={2}
            sx={{ borderLeft: "2px solid #ffffff", ...tabStyles }}
          />
          <Tab
            label={
              <MathJaxContext>
                <MathJax>{"\\( \\gamma \\)"}</MathJax>
              </MathJaxContext>
            }
            value={3}
            sx={{ borderLeft: "2px solid #ffffff", ...tabStyles }}
          />

          <Tab
            label={
              <MathJaxContext>
                <MathJax>{"\\(\\text{TD Error} \\)"}</MathJax>
              </MathJaxContext>
            }
            value={4}
            sx={{
              borderLeft: "2px solid #ffffff",
              borderRight: "2px solid #ffffff",
              ...tabStyles,
            }}
          />
        </Tabs>
        <p>{equations[tab]}</p>
      </div>
    </div>
  );
};

export default QLearningSlide;
