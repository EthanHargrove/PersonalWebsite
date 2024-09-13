import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Grid, Stack } from "@mui/material";

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

  const cellWidth: number = Math.min(
    dimensions.width < 444 ? dimensions.width / 5 : dimensions.width / 8,
    dimensions.height / 5
  );

  const cellHeight: number = Math.min(
    dimensions.width < 444 ? dimensions.width / 5 : dimensions.height / 10,
    dimensions.height / 11
  );

  const cellHeaderFontSize: number =
    dimensions.width < 444 ? cellHeight * 0.175 : cellHeight * 0.25;
  const cellContentFontSize: number =
    dimensions.width < 444 ? cellHeight * 0.175 : cellHeight * 0.225;
  const rewardTextFontSize: number =
    dimensions.width < 444 ? cellWidth * 0.155 : cellWidth * 0.125;
  const callToActionFontSize: number =
    dimensions.width < 444 ? cellWidth * 0.11 : cellWidth * 0.09;

  const paperWidth = cellWidth * 3 + 10;
  const paperHeight = cellHeight * 3 + 10;

  const callToAction =
    dimensions.width < 444
      ? "Reward Matrix: tap a cell to see the action and result for each player"
      : "Reward Matrix: hover over a cell to see the action and result for each player";

  const fontStyle = {
    fontFamily: "SpaceGrotesk",
    color: "#000000",
    textShadow:
      "1px 1px 0 #FFFFFF, -1px -1px 0 #FFFFFF, 1px -1px 0 #FFFFFF, -1px 1px 0 #FFFFFF",
  };

  const Cell: React.FC<{
    content: React.ReactNode;
    isHeader: boolean;
    cellNumber: number;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
  }> = ({
    content,
    isHeader,
    cellNumber,
    onClick,
    onMouseEnter,
    onMouseLeave,
  }) => (
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
        // background:
        //   "linear-gradient(-45deg, #4584B6 0 56.5%, #FFDE57 59.5% 100%)",
        background: isHeader
          ? "#f0ce8f"
          : cellNumber === 0
          ? "#1aff1a"
          : cellNumber === 1
          ? `linear-gradient(to top right, #1aff1a 0 48.25%, #ff1a1a 51.75% 100%)`
          : cellNumber === 2
          ? `linear-gradient(to top right, #ff1a1a 0 48.25%, #1aff1a 51.75% 100%)`
          : cellNumber === 3
          ? "#ff1a1a"
          : "#f5f5f5",
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

  const prisonerAImg =
    selectedCell === 0
      ? "./images/PrisonerACooperate.png"
      : selectedCell === 1
      ? "./images/PrisonerACooperate.png"
      : selectedCell === 2
      ? "./images/PrisonerADefect.png"
      : selectedCell === 3
      ? "./images/PrisonerADefect.png"
      : "./images/PrisonerARest.png";

  const prisonerBImg =
    selectedCell === 0
      ? "./images/PrisonerBCooperate.png"
      : selectedCell === 1
      ? "./images/PrisonerBDefect.png"
      : selectedCell === 2
      ? "./images/PrisonerBCooperate.png"
      : selectedCell === 3
      ? "./images/PrisonerBDefect.png"
      : "./images/PrisonerBRest.png";

  const prisonerAReward =
    selectedCell === 0
      ? 3
      : selectedCell === 1
      ? 0
      : selectedCell === 2
      ? 5
      : selectedCell === 3
      ? 1
      : " ";

  const prisonerBReward =
    selectedCell === 0
      ? 3
      : selectedCell === 1
      ? 5
      : selectedCell === 2
      ? 5
      : selectedCell === 3
      ? 1
      : " ";

  return (
    <div className="section" style={{ background: "#ffffff", zIndex: -12 }}>
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
          background: "rgba(0, 0, 0, 0.4)",
          // width: dimensions.width < 444 ? "92vw" : "85vw",
          // height: dimensions.width < 444 ? "480px" : "82vh",
          paddingLeft: dimensions.width < 444 ? "1px" : "30px",
          paddingRight: dimensions.width < 444 ? "10px" : "35px",
          paddingBottom: "20px",
          marginTop: "30px",
        }}
      >
        <h3
          className="heading"
          style={{
            color: "var(--neon-orange)",
            textAlign: "center",
            marginBottom: dimensions.width < 444 ? 0 : -10,
            paddingBottom: dimensions.width < 444 ? 0 : -10,
            // marginTop: 20,
            // paddingTop: 20,
            fontSize:
              dimensions.width < 444
                ? 1.5 * rewardTextFontSize
                : 2 * rewardTextFontSize,
          }}
        >
          The Prisoner's Dilemma
        </h3>
        <ul
          style={{
            marginBottom:
              dimensions.width < 444 ? dimensions.height * 0.005 : 0,
            paddingBottom:
              dimensions.width < 444 ? dimensions.height * 0.005 : 0,
          }}
        >
          <li
            style={{
              color: "var(--neon-orange)",
              fontSize: rewardTextFontSize,
            }}
          >
            Two individuals must simultaneously choose to cooperate or defect
            without knowing the other's decision
          </li>
          <li
            style={{
              color: "var(--neon-orange)",
              fontSize: rewardTextFontSize,
            }}
          >
            Complexity can be increased by playing for multiple rounds and
            adding a chance that a player's intended action is misinterpreted
          </li>
        </ul>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom:
              dimensions.width < 444 ? dimensions.height * 0.001 : 0,
            paddingBottom:
              dimensions.width < 444 ? dimensions.height * 0.001 : 0,
          }}
        >
          <Stack spacing={0} justifyContent="flex-end">
            <Box
              component="img"
              src={prisonerAImg}
              sx={{
                width: Math.min(cellWidth * 1.5, dimensions.height * 0.25),
                height: Math.min(cellWidth * 1.5, dimensions.height * 0.25),
              }}
            />
            <p
              style={{
                fontSize: rewardTextFontSize,
                color: "var(--neon-orange)",
                textAlign: "center",
                padding: 0,
                margin: "3px 0px 0px 0px",
              }}
            >
              {`reward: ${prisonerAReward}`}{" "}
            </p>
          </Stack>
          <Stack>
            <Box
              component="img"
              src={prisonerBImg}
              sx={{
                width: Math.min(cellWidth * 1.5, dimensions.height * 0.25),
                height: Math.min(cellWidth * 1.5, dimensions.height * 0.25),
              }}
            />
            <p
              style={{
                fontSize: rewardTextFontSize,
                color: "var(--neon-orange)",
                textAlign: "center",
                padding: 0,
                margin: "3px 0px 0px 0px",
              }}
            >
              {`reward: ${prisonerBReward}`}
            </p>
          </Stack>
        </div>
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
              background: "#ddd",
            }}
          >
            <Grid
              container
              spacing={0}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                background: "transparent",
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
                  cellNumber={-1}
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
                  cellNumber={-1}
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
                  cellNumber={-1}
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
                  cellNumber={-1}
                />
              </Grid>
              <Grid item>
                <Cell
                  content={
                    <>
                      <Typography
                        fontSize={cellContentFontSize}
                        style={{ letterSpacing: 2, ...fontStyle }}
                      >
                        {matrix[0].a} \ {matrix[0].b}
                      </Typography>
                    </>
                  }
                  isHeader={false}
                  onClick={() => handleCellClick(0)}
                  onMouseEnter={() => handleCellHover(0)}
                  onMouseLeave={() => handleCellHover(-1)}
                  cellNumber={0}
                />
              </Grid>
              <Grid item>
                <Cell
                  content={
                    <>
                      <Typography
                        fontSize={cellContentFontSize}
                        style={{ letterSpacing: 2, ...fontStyle }}
                      >
                        {matrix[1].a} \ {matrix[1].b}
                      </Typography>
                    </>
                  }
                  isHeader={false}
                  onClick={() => handleCellClick(1)}
                  onMouseEnter={() => handleCellHover(1)}
                  onMouseLeave={() => handleCellHover(-1)}
                  cellNumber={1}
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
                  cellNumber={-1}
                />
              </Grid>
              <Grid item>
                <Cell
                  content={
                    <>
                      <Typography
                        fontSize={cellContentFontSize}
                        style={{ letterSpacing: 2, ...fontStyle }}
                      >
                        {matrix[2].a} \ {matrix[2].b}
                      </Typography>
                    </>
                  }
                  isHeader={false}
                  onClick={() => handleCellClick(2)}
                  onMouseEnter={() => handleCellHover(2)}
                  onMouseLeave={() => handleCellHover(-1)}
                  cellNumber={2}
                />
              </Grid>
              <Grid item>
                <Cell
                  content={
                    <>
                      <Typography
                        fontSize={cellContentFontSize}
                        style={{ letterSpacing: 2, ...fontStyle }}
                      >
                        {matrix[3].a} \ {matrix[3].b}
                      </Typography>
                    </>
                  }
                  isHeader={false}
                  onClick={() => handleCellClick(3)}
                  onMouseEnter={() => handleCellHover(3)}
                  onMouseLeave={() => handleCellHover(-1)}
                  cellNumber={3}
                />
              </Grid>
            </Grid>
          </Paper>
        </div>
        <Typography
          variant="body2"
          textAlign="center"
          fontSize={callToActionFontSize}
          sx={{
            mt: 1,
            color: "var(--neon-orange)",
            fontFamily: "SpaceGrotesk",
          }}
        >
          {callToAction}
        </Typography>
      </div>
    </div>
  );
};

export default IntroToPrisonersDilemma;
