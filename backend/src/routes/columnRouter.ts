import { Router } from 'express';
import {
  getColumnsForProject,
  createColumn,
  updateColumn,
  deleteColumn,
} from '../controllers/columnController.ts';

const router = Router();

// Get all columns for a project
router.get('/project/:projectId', getColumnsForProject);

// Create a new column for a project
router.post('/project/:projectId', createColumn);

// Update a column by its id
router.put('/:id', updateColumn);
router.patch('/:id', updateColumn); // optional: patch or separate handler

// Delete a column by its id
router.delete('/:id', deleteColumn);

export default router;
