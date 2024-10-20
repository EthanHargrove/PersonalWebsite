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

// Internal imports
import { apiCall } from "../../api/api";

function PrisonersDilemmaGame() {
  const [agentMove, setAgentMove] = useState("");
  const [oppMove, setOppMove] = useState("");
  const [reward, setReward] = useState(0);
  const [totalReward, setTotalReward] = useState(0);
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
      const response = await apiCall("prisoners_dilemma/play", "POST", body);

      if (response) {
        setAgentMove(response.agent_move);
        setOppMove(response.opp_move);
        setPrior(response.prior);
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

  return (
    <div>
      <h1>Prisoners Dilemma Game</h1>
      <button onClick={initializeAgents}>Initialize Agents</button>
      <button onClick={playRound}>Play Round</button>
      <p>Agent Move: {agentMove}</p>
      <p>Opponent Move: {oppMove}</p>
      <p>Reward: {reward}</p>
      <p>Total Reward: {totalReward}</p>
      <p>Prior: {prior}</p>
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
