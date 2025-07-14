import { Router } from 'express';
import {
  getProjects,
  createProject,
  updateProject,
  patchProject,
  deleteProject,
} from '../controllers/projectController.ts';

const router = Router();

router.get('/', getProjects);
router.post('/', createProject);
router.put('/:id', updateProject);
router.patch('/:id', patchProject);
router.delete('/:id', deleteProject);

export default router;
