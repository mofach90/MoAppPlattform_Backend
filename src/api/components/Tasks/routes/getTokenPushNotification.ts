import { Router } from 'express';
import getTasksController from '../controllers/getTasksControlller';
import { getTokenPushNotificationController } from '../controllers/getTokenController';

const getTokenPushNotification = (router: Router) => {
  /*   get tasks routes   */
  router.post('/get-token', getTokenPushNotificationController);
};

export default getTokenPushNotification;
