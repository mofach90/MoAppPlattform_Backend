import { Request } from 'express';
const isTaskIdInBody = (responseBody: Request): boolean => {
  const { taskId } = responseBody.body;

  return taskId !== undefined;
};

export default isTaskIdInBody;
