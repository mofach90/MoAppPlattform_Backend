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
  reminderTask?:string;
  topic?: TopicType;
  userEmail?:string
  userId?:string
}



export type TopicType =
  | 'Travel'
  | 'Personal'
  | 'Work'
  | 'Home/Family'
  | 'Education'
  | 'Shopping'
  | null;


export type PriorityType = 'medium' | 'high' | 'low';

export interface CreatedTask extends Task {
  user: string;
}