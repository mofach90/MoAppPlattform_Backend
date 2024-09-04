import { Request, Response } from 'express';
import { db } from '../../../../config/firebaseConfig';
import logger from '../../../../config/logger';
import isTopicIdInBody from '../../../../services/utilities/isTopicIdInBody';

export const deleteTopicController = async (req: Request, res: Response) => {
  console.log(
    'req. session checkAuthSessionIdCookie deleteTopicController: ',
    req.session,
  );
  const user = req.session.user;
  const { topic } = req.body;
  console.log('req.body deleteTopicController ', req.body);
  console.log('topic ', topic);
  if (!isTopicIdInBody(req)) {
    return res.status(401).json({
      message: 'Topic ID is required',
      topicDeleted: false,
    });
  }
  try {
    const taskRef: FirebaseFirestore.CollectionReference<
      FirebaseFirestore.DocumentData,
      FirebaseFirestore.DocumentData
    > = db.collection('users').doc(user).collection('tasks');
    const tasksSnapShot: FirebaseFirestore.QuerySnapshot<
      FirebaseFirestore.DocumentData,
      FirebaseFirestore.DocumentData
    > = await taskRef.get();
    if (tasksSnapShot.empty) {
      console.log('Tasks not found', tasksSnapShot);
      return res.status(404).send({
        message: 'Tasks not found',
        topicDeleted: false,
      });
    }

    const allPromises = [];

    for (const task of tasksSnapShot.docs) {
      if (task.data().topic === topic) {
        allPromises.push(taskRef.doc(task.id).delete());
      }
    }
    console.log('all promises', allPromises);
    await Promise.all(allPromises);

    res.status(200).send({
      message: 'Topic deleted successfully',
      topicDeleted: true,
    });
  } catch (error) {
    logger.error('Request to firebase failed with error:  ', error);
    res.status(500).send({ message: error });
  }
};
