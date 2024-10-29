import React, { useState, useEffect } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { Stack } from "@mui/material";

interface PlaceholderProps {
  // Define the props for the component here
}

const HBA: React.FC<PlaceholderProps> = () => {
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
    marginLeft: "-10px",
    userSelect: "none",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
  };

  const matrices = [
    [["P(\\pi_1|h)", "P(\\pi_2|h)"]],
    [
      ["\\pi_1(C|h)", "\\pi_1(D|h)"],
      ["\\pi_2(C|h)", "\\pi_2(D|h)"],
    ],
    [
      [
        "3 + \\text{max}[Q(h_A+C,\\; h_O+C,\\; d-1)]",
        "5+\\text{max}[Q(h_A+D,\\; h_O+C,\\; d-1)]",
      ],
      [
        "0+\\text{max}[Q(h_A+C,\\; h_O+D,\\; d-1)]",
        "1+\\text{max}[Q(h_A+D,\\; h_O+D,\\; d-1)]",
      ],
    ],
    [["0", "0"]],
  ];

  const generateLatexMatrixNoLabels = (
    matrix: string[][],
    big: boolean
  ): string => {
    let latex = big ? "\\Biggl[" : "\\left[";
    latex += "\\begin{array}{ccc}\n"; // Adjust to fit the number of columns dynamically
    matrix.forEach((row) => {
      latex += row.join(" & ") + " \\\\\n"; // Add matrix row values
    });
    latex += "\\end{array}";
    latex += big ? "\\Biggr]" : "\\right]";
    return latex;
  };

  const latexExpression = `
    Q(h_A,\\; h_O,\\; d) =
    ${generateLatexMatrixNoLabels(matrices[0], false)} 
    \\bullet
    ${generateLatexMatrixNoLabels(matrices[1], true)} 
    \\bullet
    ${generateLatexMatrixNoLabels(matrices[2], true)}
  `;

  const latexExpression2 = `
    Q(H_A,\\; H_O,\\; 0) =
    ${generateLatexMatrixNoLabels(matrices[3], false)}
  `;

  const titleFontSize =
    Math.min(dimensions.width, dimensions.height) < 444 ? "0.9rem" : "1.8rem";

  const fontSize =
    Math.min(dimensions.width, dimensions.height) < 444 ? "0.6rem" : "1.2rem";

  const mathFontSizeMedium = dimensions.width < 444 ? "\\Tiny" : "\\large";

  const mathFontSizeSmall = dimensions.width < 444 ? "\\tiny" : "\\normalsize";

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
        <Stack justifyContent="space-evenly" alignItems="center" spacing={0}>
          <h3
            className="heading"
            style={{ textAlign: "center", fontSize: titleFontSize }}
          >
            HBA Implementation for the Prisoner's Dilemma
          </h3>
          <p style={{ fontSize: fontSize }}>
            Recall the original Value of Information (VI) equation:
          </p>
          <MathJaxContext>
            <MathJax dynamic={true} style={fontStyle}>
              {`\\[${mathFontSizeMedium} \\text{VI}_i(a_i|h) = \\sum_{\\pi_{-i} \\in \\Pi_{-i}} P(\\pi_{-i}|h) \\sum_{a_{-i} \\in A_{-i}} Q_i(h, \\langle a_i, a_{-i} \\rangle) \\prod_{j \\neq i} \\pi_{j}(a_{j}|h)\\]`}
            </MathJax>
            <MathJax dynamic={true} style={fontStyle}>
              {`\\[${mathFontSizeMedium} Q_i(h, a) = \\sum_{s^{\\prime} \\in S}\\mathcal{T}(s^{\\prime}|s(h),a)\\biggl[R_i(s(h), a, s^{\\prime}) + \\gamma \\; \\text{max}_{a_i^{\\prime} \\in A_i} \\text{VI}_i(a_i^{\\prime}|\\langle h, a, s^{\\prime}\\rangle)\\biggr]\\]`}
            </MathJax>
            <p style={{ fontSize: fontSize }}>
              expected value = belief over opponent's policy • action
              probabilities for opponent's potential policies • (immediate
              reward + discounted expected value of next state)
            </p>
            <p style={{ fontSize: fontSize }}>
              Example implementation where opponent is believed to have 2
              possible policies (
              <MathJax inline dynamic={true} style={fontStyle}>
                {`\\(\\pi_1 \\)`}
              </MathJax>{" "}
              &{" "}
              <MathJax inline dynamic={true} style={fontStyle}>
                {`\\(\\pi_2 \\)`}
              </MathJax>
              ):
            </p>
            <MathJax inline dynamic={true} style={fontStyle}>
              {`\\[${mathFontSizeSmall} ${latexExpression} \\]`}
            </MathJax>
            <MathJax inline dynamic={true} style={fontStyle}>
              {`\\[${mathFontSizeMedium} ${latexExpression2} \\]`}
            </MathJax>
          </MathJaxContext>
        </Stack>
      </div>
    </div>
  );
};

export default HBA;
