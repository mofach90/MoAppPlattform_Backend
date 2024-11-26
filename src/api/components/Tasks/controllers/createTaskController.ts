import dayjs from 'dayjs';
import { Request, Response } from 'express';
import { db } from '../../../../config/firebaseConfig';
import handleTaskReminder from '../../../../services/utilities/handleTaskReminder';
import isTaskProperiesInBody from '../../../../services/utilities/isTaskProperiesInBody';
import { Task } from '../../../../types/tasks';
import { v4 as uuidv4 } from 'uuid';


export const createTaskController = async (req: Request, res: Response) => {
  console.log('req. session checkAuthSessionIdCookie: ', req.session);
  const user = req.session.user;
  const { title, description, dueDate, priority, reminder, topic, userEmail } =
    req.body;
  console.log("req.body: ",req.body );

  if (isTaskProperiesInBody(req)) {
    let newTask = {
      title,
      description: description,
      isChecked: false,
      dueDate: dueDate,
      createdAt: dayjs(new Date()).toISOString(),
      priority,
      reminder,
      reminderTask:"",
      topic,
      userEmail
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
      
      let reminderTask 
      if (newTask.dueDate && newTask.reminder && newTask.reminder !== 'none') {
         reminderTask  = await handleTaskReminder({...newTask, id:taskRef.id, userId:user});
         newTask.reminderTask = reminderTask as string
      }
      const newCreatedTask: Task = {
        id: taskRef.id,
        title: newTask.title,
        description: newTask.description,
        isChecked: newTask.isChecked,
        dueDate: newTask.dueDate,
        createdAt: newTask.createdAt,
        reminder: newTask.reminder,
        priority: newTask.priority,
        reminderTask: reminderTask,
        topic: newTask.topic
      };
      console.log('newCreatedTask', newCreatedTask);
      res
        .status(201)
        .send({ newCreatedTask: newCreatedTask, taskCreated: true });
    } catch (error) {
      console.log('error: ', error);
      res.status(402).send({ message: error });
    }
  } else {
    res.status(401).send({
      message: 'Task property not found in body',
      taskCreated: false,
    });
  }
};
