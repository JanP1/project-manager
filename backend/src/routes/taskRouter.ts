import { Router } from 'express';
import {
  getTasksForColumn,
  addTaskToColumn,
  updateTask,
  deleteTask,
} from '../controllers/taskController.ts';

const router = Router();

// Get all tasks for a column of a project
router.get('/project/:projectId/column/:columnId', getTasksForColumn);

// Add a task to a specific column
router.post('/project/:projectId/column/:columnId', addTaskToColumn);

// Update a task by its id
router.put('/:id', updateTask);
router.patch('/:id', updateTask); // optional patch handler

// Delete a task by its id
router.delete('/:id', deleteTask);

export default router;
