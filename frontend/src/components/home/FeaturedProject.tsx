// FeaturedProjects.jsx
import React from "react";
import { Link } from "react-router-dom";

const FeaturedProjects = () => {
  // Replace this with your actual project data
  const projects = [
    {
      id: 1,
      name: "Project 1",
      description: "Project 1 description",
      image: "project1.jpg",
    },
    {
      id: 2,
      name: "Project 2",
      description: "Project 2 description",
      image: "project2.jpg",
    },
    // Add more projects as needed
  ];

  return (
    <section className="featured-projects">
      <h2>Featured Projects</h2>
      <div className="project-list">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <img src={project.image} alt={project.name} />
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <Link to={`/projects/${project.id}`} className="btn">
              View Project
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
