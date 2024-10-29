import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Grid, Stack } from "@mui/material";

interface IntroToPrisonersDilemmaProps {
  fullpageApi: any;
}

function IntroToPrisonersDilemma({
  fullpageApi,
}: IntroToPrisonersDilemmaProps) {
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

  useEffect(() => {
    if (fullpageApi) {
      fullpageApi.moveTo(1);
    }
  }, [fullpageApi]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        fullpageApi.moveSectionDown();
      } else if (event.key === "ArrowUp") {
        fullpageApi.moveSectionUp();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [fullpageApi]);

  const [selectedCell, setSelectedCell] = useState<number>(-1);

  const matrix = [
    { a: 3, b: 3 },
    { a: 0, b: 5 },
    { a: 5, b: 0 },
    { a: 1, b: 1 },
  ];

  const cellWidth: number = Math.min(
    dimensions.width < 444 ? dimensions.width / 5 : dimensions.width / 8,
    dimensions.height / 6.5
  );

  const cellHeight: number = Math.min(
    dimensions.width < 444 ? dimensions.width / 6 : dimensions.height / 10,
    dimensions.height / 16
  );

  const cellHeaderFontSize: number =
    dimensions.width < 444 ? cellHeight * 0.18 : cellHeight * 0.29;
  const cellContentFontSize: number =
    dimensions.width < 444 ? cellHeight * 0.18 : cellHeight * 0.29;
  const rewardTextFontSize: number =
    Math.min(dimensions.width, dimensions.height) < 444
      ? cellWidth * 0.15
      : cellWidth * 0.125;
  const callToActionFontSize: number =
    Math.min(dimensions.width, dimensions.height) < 444
      ? cellWidth * 0.115
      : cellWidth * 0.09;
  const titleFontSize: number =
    dimensions.width < 444
      ? 1.5 * rewardTextFontSize
      : dimensions.height * 0.04;

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
      ? 0
      : selectedCell === 3
      ? 1
      : " ";

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
          paddingLeft: dimensions.width < 444 ? "1px" : "30px",
          paddingRight: dimensions.width < 444 ? "10px" : "35px",
          paddingBottom: "5px",
          paddingTop: "0px",
          marginTop: dimensions.height < dimensions.width ? "15px" : "20px",
        }}
      >
        <h3
          className="heading"
          style={{
            color: "#ffffff",
            textAlign: "center",
            marginBottom: dimensions.width < 444 ? 0 : -20,
            paddingBottom: dimensions.width < 444 ? 0 : -20,
            // marginTop: 20,
            // paddingTop: 20,
            fontSize: titleFontSize,
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
              color: "#ffffff",
              fontSize: rewardTextFontSize,
            }}
          >
            Two individuals must simultaneously choose to cooperate or defect
            without knowing the other's decision
          </li>
          <li
            style={{
              color: "#ffffff",
              fontSize: rewardTextFontSize,
            }}
          >
            The <strong>Socially Optimal Outcome</strong> is the scenario that
            maximizes total collective reward. Here this is achieved when both
            players <strong>cooperate</strong>.
          </li>
          <li
            style={{
              color: "#ffffff",
              fontSize: rewardTextFontSize,
            }}
          >
            A <strong>Nash Equilibrium</strong> is a situation where no player
            can improve their outcome by changing their strategy alone. Here
            this occurs when both players <strong>defect</strong>.
          </li>
        </ul>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom:
              dimensions.width < 444 ? dimensions.height * 0.001 : -5,
            paddingBottom:
              dimensions.width < 444 ? dimensions.height * 0.001 : -5,
          }}
        >
          <Stack spacing={0} justifyContent="flex-end">
            <Box
              component="img"
              src={prisonerAImg}
              sx={{
                width: Math.min(cellWidth * 1.45, dimensions.height * 0.18),
                height: Math.min(cellWidth * 1.45, dimensions.height * 0.18),
              }}
            />
            <p
              style={{
                fontSize: rewardTextFontSize,
                color: "#ffffff",
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
                width: Math.min(cellWidth * 1.45, dimensions.height * 0.18),
                height: Math.min(cellWidth * 1.45, dimensions.height * 0.18),
              }}
            />
            <p
              style={{
                fontSize: rewardTextFontSize,
                color: "#ffffff",
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
            marginTop: 0,
            paddingTop: 0,
          }}
        >
          <Paper
            elevation={20}
            sx={{
              p: 0.1,
              height: paperHeight,
              width: paperWidth,
              mt: 1,
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
            mt: -1,
            color: "#ffffff",
            fontFamily: "SpaceGrotesk",
          }}
        >
          {callToAction}
        </Typography>
      </div>
    </div>
  );
}

export default IntroToPrisonersDilemma;
