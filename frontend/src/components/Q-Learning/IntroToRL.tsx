import React, { useState } from "react";
// import { useSpring, animated } from "react-spring";
// import { Link } from "react-router-dom";
import { Grid, Stack } from "@mui/material";
// import { styled } from "@mui/system";

function IntroToRL() {
  return (
    <div className="section" style={{ background: "#ffffff" }}>
      <h1>Machine Learning</h1>
      <ul>
        <li>
          Reinforcement Learning (RL) is one of the three main machine learning
          paradigms, alongside supervised learning and unsupervised learning.
        </li>
        <li>
          It is used to solve control problems, where learning is achieved
          through trial and error.
        </li>
      </ul>
    </div>
  );
}

export default IntroToRL;

// const IntroToRL = () => {
//   return (
//     <div className="section" style={styles.container}>
//       <h1 style={styles.title}>Introduction to Reinforcement Learning</h1>
//       <section style={styles.section}>
//         <h2 style={styles.subtitle}>What is Reinforcement Learning?</h2>
//         <p style={styles.text}>
//           Reinforcement Learning (RL) is a type of machine learning where an
//           agent learns to make decisions by performing actions in an environment
//           to maximize cumulative rewards.
//         </p>
//       </section>
//       <section style={styles.section}>
//         <h2 style={styles.subtitle}>Key Concepts</h2>
//         <ul style={styles.list}>
//           <li style={styles.listItem}>
//             <strong>Agent:</strong> The learner or decision-maker.
//           </li>
//           <li style={styles.listItem}>
//             <strong>Environment:</strong> The external system the agent
//             interacts with.
//           </li>
//           <li style={styles.listItem}>
//             <strong>State:</strong> A representation of the current situation.
//           </li>
//           <li style={styles.listItem}>
//             <strong>Action:</strong> Choices available to the agent.
//           </li>
//           <li style={styles.listItem}>
//             <strong>Reward:</strong> Feedback from the environment.
//           </li>
//         </ul>
//       </section>
//       <section style={styles.section}>
//         <h2 style={styles.subtitle}>Objective</h2>
//         <p style={styles.text}>
//           The main objective of reinforcement learning is to learn optimal
//           policies that maximize cumulative rewards over time.
//         </p>
//       </section>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     fontFamily: "Arial, sans-serif",
//     padding: "20px",
//     maxWidth: "800px",
//     margin: "0 auto",
//     backgroundColor: "#f4f4f4",
//     borderRadius: "10px",
//     boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
//   },
//   title: {
//     color: "#333",
//   },
//   section: {
//     marginBottom: "20px",
//   },
//   subtitle: {
//     color: "#666",
//     fontSize: "20px",
//     borderBottom: "1px solid #ddd",
//     paddingBottom: "5px",
//     marginBottom: "10px",
//   },
//   text: {
//     color: "#333",
//     fontSize: "16px",
//     lineHeight: "1.6",
//   },
//   list: {
//     listStyleType: "none",
//     padding: "0",
//   },
//   listItem: {
//     color: "#333",
//     fontSize: "16px",
//     marginBottom: "5px",
//   },
// };

// export default IntroToRL;
