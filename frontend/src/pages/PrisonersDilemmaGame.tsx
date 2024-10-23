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
  Stack,
  List,
  ListItem,
  ListItemText,
  TextField,
  Paper,
  Autocomplete,
  Checkbox,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { MathJax, MathJaxContext } from "better-react-mathjax";

// Internal imports
import { apiCall } from "../api/api";
import Navbar from "../components/Navbar";

function PrisonersDilemmaGame() {
  useEffect(() => {
    // Change document title
    document.title = "Ethan Hargrove - Prisoners Dilemma";
  }, []);
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
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <p style={{ color: "#804A00" }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
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

  const [hoveredOption, setHoveredOption] = React.useState(null);

  const handleMouseEnter = (option: any) => {
    setHoveredOption(option);
  };

  const handleMouseLeave = () => {
    setHoveredOption(null);
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
      <Navbar active="" />
      <Stack
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
        height={dimensions.height * 0.9}
        spacing={2}
        sx={{ marginTop: "60px" }}
      >
        <h1 style={{ color: "var(--neon-orange)" }}>Prisoners Dilemma Game</h1>
        <Stack
          direction="row"
          justifyContent="space-evenly"
          spacing={2}
          margin={2}
        >
          <Autocomplete
            multiple
            disablePortal
            disableClearable
            disableCloseOnSelect
            options={["First Tournament", "Representative Set", ...policies]}
            defaultValue={["First Tournament"]}
            sx={{
              width: 500,
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
                  onMouseEnter={() => handleMouseEnter(option)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    backgroundColor: selected
                      ? "#000000"
                      : hoveredOption === option
                      ? "lightgray"
                      : "var(--dark-grey)",
                    color: "var(--neon-orange)",
                    padding: "8px 16px",
                    cursor: "pointer",
                  }}
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
          />
          <Autocomplete
            disablePortal
            disableClearable
            options={["Manual", ...policies]}
            defaultValue="Manual"
            sx={{ width: 500, backgroundColor: "white" }}
            onChange={(event, newValue) => {
              setOpponentPolicy(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Player 2 Policy" />
            )}
          />
        </Stack>
        <p style={{ color: "var(--neon-orange)" }}>Round: {round}</p>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Stack direction="column" spacing={2}>
            <Box
              component="img"
              src={agentImg}
              sx={{
                width: dimensions.height * 0.18,
                height: dimensions.height * 0.18,
              }}
            />
            <p style={{ color: "var(--neon-orange)" }}>
              Agent Move: {agentMove}
            </p>
            {totalAgentReward === 0 ? (
              <p style={{ color: "var(--neon-orange)" }}>
                Total reward: {totalAgentReward}
              </p>
            ) : (
              <p style={{ color: "var(--neon-orange)" }}>
                Total reward:{" "}
                {`${totalAgentReward - agentReward} + ${agentReward}`}
              </p>
            )}
          </Stack>
          <Stack direction="column" spacing={2}>
            {opponentPolicy === "Manual" ? (
              <Button onClick={() => playRound("C")}>Cooperate</Button>
            ) : (
              <Button onClick={() => playRound()}>Play Round</Button>
            )}
            {opponentPolicy === "Manual" ? (
              <Button onClick={() => playRound("D")}>Defect</Button>
            ) : (
              <></>
            )}
            {showPrior ? (
              <Button onClick={() => setShowPrior(!showPrior)}>
                Hide Prior
              </Button>
            ) : (
              <Button onClick={() => setShowPrior(!showPrior)}>
                Show Prior
              </Button>
            )}
            <Button onClick={initializeAgents}>Reset</Button>
          </Stack>
          <Stack direction="column" spacing={2}>
            <Box
              component="img"
              src={oppImg}
              sx={{
                width: dimensions.height * 0.18,
                height: dimensions.height * 0.18,
              }}
            />
            <p style={{ color: "var(--neon-orange)" }}>
              Player 2 Move: {oppMove}
            </p>
            {totalOppReward === 0 ? (
              <p style={{ color: "var(--neon-orange)" }}>
                Total reward: {totalOppReward}
              </p>
            ) : (
              <p style={{ color: "var(--neon-orange)" }}>
                Total reward: {`${totalOppReward - oppReward} + ${oppReward}`}
              </p>
            )}
          </Stack>
        </Stack>
        {showPrior && (
          <BarChart
            width={dimensions.width * 0.8}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 30,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={false} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        )}
      </Stack>
    </div>
  );
}

export default PrisonersDilemmaGame;
