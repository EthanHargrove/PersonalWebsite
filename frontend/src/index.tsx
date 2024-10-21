import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/main.css";
import Home from "./pages/Home";
import CV from "./pages/CV";
import Projects from "./pages/Projects";
import XsAndOs from "./pages/XsAndOs";
import Sudoku from "./pages/Sudoku";
import GraphNeuralNetworks from "./pages/GraphNeuralNetworks";
import QLearning from "./pages/QLearning";
import BayesMARL from "./pages/BayesMARL";
import PrisonersDilemmaGame from "./pages/PrisonersDilemmaGame";

function setDefaultTitleAndFavicon() {
  // Change document title
  document.title = "Ethan Hargrove";
}

document.addEventListener("DOMContentLoaded", setDefaultTitleAndFavicon);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/CV",
    element: <CV />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
  {
    path: "/Xs-and-Os",
    element: <XsAndOs />,
  },
  {
    path: "/sudoku",
    element: <Sudoku />,
  },
  {
    path: "/graph-neural-networks",
    element: <GraphNeuralNetworks />,
  },
  {
    path: "/Q-Learning",
    element: <QLearning />,
  },
  {
    path: "/bayesian-multi-agent-reinforcement-learning",
    element: <BayesMARL />,
  },
  {
    path: "/play-prisoners-dilemma",
    element: <PrisonersDilemmaGame />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
