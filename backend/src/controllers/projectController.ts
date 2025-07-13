import { Request, Response } from 'express';
import Project from '../models/Project.ts';
import { httpResponse } from '../lib/httpResponse.ts';

export async function getProjects(_: Request, res: Response) {
  const projects = await Project.find();
  return httpResponse(200, "Projects fetched", projects, res);
}

export async function createProject(req: Request, res: Response) {
  const { name, description } = req.body;
  const newProject = await Project.create({ name, description });
  return httpResponse(201, "Project created", newProject, res);
}

export async function updateProject(req: Request, res: Response) {
  const { id } = req.params;
  const updated = await Project.findByIdAndUpdate(id, req.body, { new: true });
  return httpResponse(200, "Project updated", updated, res);
}

export async function deleteProject(req: Request, res: Response) {
  const { id } = req.params;
  await Project.findByIdAndDelete(id);
  return httpResponse(204, "Project deleted", null, res);
}
