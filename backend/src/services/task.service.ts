import prisma from '../config/db';
import { NotFoundError, ForbiddenError } from '../utils/errors';

export const createTask = async (data: any, userId: string, role: string) => {
  const { projectId, ...taskData } = data;

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: { members: true },
  });

  if (!project) throw new NotFoundError('Project not found');

  if (role !== 'ADMIN' && !project.members.some(m => m.id === userId)) {
    throw new ForbiddenError('You do not have access to this project');
  }

  const task = await prisma.task.create({
    data: {
      ...taskData,
      projectId,
    },
    include: { assignedTo: true, project: { select: { title: true } } },
  });

  return task;
};

export const getTasks = async (userId: string, role: string) => {
  if (role === 'ADMIN') {
    return prisma.task.findMany({ include: { assignedTo: true, project: { select: { title: true } } } });
  } else {
    return prisma.task.findMany({
      where: {
        assignedToId: userId
      },
      include: { assignedTo: true, project: { select: { title: true } } },
    });
  }
};

export const updateTask = async (taskId: string, data: any, userId: string, role: string) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: { project: { include: { members: true } } },
  });

  if (!task) throw new NotFoundError('Task not found');

  if (role !== 'ADMIN') {
    if (task.assignedToId !== userId) {
      throw new ForbiddenError('Members can only update tasks assigned to them');
    }
  }

  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data,
    include: { assignedTo: true, project: { select: { title: true } } },
  });

  return updatedTask;
};

export const deleteTask = async (taskId: string) => {
  await prisma.task.delete({ where: { id: taskId } });
};
