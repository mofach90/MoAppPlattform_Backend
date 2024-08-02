import { Request } from 'express';
const isTaskProperiesInBody = (responseBody: Request): boolean => {
  const { title, description, isChecked } = responseBody.body;

  return (
    title !== undefined && description !== undefined && isChecked !== undefined
  );
};

export default isTaskProperiesInBody;
