import { Request, Response } from 'express';
import Project from '../models/Project.ts';
import Column from '../models/Column.ts';
import Task from '../models/Task.ts';
import { httpResponse } from '../lib/httpResponse.ts';

// Get all projects (basic info only)
export async function getProjects(_: Request, res: Response) {
  const projects = await Project.find();
  return httpResponse(200, 'Projects fetched', projects, res);
}

// Create a project and default columns
export async function createProject(req: Request, res: Response) {
  const { name, description } = req.body;

  const newProject = await Project.create({ name, description });

  const defaultColumns = [
    { projectId: newProject._id, title: 'To Do', order: 0 },
    { projectId: newProject._id, title: 'In Progress', order: 1 },
    { projectId: newProject._id, title: 'Done', order: 2 },
  ];

  await Column.insertMany(defaultColumns);

  return httpResponse(201, 'Project created with default columns', newProject, res);
}

// Update whole project by ID (PUT)
export async function updateProject(req: Request, res: Response) {
  const { id } = req.params;
  const updated = await Project.findByIdAndUpdate(id, req.body, { new: true });
  if (!updated) return httpResponse(404, 'Project not found', null, res);
  return httpResponse(200, 'Project updated', updated, res);
}

// Partial update (PATCH)
export async function patchProject(req: Request, res: Response) {
  const { id } = req.params;
  const updated = await Project.findByIdAndUpdate(id, req.body, { new: true });
  if (!updated) return httpResponse(404, 'Project not found', null, res);
  return httpResponse(200, 'Project updated', updated, res);
}

// Delete project + related columns and tasks
export async function deleteProject(req: Request, res: Response) {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) return httpResponse(404, 'Project not found', null, res);

  await Column.deleteMany({ projectId: id });
  await Task.deleteMany({ projectId: id });
  await project.deleteOne();

  return httpResponse(204, 'Project and related data deleted', null, res);
}
