import { Request, Response } from 'express';
import Column from '../models/Column.ts';
import { httpResponse } from '../lib/httpResponse.ts';

// Get columns for a project
export async function getColumnsForProject(req: Request, res: Response) {
  const { projectId } = req.params;
  const columns = await Column.find({ projectId });
  return httpResponse(200, 'Columns fetched', columns, res);
}

// Create a new column for a project
export async function createColumn(req: Request, res: Response) {
  const { projectId } = req.params;
  const { title, order } = req.body;

  const newColumn = await Column.create({ projectId, title, order });
  return httpResponse(201, 'Column created', newColumn, res);
}

// Update a column by ID
export async function updateColumn(req: Request, res: Response) {
  const { id } = req.params;
  const updated = await Column.findByIdAndUpdate(id, req.body, { new: true });
  if (!updated) return httpResponse(404, 'Column not found', null, res);
  return httpResponse(200, 'Column updated', updated, res);
}

// Delete a column by ID
export async function deleteColumn(req: Request, res: Response) {
  const { id } = req.params;
  const deleted = await Column.findByIdAndDelete(id);
  if (!deleted) return httpResponse(404, 'Column not found', null, res);
  return httpResponse(204, 'Column deleted', null, res);
}
