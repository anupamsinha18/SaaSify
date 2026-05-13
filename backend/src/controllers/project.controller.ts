import { Request, Response, NextFunction } from 'express';
import * as projectService from '../services/project.service';

export const createProject = async (req: any, res: Response, next: NextFunction) => {
  try {
    const project = await projectService.createProject(req.user.id, req.body);
    res.status(201).json({ status: 'success', data: { project } });
  } catch (error) {
    next(error);
  }
};

export const getProjects = async (req: any, res: Response, next: NextFunction) => {
  try {
    const projects = await projectService.getProjects(req.user.id, req.user.role);
    res.status(200).json({ status: 'success', data: { projects } });
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (req: any, res: Response, next: NextFunction) => {
  try {
    const project = await projectService.getProjectById(req.params.id, req.user.id, req.user.role);
    res.status(200).json({ status: 'success', data: { project } });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req: any, res: Response, next: NextFunction) => {
  try {
    const project = await projectService.updateProject(req.params.id, req.body);
    res.status(200).json({ status: 'success', data: { project } });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await projectService.deleteProject(req.params.id as string);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
