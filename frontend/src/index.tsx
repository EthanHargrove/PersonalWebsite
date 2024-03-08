import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/main.css";
import Home from "./pages/Home";
import CV from "./pages/CV";
import Projects from "./pages/Projects";
import TicTacToe from "./pages/TicTacToe";
import Sudoku from "./pages/Sudoku";
import GraphNeuralNetworks from "./pages/GraphNeuralNetworks";

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
    path: "/tic-tac-toe",
    element: <TicTacToe />,
  },
  {
    path: "/sudoku",
    element: <Sudoku />,
  },
  {
    path: "/graph-neural-networks",
    element: <GraphNeuralNetworks />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
