import React, { useState, useEffect } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { Tabs, Tab } from "@mui/material";

interface BayesTheoremLoreProps {
  // Define the props for the component here
}

const ValueOfInformation: React.FC<BayesTheoremLoreProps> = () => {
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

  const [tab, setTab] = React.useState(0);

  const tabStyles = {
    backgroundColor: "var(--neon-pink)",
    color: "#ffffff",
    textTransform: "none",
    minWidth: dimensions.width < 444 ? 20 : 100,
    width:
      dimensions.width < 444 ? dimensions.width / 9.5 : dimensions.width / 12.5,
    borderTop: "2px solid #ffffff",
  };
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const explanations: { [key: number]: any } = {
    0: "Our agent, the learning agent",
    1: (
      <MathJaxContext>
        The set of all other agents expect agent{" "}
        <MathJax inline dynamic>
          {"\\(i\\)"}{" "}
        </MathJax>
      </MathJaxContext>
    ),
    2: "A specific agent in the set of all other agents",
    3: "Bayesian belief over the other agents' policies given the history",
    4: "The action value ",
    5: (
      <MathJaxContext>
        The probability of agent
        <MathJax inline dynamic>
          {"\\(\\;j\\;\\)"}
        </MathJax>
        taking action{" "}
        <MathJax inline dynamic>
          {"\\(a_j\\)"}
        </MathJax>{" "}
        given the history
      </MathJaxContext>
    ),
    6: (
      <MathJaxContext>
        The environment's transition function, the probability of transitioning
        to a new state,{" "}
        <MathJax inline dynamic>
          {" "}
          {"\\(s^{\\prime}\\)"}
        </MathJax>
        {", "}
        given the current state{", "}
        <MathJax inline dynamic>
          {" "}
          {"\\(s\\)"}
          {", "}
        </MathJax>{" "}
        and action{", "}
        <MathJax inline dynamic>
          {" "}
          {"\\(a\\)"}
          {"."}
        </MathJax>
      </MathJaxContext>
    ),
  };

  return (
    <div className="section" style={{ background: "#ffffff" }}>
      <div style={{ overflow: "hidden" }}>
        <h3 className="heading" style={{ textAlign: "center" }}>
          Value of Information
        </h3>
        <MathJaxContext>
          <ul>
            <li>
              Want to take actions that maximize the <i>Value of Information</i>{" "}
              (VI)
            </li>
            <li>
              VI evaluates how the outcomes of an action may influence the
              learning agent's beliefs about the other agents, and how the
              changed beliefs will in turn influence the future actions of the
              learning agent
            </li>
            <MathJax dynamic={true}>
              {
                "\\[\\text{VI}_i(a_i|h) = \\sum_{\\pi_{-i} \\in \\Pi_{-i}} P(\\pi_{-i}|h) \\sum_{a_{-i} \\in A_{-i}} Q_i(h, \\langle a_i, a_{-i} \\rangle) \\prod_{j \\neq i} \\pi_{j}(a_{j}|h)\\]"
              }
            </MathJax>
            <MathJax dynamic={true}>
              {
                "\\[Q_i(h, a) = \\sum_{s^{\\prime} \\in S}\\mathcal{T}(s^{\\prime}|s(h),a)\\biggl[R_i(s(h), a, s^{\\prime}) + \\gamma \\; \\text{max}_{a_i^{\\prime} \\in A_i} \\text{VI}_i(a_i^{\\prime}|\\langle h, a, s^{\\prime}\\rangle)\\biggr]\\]"
              }
            </MathJax>
          </ul>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            // textColor="primary"
            TabIndicatorProps={{ style: { backgroundColor: "#ffffff" } }}
            centered
          >
            <Tab
              label={<MathJax>{"\\( i \\)"}</MathJax>}
              value={0}
              key="tab-0"
              sx={tabStyles}
            />
            <Tab
              label={<MathJax>{"\\( -i \\)"}</MathJax>}
              value={1}
              key="tab-1"
              sx={tabStyles}
            />
            <Tab
              label={<MathJax>{"\\( j \\)"}</MathJax>}
              value={2}
              key="tab-2"
              sx={tabStyles}
            />
            <Tab
              label={<MathJax>{"\\( P(\\pi_{-i}|h) \\)"}</MathJax>}
              value={3}
              key="tab-3"
              sx={tabStyles}
            />
            <Tab
              label={<MathJax>{"\\( Q(h, a) \\)"}</MathJax>}
              value={4}
              key="tab-4"
              sx={tabStyles}
            />
            <Tab
              label={<MathJax>{"\\( \\pi_{j}(a_{j}|h) \\)"}</MathJax>}
              value={5}
              key="tab-5"
              sx={tabStyles}
            />
            <Tab
              label={<MathJax>{"\\( \\mathcal{T} \\)"}</MathJax>}
              value={6}
              key="tab-6"
              sx={tabStyles}
            />
          </Tabs>
        </MathJaxContext>
        <ul>
          <li>
            <p>{explanations[tab]}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ValueOfInformation;
