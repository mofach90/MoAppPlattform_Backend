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
}

export type PriorityType = 'medium' | 'high' | 'low';
