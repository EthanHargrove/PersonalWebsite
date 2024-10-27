import React, { useState, useEffect } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";

interface BeliefOverPoliciesProps {
  // Define the props for the component here
}

const BeliefOverPolicies: React.FC<BeliefOverPoliciesProps> = () => {
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
    Math.min(dimensions.width, dimensions.height) < 444 ? "1.2rem" : "2.2rem";

  const fontSize =
    Math.min(dimensions.width, dimensions.height) < 444 ? "0.8rem" : "1.5rem";

  const mathFontSize =
    Math.min(dimensions.height, dimensions.width) < 444
      ? "\\normalsize"
      : "\\Large";

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
          color: "var(--neon-orange)",
          background: "rgba(0, 0, 0, 0.66)",
          padding: "5px",
        }}
      >
        <h3
          className="heading"
          style={{
            fontSize: titleFontSize,
            textAlign: "center",
          }}
        >
          Belief Over Policies
        </h3>
        <MathJaxContext>
          <ul
            style={{
              fontSize: fontSize,
              marginBottom: dimensions.height > 444 ? "" : "-10px",
            }}
          >
            <li>
              Use Bayes' theorem to update our belief of the other agent's
              policy for a discrete set of policies:
            </li>
          </ul>
          <MathJax inline dynamic={true}>
            {`\\[${mathFontSize} P(\\pi_j \\mid h_{t+1}) = \\frac{\\pi_j(a_t \\mid h_t) \\; P(\\pi_j \\mid h_t)}{\\sum_{\\pi \\in \\Pi} \\pi_j(a_t \\mid h_t) \\; P(\\pi_j \\mid h_t)} \\]`}
          </MathJax>
          <ul
            style={{
              fontSize: fontSize,
              marginTop: dimensions.height > 444 ? "" : "0px",
            }}
          >
            <li style={{ marginBottom: liGap }}>
              <MathJax inline dynamic={true}>
                {`\\(${mathFontSize} P(\\pi_j \\mid h_{t+1})\\)`}
              </MathJax>
              : posterior probability the other agent is using policy{" "}
              <MathJax inline dynamic={true}>
                {`\\(${mathFontSize} \\pi_j \\in \\Pi\\)`}
              </MathJax>{" "}
              given the history{" "}
              <MathJax inline dynamic={true}>
                {`\\(${mathFontSize} h_{t+1}\\)`}
              </MathJax>
            </li>
            <li style={{ marginBottom: liGap }}>
              <MathJax inline dynamic={true}>
                {`\\(${mathFontSize} \\pi_j(a_t \\mid h_t)\\)`}
              </MathJax>
              : probability that an agent using policy{" "}
              <MathJax inline dynamic={true}>
                {`\\(${mathFontSize} \\pi_j\\)`}
              </MathJax>{" "}
              would take their most recent action,{" "}
              <MathJax inline dynamic={true}>
                {`\\(${mathFontSize} a_t\\)`}
              </MathJax>
              , given the history up to that point,{" "}
              <MathJax inline dynamic={true}>
                {`\\(${mathFontSize} h_t\\)`}
              </MathJax>
            </li>
            <li style={{ marginBottom: liGap }}>
              <MathJax inline dynamic={true}>
                {`\\(${mathFontSize} P(\\pi_j \\mid h)\\)`}
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
                {`\\(${mathFontSize} \\sum_{\\pi \\in \\Pi} \\pi_j(a_t \\mid h_t) \\; P(\\pi_j \\mid h_t)\\)`}
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
