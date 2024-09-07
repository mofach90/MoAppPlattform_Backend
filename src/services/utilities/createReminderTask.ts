import { CloudTasksClient, protos } from '@google-cloud/tasks';
import dayjs from 'dayjs';
import { Task } from '../../types/tasks';
import { getAppWriteUser } from './getAppWriteUser';

const client = new CloudTasksClient();

const createReminderTask = async (createdTask: Task) => {
  console.log('enter createReminderTask, created task is ', createdTask);

  const projectId = 'cpl-mo';
  const queue = 'TestQueue';
  const location = 'europe-west3';

  const appWriteUserId = await getAppWriteUser(createdTask);

  const payload = {
    userId: createdTask.userId,
    taskId: createdTask.id,
    appWriteUserId: appWriteUserId,
  };
  const delayInSeconds = dayjs(createdTask.dueDate)
    .subtract(parseInt(createdTask.reminder as string), 'minute')
    .diff(dayjs(), 'second');

  console.log('the task delayInSeconds: ', delayInSeconds);
  const scheduleTime = dayjs().add(delayInSeconds, 'second').unix();

  const parent = client.queuePath(projectId, location, queue);

  const task: protos.google.cloud.tasks.v2.ITask = {
    httpRequest: {
      headers: {
        'Content-Type': 'application/json',
      },
      url: 'http://localhost:3500/api/v1/todo-app/tasks/reminder-notification',
      httpMethod: 'POST',
      body: Buffer.from(JSON.stringify(payload)),
    },
    scheduleTime: {
      seconds: scheduleTime,
    },
  };

  console.log('the task that i ll send: ', task);
  const [response] = await client.createTask({ parent, task });
  console.log('Client create response: ', response);
  console.log('Client create response.name: ', response.name);

  return response;
};

export default createReminderTask;
