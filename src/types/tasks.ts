export interface Task {
  id?: string;
  title: string;
  description: string;
  isChecked?: boolean;
  //   createdAt?: TaskTime;
  //   updatedAt?: TaskTime;
}

export interface TaskTime {
  _seconds?: number;
  _nanoseconds?: number;
}
