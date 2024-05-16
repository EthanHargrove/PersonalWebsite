import React from "react";
import { Link } from "react-router-dom";

import "../../styles/featured-project.css";

interface FeaturedProjectProps {
  imagen: string;
  link: string;
}

function FeaturedProject(props: FeaturedProjectProps) {
  const projectsLink = "/projects";

  return (
    <div className="featured-project">
      <h2 className="project-title">Featured Project</h2>
      <div className="project-image">
        <img src={props.imagen} alt="Project Screenshot" />
      </div>
      <div className="project-buttons">
        <a href={props.link} className="project-button view-project">
          View Project
        </a>
        <a href={projectsLink} className="project-button view-all">
          View All Projects
        </a>
      </div>
    </div>
  );
}

export default FeaturedProject;
