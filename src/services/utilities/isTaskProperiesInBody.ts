import { Request } from 'express';
const isTaskProperiesInBody = (responseBody: Request): boolean => {
  const { title } = responseBody.body;

  return (
    title !== undefined 
  );
};

export default isTaskProperiesInBody;
