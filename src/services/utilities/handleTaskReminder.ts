import { Task } from '../../types/tasks';
import createReminderTask from './createReminderTask';

const handleTaskReminder = async (createdTask: Task) => {
  try {
    console.log('enter handleTaskReminder');
    const response = await createReminderTask(createdTask);
    if (response.name) {
      console.log('createReminderTask successfull');
      return response.name;
    }
  } catch (error) {
    throw new Error(`error during createReminderTask : ${error}`);
  }
};

export default handleTaskReminder;
