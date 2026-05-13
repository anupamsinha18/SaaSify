import { Router } from 'express';
import * as projectController from '../controllers/project.controller';
import { validate } from '../middlewares/validate.middleware';
import { createProjectSchema, updateProjectSchema } from '../validations/project.validation';
import { authenticateUser, authorizeRoles } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticateUser);

router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProjectById);

router.post('/', authorizeRoles('ADMIN'), validate(createProjectSchema), projectController.createProject);
router.patch('/:id', authorizeRoles('ADMIN'), validate(updateProjectSchema), projectController.updateProject);
router.delete('/:id', authorizeRoles('ADMIN'), projectController.deleteProject);

export default router;
