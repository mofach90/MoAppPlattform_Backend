import { Request, Response } from 'express';
import { db } from '../../../../config/firebaseConfig';
import logger from '../../../../config/logger';

export const createTask = async(req: Request, res: Response) => {
//   console.log('req. session checkAuthSessionIdCookie: ');
    //   res.status(200).send({
    //   message: 'test confirmed new',
    // });
  console.log('req. session checkAuthSessionIdCookie: ', req.session);
  //   const user = req.session.user
  const user = "test-postman-user"
  const { title, description, isChecked } = req.body;
  console.log('req.body: ', req.body);
  
  if (title && description 
    // && isChecked
) {
    const newTask= {
        title,
        description,
        // completed: isChecked,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    try {
        const taskRef = await db.collection('users').doc(user).collection('tasks').add(newTask);
        res.status(201).send({ id: taskRef.id, ...newTask , taskCreated: true});
        
    } catch (error) {
        logger.error("Request to firebase failed with error:  ", error)
    }

  } else {
    res.status(401).send({
      message: 'Task property not found in body',
      taskCreated: false,
    });
  }
};