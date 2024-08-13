import { Request, Response } from 'express';

const sendNotificationController = (req: Request, res: Response) => {

    console.log("sendNotificationController request", req)

};

export default sendNotificationController;
