import React, { useCallback, useState, useEffect } from "react";
import { Stage, Layer, Rect, Text, Arrow, Line, Image } from "react-konva";
import { Tooltip } from "@mui/material";
import useImage from "use-image";
import { MathJax, MathJaxContext } from "better-react-mathjax";

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
    fontSize: Math.min(dimensions.width * 0.03, dimensions.height * 0.0225),
    paddingBottom: "10px",
    userSelect: "none",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
  };

  const matrices = [
    [["P(\\pi_1)", "P(\\pi_2)"]],
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

  const rowLabels = [
    ["P(π)"],
    ["π_1", "π_2"],
    ["Q(\\odot, H_O+C)", "Q(\\mathord{\\bullet},H_O+D)"],
  ];

  const columnLabels = [
    ["π1", "π2"],
    ["P(C|H_O)", "P(D|H_O)"],
    ["Q(H_A+C,)", "Q(H_A+D,)"],
  ];

  const generateLatexMatrix = (
    matrix: number[][],
    rowLabels: string[],
    columnLabels: string[]
  ): string => {
    let latex =
      "\\left[ \\begin{array}{c|" + "c".repeat(columnLabels.length) + "}\n";

    // Add column labels as LaTeX expressions (without \text{})
    latex += " & " + columnLabels.join(" & ") + " \\\\\n";
    latex += "\\hline\n";

    // Add each row with LaTeX row labels and matrix values
    matrix.forEach((row, rowIndex) => {
      latex += `${rowLabels[rowIndex]} & ` + row.join(" & ") + " \\\\\n";
    });

    latex += "\\end{array} \\right]";
    return latex;
  };

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
    Q(H_A,\\; H_O,\\; d) =
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

  return (
    <div className="section" style={{ background: "#ffffff" }}>
      <div style={{ overflow: "hidden" }}>
        <h3 className="heading" style={{ textAlign: "center" }}>
          Harsanyi–Bellman Ad Hoc Coordination (HBA)
        </h3>
        <MathJaxContext>
          <MathJax inline dynamic={true} style={fontStyle}>
            {`\\[ ${latexExpression} \\]`}
            {`\\[ ${latexExpression2} \\]`}
          </MathJax>
        </MathJaxContext>
      </div>
    </div>
  );
};

export default HBA;
