import { Request, Response, NextFunction } from 'express';
import * as taskService from '../services/task.service';

export const createTask = async (req: any, res: Response, next: NextFunction) => {
  try {
    const task = await taskService.createTask(req.body, req.user.id, req.user.role);
    res.status(201).json({ status: 'success', data: { task } });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req: any, res: Response, next: NextFunction) => {
  try {
    const tasks = await taskService.getTasks(req.user.id, req.user.role);
    res.status(200).json({ status: 'success', data: { tasks } });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req: any, res: Response, next: NextFunction) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body, req.user.id, req.user.role);
    res.status(200).json({ status: 'success', data: { task } });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await taskService.deleteTask(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
