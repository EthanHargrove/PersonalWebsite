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

function setDefaultTitleAndFavicon() {
  // Change document title
  document.title = "Ethan Hargrove";

  // Change favicon
  // const favicon = document.querySelector('link[rel="icon"]');
  // if (favicon) {
  //   favicon.setAttribute('href', '/path/to/default/icon.png'); // Change path to your default favicon
  // }
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
