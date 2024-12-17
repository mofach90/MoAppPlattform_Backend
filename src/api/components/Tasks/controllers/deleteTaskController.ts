import { Request, Response } from 'express';
import { db } from '../../../../config/firebaseConfig';
import logger from '../../../../config/logger';
import isTaskIdInBody from '../../../../services/utilities/isTaskIdInBody';

export const deleteTaskController = async (req: Request, res: Response) => {
  console.log(
    'req. session checkAuthSessionIdCookie deleteTaskController: ',
    req.session,
  );
  const user = req.session.user;
  const { taskId } = req.body;
  console.log('req.body deleteTaskController ', req.body);
  console.log('taskId ', taskId);
  if (!isTaskIdInBody(req)) {
    res.status(401).json({
      message: 'Task ID is required',
      taskDeleted: false,
    });
  }
  try {
    const taskRef: FirebaseFirestore.DocumentReference<
      FirebaseFirestore.DocumentData,
      FirebaseFirestore.DocumentData
    > = db.collection('users').doc(user).collection('tasks').doc(taskId);
    const taskDoc: FirebaseFirestore.DocumentSnapshot<
      FirebaseFirestore.DocumentData,
      FirebaseFirestore.DocumentData
    > = await taskRef.get();
    if (!taskDoc.exists) {
      console.log('Task not found', taskDoc);
      return res.status(404).send({
        message: 'Task not found',
        taskDeleted: false,
      });
    }
    await taskRef.delete();
    res.status(200).send({
      message: 'Task deleted successfully',
      taskDeleted: true,
    });
  } catch (error) {
    logger.error('Request to firebase failed with error:  ', error);
    res.status(500).send({ error: error });
  }
};
