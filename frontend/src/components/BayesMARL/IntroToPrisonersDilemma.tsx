import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Grid } from "@mui/material";
import { TextAlignCenter } from "@phosphor-icons/react";

interface PlaceholderProps {
  // Define the props for the component here
}

const IntroToPrisonersDilemma: React.FC<PlaceholderProps> = () => {
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

  const [selectedCell, setSelectedCell] = useState<number>(-1);

  const matrix = [
    { a: 3, b: 3 },
    { a: 0, b: 5 },
    { a: 5, b: 0 },
    { a: 1, b: 1 },
  ];

  const cellHeight =
    dimensions.width < 444 ? dimensions.width / 5 : dimensions.height / 10;
  const cellWidth =
    dimensions.width < 444 ? dimensions.width / 5 : dimensions.width / 8;

  const cellHeaderFontSize =
    dimensions.width < 444 ? cellHeight * 0.175 : cellHeight * 0.25;
  const cellContentFontSize =
    dimensions.width < 444 ? cellHeight * 0.175 : cellHeight * 0.225;

  const paperWidth = cellWidth * 3.1;
  const paperHeight = cellHeight * 3.1;

  const callToAction =
    dimensions.width < 444
      ? "Reward Matrix: tap a cell to see the action and result for each player"
      : "Reward Matrix: hover over a cell to see the action and result for each player";

  const fontStyle = {
    fontFamily: "SpaceGrotesk",
    color: "#000000",
  };

  const Cell: React.FC<{
    content: React.ReactNode;
    isHeader: boolean;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
  }> = ({ content, isHeader, onClick, onMouseEnter, onMouseLeave }) => (
    <div
      style={{
        border: "1px solid #ddd",
        // padding: "16px",
        height: cellHeight,
        width: cellWidth,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isHeader ? "#f5f5f5" : "#ffffff",
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {content}
    </div>
  );

  const handleCellClick = (index: number) => {
    setSelectedCell(index);
  };

  const handleCellHover = (index: number) => {
    setSelectedCell(index);
  };

  return (
    <div className="section" style={{ background: "#ffffff" }}>
      <div style={{ overflow: "hidden" }}>
        <h3 className="heading" style={{ textAlign: "center" }}>
          The Prisoner's Dilemma
        </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            elevation={20}
            sx={{
              p: 0.1,
              height: paperHeight,
              width: paperWidth,
              mt: 2,
              mb: 2,
              ml: 2,
              mr: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid
              container
              spacing={0}
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item>
                <Cell
                  content={
                    <Typography
                      variant="subtitle1"
                      fontSize={cellHeaderFontSize}
                      style={fontStyle}
                    >
                      A \ B
                    </Typography>
                  }
                  isHeader
                />
              </Grid>
              <Grid item>
                <Cell
                  content={
                    <Typography
                      variant="subtitle1"
                      fontSize={cellHeaderFontSize}
                      style={fontStyle}
                    >
                      Cooperate
                    </Typography>
                  }
                  isHeader
                />
              </Grid>
              <Grid item>
                <Cell
                  content={
                    <Typography
                      variant="subtitle1"
                      fontSize={cellHeaderFontSize}
                      style={fontStyle}
                    >
                      Defect
                    </Typography>
                  }
                  isHeader
                />
              </Grid>
              <Grid item>
                <Cell
                  content={
                    <Typography
                      variant="subtitle1"
                      fontSize={cellHeaderFontSize}
                      style={fontStyle}
                    >
                      Cooperate
                    </Typography>
                  }
                  isHeader
                />
              </Grid>
              <Grid item>
                <Cell
                  content={
                    <>
                      <Typography
                        fontSize={cellContentFontSize}
                        style={fontStyle}
                      >
                        {matrix[0].a} \ {matrix[0].b}
                      </Typography>
                    </>
                  }
                  isHeader={false}
                  onClick={() => handleCellClick(0)}
                  onMouseEnter={() => handleCellHover(0)}
                  onMouseLeave={() => handleCellHover(-1)}
                />
              </Grid>
              <Grid item>
                <Cell
                  content={
                    <>
                      <Typography
                        fontSize={cellContentFontSize}
                        style={fontStyle}
                      >
                        {matrix[1].a} \ {matrix[1].b}
                      </Typography>
                    </>
                  }
                  isHeader={false}
                  onClick={() => handleCellClick(1)}
                  onMouseEnter={() => handleCellHover(1)}
                  onMouseLeave={() => handleCellHover(-1)}
                />
              </Grid>
              <Grid item>
                <Cell
                  content={
                    <Typography
                      variant="subtitle1"
                      fontSize={cellHeaderFontSize}
                      style={fontStyle}
                    >
                      Defect
                    </Typography>
                  }
                  isHeader
                />
              </Grid>
              <Grid item>
                <Cell
                  content={
                    <>
                      <Typography
                        fontSize={cellContentFontSize}
                        style={fontStyle}
                      >
                        {matrix[2].a} \ {matrix[2].b}
                      </Typography>
                    </>
                  }
                  isHeader={false}
                  onClick={() => handleCellClick(2)}
                  onMouseEnter={() => handleCellHover(2)}
                  onMouseLeave={() => handleCellHover(-1)}
                />
              </Grid>
              <Grid item>
                <Cell
                  content={
                    <>
                      <Typography
                        fontSize={cellContentFontSize}
                        style={fontStyle}
                      >
                        {matrix[3].a} \ {matrix[3].b}
                      </Typography>
                    </>
                  }
                  isHeader={false}
                  onClick={() => handleCellClick(3)}
                  onMouseEnter={() => handleCellHover(3)}
                  onMouseLeave={() => handleCellHover(-1)}
                />
              </Grid>
            </Grid>
          </Paper>
        </div>
        <Typography
          variant="body2"
          textAlign="center"
          sx={{ mt: 1, color: "text.secondary" }}
          style={fontStyle}
        >
          {callToAction}
        </Typography>
        <p style={{ color: "#000000" }}>{selectedCell}</p>
      </div>
    </div>
  );
};

export default IntroToPrisonersDilemma;
