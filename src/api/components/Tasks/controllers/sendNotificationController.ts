import { Request, Response } from 'express';
import { db } from '../../../../config/firebaseConfig';
import { sendEmailService } from '../../../../services/tasks/sendEmailService';
import { Task } from '../../../../types/tasks';

const sendNotificationController = async (req: Request, res: Response) => {
  console.log('sendNotificationController request', req.session);
  const taskId = req.body.taskId;
  const userId = req.body.userId;
  const tasksSnapshot = await db
    .collection('users')
    .doc(userId)
    .collection('tasks')
    .doc(taskId)
    .get();
  const task = tasksSnapshot?.data() as Task;
  console.log('task for notification ', task);

  if (taskId && userId) {
    const message = await sendEmailService(req.body.appWriteUserId, task);
    console.log('Notification message:', message);
    res.status(210).send({ message: message });
  } else {
    res.status(403).send({ message: 'request not valid' });
  }
};

export default sendNotificationController;
