import { Request, Response } from 'express';
import { db } from '../../../../config/firebaseConfig';
import logger from '../../../../config/logger';
import { Task } from '../../../../types/tasks';

const getTasksController = async (req: Request, res: Response) => {
  try {
    const user = 'ghghg';
    console.log('Hello: ', user);
    const tasksSnapshot = await db
      .collection('users')
       .doc(user)
      .collection('tasks')
      .get();
    const tasks: Task[] = [];

    if  (tasksSnapshot.empty) {
      console.log('No such tasksSnapshotument!');
      return res.status(404).json({ message: 'No Tasks found for this user' });
    }

   tasksSnapshot.forEach( tasksSnapshot =>
      tasks.push({
        id: tasksSnapshot.id,
        title: tasksSnapshot.data().title,
        description: tasksSnapshot.data().description,
        isChecked: tasksSnapshot.data().isChecked,
      }),
    );
    logger.info("GetTask Result ", tasks)

    return res.status(200).json(tasks);
  } catch (error) {
    logger.error('Error getting tasks:', error);
    return res.status(500).send('Internal Server Error');
  }
};

export default getTasksController;
