import createReminderTask from './createReminderTask';
import { Task } from '../../types/tasks';

const handleTaskReminder = async (task: Task) =>{
    try {
      console.log("enter handleTaskReminder")
      const response = await createReminderTask(task);
      if (response.name) {
        console.log("createReminderTask successfull")
      }
    } catch (error) {
      throw new Error (`error during createReminderTask : ${error}`  )
      
    }
  }

export default handleTaskReminder