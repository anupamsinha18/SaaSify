import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2 } from 'lucide-react';
import api from '../api/axios';
import type { Project, User } from '../types';
import { Button } from '../components/common/Button';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { Input } from '../components/common/Input';

export const Projects = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '', memberIds: [] as string[] });

  const { data: projectsData, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await api.get('/projects');
      return res.data.data.projects as Project[];
    },
  });

  const { data: usersData } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await api.get('/users');
      return res.data.data.users as User[];
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: typeof newProject) => api.post('/projects', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setIsCreateOpen(false);
      setNewProject({ title: '', description: '', memberIds: [] });
      toast.success('Project created');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create project');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/projects/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project deleted');
    },
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(newProject);
  };

  const projects = projectsData || [];

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        {user?.role === 'ADMIN' && (
          <Button onClick={() => setIsCreateOpen(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Project
          </Button>
        )}
      </div>

      {isCreateOpen && (
        <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Create New Project</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <Input
              label="Project Title"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              required
            />
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border px-3 py-2 outline-none"
                rows={3}
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">Team Members</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-3 border rounded-lg bg-gray-50 max-h-40 overflow-y-auto">
                {(usersData || []).filter(u => u.id !== user?.id).map(u => (
                  <label key={u.id} className="flex items-center gap-2 p-1 hover:bg-white rounded cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                      checked={newProject.memberIds.includes(u.id)}
                      onChange={(e) => {
                        const ids = e.target.checked 
                          ? [...newProject.memberIds, u.id]
                          : newProject.memberIds.filter(id => id !== u.id);
                        setNewProject({ ...newProject, memberIds: ids });
                      }}
                    />
                    <span className="text-sm text-gray-700 truncate">{u.name}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="secondary" onClick={() => setIsCreateOpen(false)} type="button">
                Cancel
              </Button>
              <Button type="submit" isLoading={createMutation.isPending}>
                Create
              </Button>
            </div>
          </form>
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 bg-gray-100 animate-pulse rounded-xl"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-lg text-gray-900">{project.title}</h3>
                {user?.role === 'ADMIN' && (
                  <button 
                    onClick={() => {
                      if(confirm('Are you sure you want to delete this project?')) {
                        deleteMutation.mutate(project.id);
                      }
                    }}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-500 flex-1 mb-4 line-clamp-2">
                {project.description || 'No description provided.'}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                  project.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                  project.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700' :
                  project.status === 'ON_HOLD' ? 'bg-orange-100 text-orange-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {project.status}
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  {project._count?.tasks || 0} tasks
                </span>
              </div>
            </div>
          ))}
          {projects.length === 0 && !isCreateOpen && (
            <div className="col-span-full py-12 flex flex-col items-center justify-center bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500 mb-4">No projects found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
