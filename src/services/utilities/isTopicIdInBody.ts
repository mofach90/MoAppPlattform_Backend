import { Request } from 'express';
const isTopicIdInBody = (responseBody: Request): boolean => {
  const { topic } = responseBody.body;

  return topic !== undefined;
};

export default isTopicIdInBody;

