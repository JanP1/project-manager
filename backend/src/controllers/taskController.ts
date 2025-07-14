import { Request, Response } from 'express';
import Project from '../models/Project.ts';
import Column from '../models/Column.ts';
import Task from '../models/Task.ts';
import { httpResponse } from '../lib/httpResponse.ts';

// Get tasks for a column in a project
export async function getTasksForColumn(req: Request, res: Response) {
  const { projectId, columnId } = req.params;
  const tasks = await Task.find({ projectId, columnId });
  return httpResponse(200, 'Tasks fetched', tasks, res);
}

// Add task to column
export async function addTaskToColumn(req: Request, res: Response) {
  const { projectId, columnId } = req.params;
  const { title, description, dueDate } = req.body;

  const project = await Project.findById(projectId);
  if (!project) return httpResponse(404, 'Project not found', null, res);

  const column = await Column.findOne({ _id: columnId, projectId });
  if (!column) return httpResponse(404, 'Column not found', null, res);

  const order = await Task.countDocuments({ projectId, columnId });

  const newTask = await Task.create({
    projectId,
    columnId,
    title,
    description,
    dueDate,
    order,
  });

  return httpResponse(201, 'Task added', newTask, res);
}

// Update task by ID
export async function updateTask(req: Request, res: Response) {
  const { id } = req.params;
  const updated = await Task.findByIdAndUpdate(id, req.body, { new: true });
  if (!updated) return httpResponse(404, 'Task not found', null, res);
  return httpResponse(200, 'Task updated', updated, res);
}

// Delete task by ID
export async function deleteTask(req: Request, res: Response) {
  const { id } = req.params;
  const deleted = await Task.findByIdAndDelete(id);
  if (!deleted) return httpResponse(404, 'Task not found', null, res);
  return httpResponse(204, 'Task deleted', null, res);
}
