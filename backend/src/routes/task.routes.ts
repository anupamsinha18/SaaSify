import { Router } from 'express';
import * as taskController from '../controllers/task.controller';
import { validate } from '../middlewares/validate.middleware';
import { createTaskSchema, updateTaskSchema } from '../validations/task.validation';
import { authenticateUser, authorizeRoles } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticateUser);

router.get('/', taskController.getTasks);
router.post('/', validate(createTaskSchema), taskController.createTask);
router.patch('/:id', validate(updateTaskSchema), taskController.updateTask);
router.delete('/:id', authorizeRoles('ADMIN'), taskController.deleteTask);

export default router;
