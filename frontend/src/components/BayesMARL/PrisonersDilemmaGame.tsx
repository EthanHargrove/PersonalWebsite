// External imports
import React, { useState, useEffect, CSSProperties } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  TooltipProps,
} from "recharts";
import {
  Box,
  Button,
  ButtonProps,
  Stack,
  List,
  ListItem,
  ListItemText,
  TextField,
  Paper,
  Autocomplete,
  Checkbox,
  ListSubheader,
  Popper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useNavigate } from "react-router-dom";

// Internal imports
import { apiCall } from "../../api/api";

function PrisonersDilemmaGame() {
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

  const [agentMove, setAgentMove] = useState("");
  const [oppMove, setOppMove] = useState("");
  const [agentReward, setAgentReward] = useState(0);
  const [totalAgentReward, setTotalAgentReward] = useState(0);
  const [oppReward, setOppReward] = useState(0);
  const [totalOppReward, setTotalOppReward] = useState(0);
  const [prior, setPrior] = useState([]);
  const [policyNames, setPolicyNames] = useState([]);
  const [priorPolicies, setPriorPolicies] = useState<string[]>([
    "First Tournament",
  ]);
  const [opponentPolicy, setOpponentPolicy] = useState("Manual");
  const [round, setRound] = useState(0);
  const [showPrior, setShowPrior] = useState(true);

  const initializeAgents = async () => {
    setAgentMove("");
    setAgentReward(0);
    setTotalAgentReward(0);
    setOppMove("");
    setOppReward(0);
    setTotalOppReward(0);
    setRound(0);
    const body = {
      policies: priorPolicies,
      opponent: opponentPolicy === "Manual" ? "Random" : opponentPolicy,
    };

    try {
      const response = await apiCall(
        "prisoners_dilemma/initialize",
        "POST",
        body
      );

      if (response) {
        setPrior(response.prior);
        setPolicyNames(response.policy_names);
      } else {
        console.log("no response");
      }
    } catch (error) {
      console.error("Error in initializeAgents:", error);
    }
  };

  useEffect(() => {
    initializeAgents();
  }, [priorPolicies, opponentPolicy]);

  const playRound = async (move?: string) => {
    let body;
    if (move) {
      body = { move: move };
    } else {
      body = {};
    }

    try {
      setAgentMove("?");
      setAgentReward(0);
      setOppMove("?");
      setOppReward(0);
      setRound(round + 1);
      const response = await apiCall("prisoners_dilemma/play", "POST", body);

      if (response) {
        setAgentMove(response.agent_move);
        setOppMove(response.opp_move);
        setPrior(response.prior);
        setAgentReward(response.agent_reward);
        setTotalAgentReward(totalAgentReward + response.agent_reward);
        setOppReward(response.opp_reward);
        setTotalOppReward(totalOppReward + response.opp_reward);
      } else {
        console.log("no response");
      }
    } catch (error) {
      console.error("Error in playRound:", error);
    }
  };

  const data = prior.map((value, index) => ({
    name: `${policyNames[index]}`,
    value: value,
  }));

  const agentImg =
    agentMove === "C"
      ? "./images/PrisonerACooperate.png"
      : agentMove === "D"
      ? "./images/PrisonerADefect.png"
      : agentMove === "?"
      ? "./images/PrisonerARest.png"
      : "./images/PrisonerARest.png";

  const oppImg =
    oppMove === "C"
      ? "./images/PrisonerBCooperate.png"
      : oppMove === "D"
      ? "./images/PrisonerBDefect.png"
      : oppMove === "?"
      ? "./images/PrisonerBRest.png"
      : "./images/PrisonerBRest.png";

  interface CustomTooltipProps extends TooltipProps<number, string> {
    active?: boolean;
    payload?: any[];
    label?: string;
  }

  const CustomTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            height: "auto",
            width: "auto",
            paddingLeft: "10px",
            paddingRight: "10px",
            backgroundColor: "rgba(30, 30, 30, 0.8)",
          }}
        >
          <p style={{ color: "#ffffff", marginBottom: "1px" }}>{label}</p>
          {payload.map((entry, index) => (
            <p
              key={`item-${index}`}
              style={{
                fontSize: 0.7 * fontSize,
                color: entry.color,
                marginTop: "1px",
              }}
            >
              <MathJaxContext>
                <MathJax inline dynamic>
                  {"\\(P(\\pi|h)\\)"}
                </MathJax>
              </MathJaxContext>
              : {entry.value.toFixed(4)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const policies = [
    "Cooperator",
    "Defector",
    "Grudger",
    "TitForTat",
    "Random",
    "TitFor2Tats",
    "Predator",
    "Bully",
    "FirstByAnonymous",
    "FirstByDavis",
    "FirstByDowning",
    "FirstByFeld",
    "FirstByGraaskamp",
    "FirstByGrofman",
    "FirstByJoss",
    "FirstByNydegger",
    "FirstByShubik",
    "FirstBySteinAndRapoport",
    "FirstByTidemanAndChieruzzi",
    "FirstByTullock",
  ];

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const navigate = useNavigate();

  const isDisabled = (option: string) => {
    const isSpecialOptionSelected = priorPolicies.some(
      (item) => !policies.includes(item)
    );
    // Disable all single policy options if a Group of policies is selected
    if (isSpecialOptionSelected && policies.includes(option)) {
      return true;
    }
    // If a group of policies is selected, disable other group of policies options
    if (!policies.includes(option) && priorPolicies.includes(option)) {
      return false;
    }
    return (
      priorPolicies.includes(option) &&
      priorPolicies.some((item) => !policies.includes(item))
    );
  };

  const StyledPopper = styled(Popper)(({ theme }) => ({
    "& .MuiAutocomplete-groupLabel": {
      backgroundColor: "var(--dark-grey)",
      color: "var(--neon-orange)",
    },
    "& .MuiAutocomplete-paper": {
      backgroundColor: "var(--dark-grey)",
    },
  }));

  const fontSize = Math.min(
    Math.min(0.05 * dimensions.width, 0.04 * dimensions.height),
    24
  );
  interface CustomButtonProps extends ButtonProps {
    colour: string;
  }
  const CustomStyledButton = styled(Button)<CustomButtonProps>(
    ({ theme, ...props }) => ({
      backgroundColor: "var(--dark-grey)",
      color: props.colour,
      border: `1px solid ${props.colour}`,
      borderRadius: theme.shape.borderRadius * 2,
      padding: "10px 24px",
      width: fontSize * 7,
      fontSize: fontSize * 0.5,
      maxWidth:
        opponentPolicy === "Manual"
          ? dimensions.width / 3.3
          : dimensions.width / 2.3,
      "&:hover": {
        backgroundColor: "#3C3C3C",
        color: props.colour,
        fontWeight: 700,
      },
    })
  );

  const mathJaxStyles = `
    .MathJax {
      font-size: ${0.7 * fontSize}px !important;
    }
    p {
      font-size: ${0.7 * fontSize}px !important;
}
  `;

  return (
    <>
      <style>{mathJaxStyles}</style>
      <Stack
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
        height={dimensions.height - 80}
        spacing={Math.min(dimensions.height, dimensions.width) < 444 ? 1 : 2}
        sx={{ marginTop: "20px", paddingTop: "10px", overflow: "hidden" }}
      >
        <Stack
          direction={dimensions.width < dimensions.height ? "column" : "row"}
          justifyContent="space-evenly"
          spacing={Math.min(dimensions.height, dimensions.width) < 444 ? 1 : 2}
          margin={2}
        >
          <Autocomplete
            multiple
            disablePortal
            disableClearable
            disableCloseOnSelect
            options={["First Tournament", "Representative Set", ...policies]}
            defaultValue={["First Tournament"]}
            size={dimensions.height < 444 ? "small" : "medium"}
            sx={{
              width:
                dimensions.width < dimensions.height
                  ? dimensions.width * 0.8
                  : Math.min(dimensions.width * 0.4, 500),
              "& .MuiAutocomplete-popupIndicator": {
                color: "var(--neon-orange)",
              },
              "& .MuiChip-root": {
                backgroundColor: "var(--neon-orange)",
                color: "var(--dark-grey)",
                borderRadius: "8px",
              },
              "& .MuiOutlinedInput-root": {
                // Outlined variant
                "& fieldset": {
                  borderColor: "var(--neon-orange)",
                },
                "&:hover fieldset": {
                  borderColor: "var(--neon-orange)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "var(--neon-orange)",
                },
              },
            }}
            value={priorPolicies}
            onChange={(event, newValue) => {
              const selectedFromGroup1 = newValue.some(
                (val) => !policies.includes(val)
              );

              if (selectedFromGroup1) {
                // If any item from group of policies is selected, clear the others and set only the group of policies item
                const onlyGroup1Selections = newValue.filter(
                  (val) => !policies.includes(val)
                );
                if (onlyGroup1Selections.length > 1) {
                  // Ensure only one item from group of policies item is selected
                  setPriorPolicies([onlyGroup1Selections[0]]);
                } else {
                  setPriorPolicies(onlyGroup1Selections);
                }
              } else {
                // Otherwise, allow normal multiple selection of individual policies
                setPriorPolicies(newValue);
              }
            }}
            groupBy={(option) => {
              return policies.includes(option)
                ? "Individual Policies"
                : "Sets of Policies";
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  background: "var(--dark-grey)",
                  "& .MuiInputLabel-root": { color: "var(--neon-orange)" },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "var(--neon-orange)",
                  },
                  "& .MuiInputBase-input": { color: "var(--neon-orange)" },
                }}
                label="Agent Prior Belief"
              />
            )}
            renderOption={(props, option, { selected }) => {
              const { ...optionProps } = props;
              return (
                <li
                  {...optionProps}
                  style={{
                    backgroundColor: selected ? "#000000" : "var(--dark-grey)",
                    color: "var(--neon-orange)",
                    padding: "8px 16px",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.backgroundColor =
                      "#3C3C3C")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.backgroundColor = selected
                      ? "#000000"
                      : "var(--dark-grey)")
                  }
                >
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8, color: "var(--neon-orange)" }}
                    checked={priorPolicies.includes(option)}
                    disabled={isDisabled(option)}
                  />
                  {option}
                </li>
              );
            }}
            PopperComponent={StyledPopper}
          />
          <Autocomplete
            disablePortal
            disableClearable
            options={["Manual", ...policies]}
            defaultValue="Manual"
            size={dimensions.height < 444 ? "small" : "medium"}
            sx={{
              width:
                dimensions.width < dimensions.height
                  ? dimensions.width * 0.8
                  : Math.min(dimensions.width * 0.4, 500),
              "& .MuiAutocomplete-popupIndicator": {
                color: "var(--neon-orange)",
              },
              "& .MuiOutlinedInput-root": {
                // Outlined variant
                "& fieldset": {
                  borderColor: "var(--neon-orange)",
                },
                "&:hover fieldset": {
                  borderColor: "var(--neon-orange)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "var(--neon-orange)",
                },
              },
            }}
            onChange={(event, newValue) => {
              setOpponentPolicy(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  background: "var(--dark-grey)",
                  "& .MuiInputLabel-root": { color: "var(--neon-orange)" },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "var(--neon-orange)",
                  },
                  "& .MuiInputBase-input": { color: "var(--neon-orange)" },
                }}
                label="Player 2 Policy"
              />
            )}
            renderOption={(props, option, { selected }) => {
              const { ...optionProps } = props;
              return (
                <li
                  {...optionProps}
                  style={{
                    backgroundColor: selected ? "#000000" : "var(--dark-grey)",
                    color: "var(--neon-orange)",
                    padding: "8px 16px",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.backgroundColor =
                      "#3C3C3C")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.backgroundColor = selected
                      ? "#000000"
                      : "var(--dark-grey)")
                  }
                >
                  {option}
                </li>
              );
            }}
            PopperComponent={StyledPopper}
          />
        </Stack>
        {dimensions.width > dimensions.height && (
          <Stack
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={1}
          >
            <Stack direction="column" alignItems="center" spacing={1}>
              <Box
                component="img"
                src={agentImg}
                sx={{
                  width: dimensions.height * 0.2,
                  height: dimensions.height * 0.2,
                }}
              />
              <p style={{ fontSize: fontSize, color: "var(--neon-orange)" }}>
                Agent Move: {agentMove}
              </p>
              {totalAgentReward === 0 ? (
                <p style={{ fontSize: fontSize, color: "var(--neon-orange)" }}>
                  Total reward: {totalAgentReward}
                </p>
              ) : (
                <p style={{ fontSize: fontSize, color: "var(--neon-orange)" }}>
                  Total reward:{" "}
                  {`${totalAgentReward - agentReward} + ${agentReward}`}
                </p>
              )}
            </Stack>
            <Stack direction="column" alignItems="center" spacing={1}>
              <p style={{ fontSize: fontSize, color: "var(--neon-orange)" }}>
                Round: {round}
              </p>
              <Stack
                direction={
                  dimensions.width < dimensions.height ? "column" : "row"
                }
                spacing={1}
              >
                {opponentPolicy === "Manual" ? (
                  <CustomStyledButton
                    colour="var(--neon-green)"
                    onClick={() => playRound("C")}
                  >
                    Cooperate
                  </CustomStyledButton>
                ) : (
                  <CustomStyledButton
                    colour="var(--neon-orange)"
                    onClick={() => playRound()}
                  >
                    Play Round
                  </CustomStyledButton>
                )}
                {opponentPolicy === "Manual" ? (
                  <CustomStyledButton
                    colour="#FF3131"
                    onClick={() => playRound("D")}
                  >
                    Defect
                  </CustomStyledButton>
                ) : (
                  <></>
                )}
                {showPrior ? (
                  <CustomStyledButton
                    colour="var(--neon-orange)"
                    onClick={() => setShowPrior(!showPrior)}
                  >
                    Hide Belief
                  </CustomStyledButton>
                ) : (
                  <CustomStyledButton
                    colour="var(--neon-orange)"
                    onClick={() => setShowPrior(!showPrior)}
                  >
                    Show Belief
                  </CustomStyledButton>
                )}
              </Stack>
              <Stack
                direction={
                  dimensions.width < dimensions.height ? "column" : "row"
                }
                spacing={1}
              >
                <CustomStyledButton
                  colour="var(--neon-orange)"
                  onClick={initializeAgents}
                >
                  Reset
                </CustomStyledButton>
                <CustomStyledButton
                  component="button"
                  colour="var(--neon-orange)"
                  onClick={() =>
                    navigate("/bayesian-multi-agent-reinforcement-learning")
                  }
                >
                  Explainer
                </CustomStyledButton>
              </Stack>
            </Stack>
            <Stack direction="column" alignItems="center" spacing={1}>
              <Box
                component="img"
                src={oppImg}
                sx={{
                  width: dimensions.height * 0.2,
                  height: dimensions.height * 0.2,
                }}
              />
              <p style={{ fontSize: fontSize, color: "var(--neon-orange)" }}>
                Player 2 Move: {oppMove}
              </p>
              {totalOppReward === 0 ? (
                <p style={{ fontSize: fontSize, color: "var(--neon-orange)" }}>
                  Total reward: {totalOppReward}
                </p>
              ) : (
                <p style={{ fontSize: fontSize, color: "var(--neon-orange)" }}>
                  Total reward: {`${totalOppReward - oppReward} + ${oppReward}`}
                </p>
              )}
            </Stack>
          </Stack>
        )}
        {dimensions.width < dimensions.height && (
          <Stack
            direction="column"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={1}
          >
            <p
              style={{
                marginBottom: "-35px",
                fontSize: fontSize,
                color: "var(--neon-orange)",
              }}
            >
              Round: {round}
            </p>
            <Stack direction="row" spacing={4}>
              <Stack direction="column" alignItems="center" spacing={1}>
                <Box
                  component="img"
                  src={agentImg}
                  sx={{
                    width: dimensions.height * 0.2,
                    height: dimensions.height * 0.2,
                  }}
                />
                <p style={{ fontSize: fontSize, color: "var(--neon-orange)" }}>
                  Agent Move: {agentMove}
                </p>
                {totalAgentReward === 0 ? (
                  <p
                    style={{ fontSize: fontSize, color: "var(--neon-orange)" }}
                  >
                    Total reward: {totalAgentReward}
                  </p>
                ) : (
                  <p
                    style={{ fontSize: fontSize, color: "var(--neon-orange)" }}
                  >
                    Total reward:{" "}
                    {`${totalAgentReward - agentReward} + ${agentReward}`}
                  </p>
                )}
              </Stack>
              <Stack direction="column" alignItems="center" spacing={1}>
                <Box
                  component="img"
                  src={oppImg}
                  sx={{
                    width: dimensions.height * 0.2,
                    height: dimensions.height * 0.2,
                  }}
                />
                <p style={{ fontSize: fontSize, color: "var(--neon-orange)" }}>
                  Player 2 Move: {oppMove}
                </p>
                {totalOppReward === 0 ? (
                  <p
                    style={{ fontSize: fontSize, color: "var(--neon-orange)" }}
                  >
                    Total reward: {totalOppReward}
                  </p>
                ) : (
                  <p
                    style={{ fontSize: fontSize, color: "var(--neon-orange)" }}
                  >
                    Total reward:{" "}
                    {`${totalOppReward - oppReward} + ${oppReward}`}
                  </p>
                )}
              </Stack>
            </Stack>
            <Stack direction="column" alignItems="center" spacing={1}>
              <Stack direction={"row"} spacing={1}>
                {opponentPolicy === "Manual" ? (
                  <CustomStyledButton
                    colour="var(--neon-green)"
                    onClick={() => playRound("C")}
                  >
                    Cooperate
                  </CustomStyledButton>
                ) : (
                  <CustomStyledButton
                    colour="var(--neon-orange)"
                    onClick={() => playRound()}
                  >
                    Play Round
                  </CustomStyledButton>
                )}
                {opponentPolicy === "Manual" ? (
                  <CustomStyledButton
                    colour="#FF3131"
                    onClick={() => playRound("D")}
                  >
                    Defect
                  </CustomStyledButton>
                ) : (
                  <></>
                )}
                {showPrior ? (
                  <CustomStyledButton
                    colour="var(--neon-orange)"
                    onClick={() => setShowPrior(!showPrior)}
                  >
                    Hide Belief
                  </CustomStyledButton>
                ) : (
                  <CustomStyledButton
                    colour="var(--neon-orange)"
                    onClick={() => setShowPrior(!showPrior)}
                  >
                    Show Belief
                  </CustomStyledButton>
                )}
              </Stack>
              <Stack direction={"row"} spacing={1}>
                <CustomStyledButton
                  colour="var(--neon-orange)"
                  onClick={initializeAgents}
                >
                  Reset
                </CustomStyledButton>
                <CustomStyledButton
                  component="button"
                  colour="var(--neon-orange)"
                  onClick={() =>
                    navigate("/bayesian-multi-agent-reinforcement-learning")
                  }
                >
                  Explainer
                </CustomStyledButton>
              </Stack>
            </Stack>
          </Stack>
        )}
        <div
          style={{
            height: dimensions.height * 0.2,
            width:
              dimensions.width < dimensions.height ? dimensions.width : "auto",
          }}
        >
          {showPrior && (
            <BarChart
              width={
                dimensions.width < dimensions.height
                  ? dimensions.width * 0.95
                  : dimensions.width * 0.8
              }
              height={250}
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: -10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={false} />
              <YAxis fontSize={0.5 * fontSize} />
              <Tooltip content={<CustomTooltip />} position={{ y: 0 }} />
              <Bar dataKey="value" fill="var(--neon-orange)" />
            </BarChart>
          )}
        </div>
      </Stack>
    </>
  );
}

export default PrisonersDilemmaGame;
