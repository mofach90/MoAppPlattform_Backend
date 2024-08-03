import { Request, Response } from 'express';
import { db } from '../../../../config/firebaseConfig';
import logger from '../../../../config/logger';
import isTaskProperiesInBody from '../../../../services/utilities/isTaskProperiesInBody';

export const updateTaskController = async (req: Request, res: Response) => {
  console.log('req. session checkAuthSessionIdCookie: ', req.session);
  const user = req.session.user;
  const { id, title, description, isChecked } = req.body;

  if (isTaskProperiesInBody(req)) {
    const receivedTask = {
      title,
      description,
      isChecked: isChecked,
      updatedAt: new Date(),
    };
    try {
      const taskRef: FirebaseFirestore.DocumentReference<
        FirebaseFirestore.DocumentData,
        FirebaseFirestore.DocumentData
      > = await db.collection('users').doc(user).collection('tasks').doc(id);

      const response: FirebaseFirestore.WriteResult = await taskRef.update(
        receivedTask,
      );

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
