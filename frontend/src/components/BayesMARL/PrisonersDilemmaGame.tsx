// External imports
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Box, Stack } from "@mui/material";

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

  const initializeAgents = async () => {
    const body = {
      policies: ["first_tournament"],
      opponent: "Random",
    };

    try {
      const response = await apiCall(
        "prisoners_dilemma/initialize",
        "POST",
        body
      );

      if (response) {
        setPrior(response.prior);
      } else {
        console.log("no response");
      }
    } catch (error) {
      console.error("Error in initializeAgents:", error);
    }
  };

  const playRound = async () => {
    const body = {};

    try {
      setAgentMove("?");
      setAgentReward(0);
      setOppMove("?");
      setOppReward(0);
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
    name: `Prior ${index + 1}`,
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

  return (
    <div>
      <h1>Prisoners Dilemma Game</h1>
      <button onClick={initializeAgents}>Initialize Agents</button>
      <button onClick={playRound}>Play Round</button>
      <Stack direction="row" spacing={2}>
        <Stack direction="column" spacing={2}>
          <Box
            component="img"
            src={agentImg}
            sx={{
              width: dimensions.height * 0.18,
              height: dimensions.height * 0.18,
            }}
          />
          <p>Agent Move: {agentMove}</p>
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
          <p>Opponent Move: {oppMove}</p>
        </Stack>
      </Stack>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default PrisonersDilemmaGame;
