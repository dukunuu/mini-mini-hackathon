
import type { UUID } from 'crypto';

export type TaskStatus = 'in_progress' | 'done';

export interface Course {
  course_id: number;
  user_id: UUID | string;
  course_name: string;
  total_points_possible: number;
  created_at: string | Date;
  updated_at: string | Date;
}

export interface Task {
  task_id: number;
  course_id: number;
  title: string;
  due_date: string | Date;
  points_value: number;
  status: TaskStatus;
  created_at: string | Date;
  updated_at: string | Date;
}

export interface User {
  user_id: UUID | string;
  email: string;
  password_hash: string;
  created_at: string | Date;
  updated_at: string | Date;
}

// For API responses that might include null values
export interface NullableTaskStatus {
  task_status: TaskStatus | null;
  valid: boolean;
}

// For creating/updating tasks
export interface TaskInput {
  course_id: number;
  title: string;
  due_date: string | Date;
  points_value: number;
  status?: TaskStatus; // Optional with default
}

// For creating/updating courses
export interface CourseInput {
  user_id: UUID | string;
  course_name: string;
  total_points_possible: number;
}