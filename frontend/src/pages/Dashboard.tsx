import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import type { Project, Task } from '../types';
import { CheckCircle, Folder, AlertCircle } from 'lucide-react';

export const Dashboard = () => {
  const { data: projectsData, isLoading: projectsLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await api.get('/projects');
      return res.data.data.projects as Project[];
    },
  });

  const { data: tasksData, isLoading: tasksLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await api.get('/tasks');
      return res.data.data.tasks as Task[];
    },
  });

  const isLoading = projectsLoading || tasksLoading;

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-48 bg-gray-200 rounded"></div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl h-24 shadow-sm border border-gray-100"></div>
          ))}
        </div>
      </div>
    );
  }

  const projects = projectsData || [];
  const tasks = tasksData || [];

  const completedTasks = tasks.filter(t => t.status === 'COMPLETED').length;
  const overdueTasks = tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'COMPLETED').length;

  const stats = [
    { name: 'Total Projects', stat: projects.length, icon: Folder, color: 'text-blue-500', bg: 'bg-blue-50' },
    { name: 'Total Tasks', stat: tasks.length, icon: CheckCircle, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { name: 'Completed Tasks', stat: completedTasks, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
    { name: 'Overdue Tasks', stat: overdueTasks, icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((item) => (
          <div key={item.name} className="bg-white overflow-hidden rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className={`p-3 rounded-lg ${item.bg}`}>
                  <item.icon className={`h-6 w-6 ${item.color}`} aria-hidden="true" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                  <dd className="text-2xl font-semibold text-gray-900 mt-1">{item.stat}</dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Projects</h2>
          <div className="space-y-4">
            {projects.slice(0, 5).map((project) => (
              <div key={project.id} className="flex items-center justify-between p-4 border border-gray-50 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{project.title}</h3>
                    <p className="text-xs text-gray-500">{project.status}</p>
                  </div>
                </div>
                <span className="text-xs font-medium bg-white px-2 py-1 rounded-md border border-gray-200">
                  {project._count?.tasks || 0} tasks
                </span>
              </div>
            ))}
            {projects.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">No projects yet.</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">My Recent Tasks</h2>
          <div className="space-y-4">
            {tasks.slice(0, 5).map((task) => (
              <div key={task.id} className="flex flex-col p-4 border border-gray-50 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                    task.priority === 'HIGH' ? 'bg-red-100 text-red-700' :
                    task.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {task.priority}
                  </span>
                </div>
                <div className="flex items-center text-xs text-gray-500 gap-4">
                  <span className="flex items-center gap-1">
                    <Folder className="w-3 h-3" />
                    {task.project?.title || 'Unknown Project'}
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {task.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
            {tasks.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">No tasks assigned.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
