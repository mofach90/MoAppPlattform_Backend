import { Request, Response } from 'express';
import sdk from 'node-appwrite';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../../config/firebaseConfig';
import { getAppWriteUser } from '../../../../services/utilities/getAppWriteUser';
import { getEmailUsername } from '../../../../services/utilities/geEmailUsername';

const client = new sdk.Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('66bd1e590003e606f0d9')
  .setKey(
    '1d2674b0f21b490cd9a67d90d32915290a4c2c3b9e282e967d6cf795d47d769116b508aaa51eca0857d1362c422b48f5dddf2ba5850c7b4bf49155aed9443c9836d6ffedd43e1810065c11d4b1837a569da6d925ecf07572e14cc35d9a974ff3964452bf832d759f8e12be6c17ac28d0b711412abd2b220d11cdc1bf1801d740',
  );
const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);

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
  const task = tasksSnapshot.data();
  const userName = getEmailUsername(task?.userEmail)
  console.log("task for notification ", task)
  const appWriteUserId = req.body.appWriteUserId;
  const messageId = uuidv4();
  const messageSubject = `Task ${task?.title} Reminder`;
  const messageContent = `
  Hello ${userName},

  This is a friendly reminder that your task, **"${task?.title}"**, is set to expire in **${task?.reminder}**. Please find the details of your task below:

  **Task Overview:**
  - **Title**: ${task?.title}
  - **Description**: ${task?.description || "No description provided."}
  - **Priority Level**: ${task?.priority.charAt(0).toUpperCase() + task?.priority.slice(1)}
  - **Reminder Time**: ${task?.reminder}
  - **Topic**: ${task?.topic || "General"}
  - **Due Date**: ${task?.dueDate ? new Date(task?.dueDate).toLocaleString() : "Not specified"}
  - **Created On**: ${task?.createdAt ? new Date(task?.createdAt).toLocaleString() : "Not specified"}
  - **Last Updated**: ${task?.updatedAt ? new Date(task?.updatedAt).toLocaleString() : "Not specified"}

  Kindly ensure to complete this task before the due date to avoid any delays or issues.

  If you have any questions or need further assistance, please don't hesitate to reach out.

  Best regards,  
  Your MoAppPlattform Team
`;


console.log(`message content: `, messageContent)

  if (taskId && userId) {
    const message = "hello"
    await messaging.createEmail(
      messageId,
      messageSubject,
      messageContent,
      [],
      [appWriteUserId],
    );
    console.log('Notification message:', message);
    res.status(210).send({ message: message });
  } else {
    res.status(403).send({ message: 'request not valid' });
  }
};

export default sendNotificationController;
