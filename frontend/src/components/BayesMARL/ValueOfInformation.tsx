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
    backgroundColor: "var(--neon-orange)",
    color: "#000000",
    textTransform: "none",
    minWidth: "0px",
    width:
      dimensions.width < 444 ? dimensions.width / 9 : dimensions.width / 10,
    borderTop: "2px solid #ffffff",
    minHeight: "0px",
    height:
      dimensions.height < 444 ? dimensions.height / 8 : dimensions.height / 13,
  };
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const mathFontSize = dimensions.width < 444 ? "\\normalsize" : "\\Large";
  const mathFontSizeMedium = dimensions.width < 444 ? "\\small" : "\\Large";
  const mathFontSizeSmall = dimensions.width < 444 ? "\\Tiny" : "\\large";

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
    3: "The next state and action",
    4: "Bayesian belief over the other agents' policies given the history",
    5: "The action value ",
    6: (
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
    7: (
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
    8: (
      <MathJaxContext>
        The environment's reward function, the reward received by agent
        <MathJax inline dynamic>
          {"\\(\\;i\\)"}
        </MathJax>
      </MathJaxContext>
    ),
  };

  const titleFontSize =
    Math.min(dimensions.width, dimensions.height) < 444 ? "1rem" : "2rem";

  const fontSize =
    Math.min(dimensions.width, dimensions.height) < 444 ? "0.7rem" : "1.5rem";

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
          background: "rgba(0, 0, 0, 0.66)",
          maxWidth: "100vw",
        }}
      >
        <h3
          className="heading"
          style={{
            textAlign: "center",
            fontSize: titleFontSize,
            color: "var(--neon-orange)",
            marginLeft: "5px",
            marginRight: "5px",
          }}
        >
          Value of Information
        </h3>
        <MathJaxContext>
          <ul
            style={{
              fontSize: fontSize,
              color: "var(--neon-orange)",
              marginLeft: -20,
            }}
          >
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
            <MathJax dynamic={true} style={{ marginLeft: -10 }}>
              {`\\[${mathFontSizeMedium} \\text{VI}_i(a_i|h) = \\sum_{\\pi_{-i} \\in \\Pi_{-i}} P(\\pi_{-i}|h) \\sum_{a_{-i} \\in A_{-i}} Q_i(h, \\langle a_i, a_{-i} \\rangle) \\prod_{j \\neq i} \\pi_{j}(a_{j}|h)\\]`}
            </MathJax>
            <MathJax dynamic={true} style={{ marginLeft: -10 }}>
              {`\\[${mathFontSizeMedium} Q_i(h, a) = \\sum_{s^{\\prime} \\in S}\\mathcal{T}(s^{\\prime}|s(h),a)\\biggl[R_i(s(h), a, s^{\\prime}) + \\gamma \\; \\text{max}_{a_i^{\\prime} \\in A_i} \\text{VI}_i(a_i^{\\prime}|\\langle h, a, s^{\\prime}\\rangle)\\biggr]\\]`}
            </MathJax>
          </ul>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            TabIndicatorProps={{
              style: { backgroundColor: "#ffffff" },
            }}
            centered
          >
            <Tab
              label={<MathJax>{`\\(${mathFontSize} i \\)`}</MathJax>}
              value={0}
              key="tab-0"
              sx={{ borderLeft: "2px solid #ffffff", ...tabStyles }}
            />
            <Tab
              label={<MathJax>{`\\(${mathFontSize} -i \\)`}</MathJax>}
              value={1}
              key="tab-1"
              sx={{ borderLeft: "2px solid #ffffff", ...tabStyles }}
            />
            <Tab
              label={<MathJax>{`\\(${mathFontSize} j \\)`}</MathJax>}
              value={2}
              key="tab-2"
              sx={{ borderLeft: "2px solid #ffffff", ...tabStyles }}
            />
            <Tab
              label={
                <MathJax>{`\\(${mathFontSize} s^{\\prime}/\\,a^{\\prime} \\)`}</MathJax>
              }
              value={3}
              key="tab-3"
              sx={{ borderLeft: "2px solid #ffffff", ...tabStyles }}
            />
            <Tab
              label={
                <MathJax>{`\\(${mathFontSizeSmall} P(\\pi_{-i}|h) \\)`}</MathJax>
              }
              value={4}
              key="tab-4"
              sx={{ borderLeft: "2px solid #ffffff", ...tabStyles }}
            />
            <Tab
              label={<MathJax>{`\\(${mathFontSizeSmall} Q(h, a) \\)`}</MathJax>}
              value={5}
              key="tab-5"
              sx={{ borderLeft: "2px solid #ffffff", ...tabStyles }}
            />
            <Tab
              label={
                <MathJax>{`\\(${mathFontSizeSmall} \\pi_{j}(a_{j}|h) \\)`}</MathJax>
              }
              value={6}
              key="tab-6"
              sx={{ borderLeft: "2px solid #ffffff", ...tabStyles }}
            />
            <Tab
              label={<MathJax>{`\\(${mathFontSize} \\mathcal{T} \\)`}</MathJax>}
              value={7}
              key="tab-7"
              sx={{ borderLeft: "2px solid #ffffff", ...tabStyles }}
            />
            <Tab
              label={<MathJax>{`\\(${mathFontSize} R \\)`}</MathJax>}
              value={8}
              key="tab-8"
              sx={{
                borderLeft: "2px solid #ffffff",
                borderRight: "2px solid #ffffff",
                ...tabStyles,
              }}
            />
          </Tabs>
        </MathJaxContext>
        <ul
          style={{
            fontSize: fontSize,
            color: "var(--neon-orange)",
            marginTop: dimensions.height < 444 ? "5px" : "",
            marginLeft: "-10px",
          }}
        >
          <li>{explanations[tab]}</li>
        </ul>
      </div>
    </div>
  );
};

export default ValueOfInformation;
