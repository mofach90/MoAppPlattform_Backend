import dayjs from 'dayjs';
import { Request, Response } from 'express';
import { db } from '../../../../config/firebaseConfig';
import isTaskProperiesInBody from '../../../../services/utilities/isTaskProperiesInBody';
import { Task } from '../../../../types/tasks';

export const createTaskController = async (req: Request, res: Response) => {
  console.log('req. session checkAuthSessionIdCookie: ', req.session);
  const user = req.session.user;
  const { title, description, dueDate, updatedAt , priority} = req.body;
  console.log({updatedAt})

  if (isTaskProperiesInBody(req)) {
    const newTask = {
      title,
      description: description,
      isChecked: false,
      dueDate: dueDate,
      createdAt: dayjs(new Date()).toISOString(),
      // updatedAt: updatedAt? updatedAt:dayjs(new Date()).toISOString(),
      priority
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

      const newCreatedTask: Task = {
        id: taskRef.id,
        title: newTask.title,
        description: newTask.description,
        isChecked: newTask.isChecked,
        dueDate: newTask.dueDate,
        createdAt: newTask.createdAt,
        // updatedAt: newTask.updatedAt,
        priority: newTask.priority
      };
      console.log('newCreatedTask', newCreatedTask);
      res
        .status(201)
        .send({ newCreatedTask: newCreatedTask, taskCreated: true });
    } catch (error) {
      console.log('error: ', error);
      res.status(402).send({ error: error });
    }
  } else {
    res.status(401).send({
      message: 'Task property not found in body',
      taskCreated: false,
    });
  }
};
