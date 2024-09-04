import { Request, Response } from 'express';
import { messaging } from '../../../../config/firebaseConfig';

export const getTokenPushNotificationController = async (
  req: Request,
  res: Response,
) => {
  console.log(
    'req. session checkAuthSessionIdCookie getTokenPushNotificationController: ',
    req.session,
  );
  const user = req.session.user;
  const { token } = req.body;
  console.log('req.body token ', token);
  if (!token) {
    res.status(401).json({
      message: 'token is required',
    });
  }
  const registrationToken = token;
  const message = {
    notification: {
      title: 'Hello!',
      body: 'This is a push notification.',
    },
    token: registrationToken,
  };

  const response = await messaging.send(message);
  console.log('Successfully sent message:', response);
  try {
  } catch (error) {
    console.log('Error sending message:', error);
    res.status(500).send({ message: error });
  }
};
