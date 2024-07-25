import { Request, Response } from 'express';
import { db } from '../../../../config/firebaseConfig';
import logger from '../../../../config/logger';
import isTaskProperiesInBody from '../../../../services/utilities/isTaskProperiesInBody';

export const createTask = async (req: Request, res: Response) => {
  console.log('req. session checkAuthSessionIdCookie: ', req.session);
  const user = 'test-postman-user2';
  const { title, description, isChecked } = req.body;

  if (isTaskProperiesInBody(req)) {
    const newTask = {
      title,
      description,
      isChecked: isChecked,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    try {
      const taskRef: FirebaseFirestore.DocumentReference<
        FirebaseFirestore.DocumentData,
        FirebaseFirestore.DocumentData
      > = await db
        .collection('users')
        .doc(user)
        .collection('tasks')
        .add(newTask);

      const newCreatedTask = {
        id: taskRef.id,
        title: newTask.title,
        description: newTask.description,
        isChecked: newTask.isChecked,
      };
      res
        .status(201)
        .send({ newCreatedTask: newCreatedTask, taskCreated: true });
    } catch (error) {
      logger.error('Request to firebase failed with error:  ', error);
      res.status(402).send({ error: error });
    }
  } else {
    res.status(401).send({
      message: 'Task property not found in body',
      taskCreated: false,
    });
  }
};
