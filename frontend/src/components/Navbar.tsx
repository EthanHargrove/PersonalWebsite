// External imports
import React from "react";
import { Link } from "react-router-dom";
// Internal imports
import {
  GithubLogo,
  GraduationCap,
  Hammer,
  HouseLine,
  LinkedinLogo,
} from "@phosphor-icons/react";
import GlitchComponent from "./GlitchComponent";
import "../styles/navbar.css";

interface NavbarProps {
  active: string;
}

const Navbar = (props: NavbarProps) => {
  return (
    <div className="navbar">
      {/* LinkedIn button */}
      <a
        href="https://www.linkedin.com/in/ethan-hargrove"
        className="link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GlitchComponent>
          <LinkedinLogo className="navbar-btn" />
        </GlitchComponent>
      </a>

      {/* CV Button */}
      <Link to="/">
        <GlitchComponent>
          <GraduationCap
            className={`navbar-btn ${props.active === "CV" ? "active" : ""}`}
          />
        </GlitchComponent>
      </Link>

      {/* Home button */}
      <Link to="/">
        <GlitchComponent>
          <HouseLine
            className={`navbar-btn ${props.active === "home" ? "active" : ""}`}
          />
        </GlitchComponent>
      </Link>

      {/* Projects button */}
      <Link to="/projects">
        <GlitchComponent>
          <Hammer
            className={`navbar-btn ${
              props.active === "projects" ? "active" : ""
            }`}
          />
        </GlitchComponent>
      </Link>

      {/* Github button */}
      <a
        href="https://github.com/EthanHargrove"
        className="link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GlitchComponent>
          <GithubLogo className="navbar-btn" />
        </GlitchComponent>
      </a>
    </div>
  );
};

export default Navbar;
