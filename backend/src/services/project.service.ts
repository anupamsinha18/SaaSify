import prisma from '../config/db';
import { NotFoundError } from '../utils/errors';

export const createProject = async (userId: string, data: any) => {
  const { memberIds, ...projectData } = data;

  const project = await prisma.project.create({
    data: {
      ...projectData,
      createdById: userId,
      members: {
        connect: [{ id: userId }, ...(memberIds?.map((id: string) => ({ id })) || [])],
      },
    },
    include: { members: true },
  });

  return project;
};

export const getProjects = async (userId: string, role: string) => {
  if (role === 'ADMIN') {
    return prisma.project.findMany({ include: { members: true, _count: { select: { tasks: true } } } });
  } else {
    return prisma.project.findMany({
      where: { members: { some: { id: userId } } },
      include: { members: true, _count: { select: { tasks: true } } },
    });
  }
};

export const getProjectById = async (projectId: string, userId: string, role: string) => {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: { members: true, tasks: true },
  });

  if (!project) throw new NotFoundError('Project not found');

  if (role !== 'ADMIN' && !project.members.some(m => m.id === userId)) {
    throw new NotFoundError('Project not found or unauthorized');
  }

  return project;
};

export const updateProject = async (projectId: string, data: any) => {
  const { memberIds, ...projectData } = data;

  const updatePayload: any = { ...projectData };

  if (memberIds) {
    updatePayload.members = {
      set: memberIds.map((id: string) => ({ id })),
    };
  }

  const project = await prisma.project.update({
    where: { id: projectId },
    data: updatePayload,
    include: { members: true },
  });

  return project;
};

export const deleteProject = async (projectId: string) => {
  await prisma.project.delete({ where: { id: projectId } });
};
