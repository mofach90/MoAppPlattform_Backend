import sdk from 'node-appwrite';
import { v4 as uuidv4 } from 'uuid';

import { Task } from '../../types/tasks';
import { getEmailUsername } from '../utilities/geEmailUsername';
import { getMessageContent, getMessageSubject } from '../../templates/ReminderEmail';
import { messaging } from '../../config/appWriteConfig';



export const sendEmailService = async (
  appWriteUserId: string,
  task: Task,
): Promise<sdk.Models.Message> => {
  const userName = getEmailUsername(task?.userEmail ?? '@');
  const messageId = uuidv4();
  const messageSubject = getMessageSubject(task);
  const messageContent = getMessageContent(userName, task);
  return await messaging.createEmail(
    messageId,
    messageSubject,
    messageContent,
    [],
    [appWriteUserId],
    [],
    [],
    [],
    [],
    false,
    true,
  );
 };
