// apiClient.ts
import apiClient from '~/lib/api';
import type { Course, Task, TaskInput, CourseInput, TaskStatus } from '~/types';

// Add type signatures to your API methods
export const fetchCourses = async (): Promise<Course[]> => {
  const response = await apiClient.get<Course[]>('/courses');
  return response.data;
};

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await apiClient.get<Task[]>('/tasks');
  return response.data;
};

export const createTask = async (task: TaskInput): Promise<Task> => {
  const response = await apiClient.post<Task>('/tasks', task);
  return response.data;
};

export const updateTaskStatus = async (taskId: number, status: TaskStatus): Promise<Task> => {
  const response = await apiClient.patch<Task>(`/tasks/${taskId}`, { status });
  return response.data;
};