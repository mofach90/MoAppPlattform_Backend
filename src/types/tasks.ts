export interface Task {
  id?: string;
  title: string;
  description: string;
  isChecked?: boolean;
  dueDate?: string;
  createdAt?: Date;
  //   updatedAt?: TaskTime;
}

