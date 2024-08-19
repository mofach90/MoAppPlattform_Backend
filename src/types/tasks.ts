export interface Task {
  id?: string;
  title: string;
  description: string;
  isChecked?: boolean;
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
  priority: PriorityType;
  reminder?: string;
  reminderTask?:string
}

export type PriorityType = 'medium' | 'high' | 'low';

export interface CreatedTask extends Task {
  user: string;
}