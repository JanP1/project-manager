import { useEffect, useState } from "react";
import "../assets/styles/ProjectBar.css";
import ProjectCard from "./ProjectCard";
import StatusPicker from "./StatusPicker";
import useStatusStore from "../stores/projectStatusStore";
import useCurrentProjectStore from "../stores/useCurrentProjectStore"; 

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
  const { active, completed, archived } = useStatusStore();
  const setProjectId = useCurrentProjectStore((state) => state.setProjectId);

  let selectedStatus = "";
  if (active) selectedStatus = "active";
  else if (completed) selectedStatus = "completed";
  else if (archived) selectedStatus = "archived";

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

  const filteredProjects = selectedStatus
    ? projects.filter((project) => project.status === selectedStatus)
    : projects;

  return (
    <div className="project-bar-container">
      <div className="title-status-container">
        <div className="bar-title">Projects</div>
        <StatusPicker />
      </div>
      <div className="projects-scrollable-container">
        {filteredProjects.map((project) => (
          <div
            key={project._id}
            onClick={() => setProjectId(project._id)}
            style={{ cursor: "pointer" }} // pointer cursor for UX
          >
            <ProjectCard name={project.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
