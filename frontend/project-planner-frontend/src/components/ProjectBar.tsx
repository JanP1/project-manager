import { useEffect, useState } from "react";
import "../assets/styles/ProjectBar.css";
import ProjectCard from "./ProjectCard";
import StatusPicker from "./StatusPicker";

interface Project {
  _id: string;
  name: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function ProjectBar() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("http://localhost:5001/projects")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((response) => {
        setProjects(response.data);
      })
      .catch((err) => console.error("Failed to fetch projects:", err));
  }, []);

  return (
    <div className="project-bar-container">
      <div className="title-status-container">
        <div className="bar-title">Projects</div>
        <StatusPicker/>
      </div>
      <div className="projects-scrollable-container">
        {projects.map((project) => (
          <ProjectCard key={project._id} name={project.name} />
        ))}
      </div>
    </div>
  );
}
