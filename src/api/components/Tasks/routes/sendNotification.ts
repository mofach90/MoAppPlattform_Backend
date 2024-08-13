import { Router } from 'express';
import  sendNotificationController  from '../controllers/sendNotificationController';

const sendNotification = (router: Router) => {
  router.post('/reminder-notification', sendNotificationController);
};

export default sendNotification;


