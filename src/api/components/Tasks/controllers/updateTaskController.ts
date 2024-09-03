import dayjs from 'dayjs';
import { Request, Response } from 'express';
import { db } from '../../../../config/firebaseConfig';
import logger from '../../../../config/logger';
import { cancelReminderTask } from '../../../../services/utilities/cancelReminderTask';
import handleTaskReminder from '../../../../services/utilities/handleTaskReminder';
import isTaskProperiesInBody from '../../../../services/utilities/isTaskProperiesInBody';

export const updateTaskController = async (req: Request, res: Response) => {
  console.log('req. session checkAuthSessionIdCookie: ', req.session);
  const user = req.session.user;
  const {
    id,
    title,
    description,
    isChecked,
    dueDate,
    createdAt,
    priority,
    reminder,
    topic
  } = req.body;

  if (isTaskProperiesInBody(req)) {
    let receivedTask = {
      title,
      description,
      isChecked,
      updatedAt: dayjs(new Date()).toISOString(),
      dueDate,
      createdAt,
      priority,
      reminder,
      reminderTask: '',
      topic,
    };
    try {
      const taskRef: FirebaseFirestore.DocumentReference<
        FirebaseFirestore.DocumentData,
        FirebaseFirestore.DocumentData
      > = db.collection('users').doc(user).collection('tasks').doc(id);

      const snapshotTask = await taskRef.get();
      const existingTask = snapshotTask.data();
      console.log("receivedTask: ", receivedTask)
      console.log("existingTask: ", existingTask)
      if (existingTask && (reminder !== existingTask.reminder || dueDate !== existingTask.dueDate || (reminder === undefined && dueDate !== existingTask.dueDate)) ) {
        if (reminder === 'none' && existingTask.reminderTask !== '' ) {
          console.log("enter update case hen reminder === none")
          await cancelReminderTask(existingTask.reminderTask);
          receivedTask.reminderTask = ''

          
        }else if((reminder !== 'none' && existingTask.reminderTask !== '') || (reminder !== 'none' && dueDate !== existingTask.dueDate) ){
          console.log("enter update case hen reminder !== none")
          
          await cancelReminderTask(existingTask.reminderTask);
          const remindertask = await handleTaskReminder(receivedTask);
          receivedTask.reminderTask = remindertask as string;
        }else if (reminder !== 'none' && existingTask.reminderTask === '' ){
          const remindertask = await handleTaskReminder(receivedTask);
          receivedTask.reminderTask = remindertask as string;

        }else{
          console.log("no need for any task reminder operation")
        }
      }

      await taskRef.update(receivedTask);

      res.status(200).send({ taskUpdated: true });
    } catch (error) {
      logger.error('Request to firebase failed with error:  ', error);
      res.status(402).send({ message: error, tasksUpdated: false });
    }
  } else {
    res.status(401).send({
      message: 'Task property not found in body',
      tasksUpdated: false,
    });
  }
};
