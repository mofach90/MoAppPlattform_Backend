import { CloudTasksClient } from "@google-cloud/tasks";

export const cancelReminderTask = async (taskId: string) => {
    try {
      const client = new CloudTasksClient();
      const response = await client.deleteTask({ name: taskId });
      console.log(`response from delete task: `, response);
      console.log(`Task ${taskId} successfully canceled.`);
    } catch (error) {
      console.error(`Failed to cancel task ${taskId}:`, error);
    }
  };
  