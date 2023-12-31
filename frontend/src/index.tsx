import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/main.css';
import Projects from './pages/Projects';
import TicTacToe from './pages/TicTacToe';
import Home from './pages/Home';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/projects",
    element: <Projects />
  },
  {
    path: "/tic-tac-toe",
    element: <TicTacToe />
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );