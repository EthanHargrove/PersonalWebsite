import React, { useState, useEffect } from "react";
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

  const titleFontSize =
    Math.min(dimensions.width, dimensions.height) < 444 ? "0.9rem" : "2rem";

  const fontSize =
    Math.min(dimensions.width, dimensions.height) < 444 ? "0.9rem" : "1.5rem";

  const mathFontSize = dimensions.width < 444 ? "\\normalsize" : "\\Large";

  const fontStyle: React.CSSProperties = {
    paddingBottom: "10px",
    userSelect: "none",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
  };

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
          paddingRight: "5px",
          paddingLeft: "5px",
        }}
      >
        <h3
          className="heading"
          style={{
            textAlign: "center",
            fontSize: titleFontSize,
            color: "var(--neon-orange)",
          }}
        >
          Harsanyi–Bellman Ad Hoc Coordination (HBA)
        </h3>
        <ul
          style={{
            fontSize: fontSize,
            color: "var(--neon-orange)",
            marginLeft: "-20px",
          }}
        >
          <li>
            <a
              href={"http://www.dklevine.com/archive/refs41175.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--neon-orange)" }}
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
              style={{ color: "var(--neon-orange)" }}
            >
              Bellman (1954)
            </a>{" "}
            determined the value of a decision problem by its immediate payoff
            from a decision and the expected future payoffs, discounted over
            time. This is known as the Bellman equation, and is a foundational
            concept in reinforcement learning.
            <MathJaxContext>
              <MathJax style={{ marginLeft: "-20px", ...fontStyle }}>
                {`\\[${mathFontSize} V^{\\pi}(s_t) = R\\bigl(s_t, \\pi(s_t)\\bigr) + \\gamma \\sum_{s_{t+1}} P(s_{t+1} \\mid s_t, a_t) V^{\\pi}(s_{t+1})\\]`}
              </MathJax>
            </MathJaxContext>
          </li>
          <li style={{ marginTop: -10, paddingTop: -10 }}>
            <a
              href={"https://arxiv.org/abs/1506.01170"}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--neon-orange)" }}
            >
              Albrecht & Ramamoorthy (2013)
            </a>{" "}
            combined these two concepts to create the Harsanyi–Bellman Ad Hoc
            Coordination (HBA) algorithm.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HBAIntro;
