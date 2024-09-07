import { Query } from 'node-appwrite';
import { users } from '../../api/components/Tasks/controllers/sendNotificationController';
import { Task } from '../../types/tasks';
import { getEmailUsername } from './geEmailUsername';

export const getAppWriteUser = async (createdTask: Task): Promise<string> => {
  const appWriteUserName = getEmailUsername(createdTask?.userEmail ?? ' @ ');

  const appWriteUserList = await users.list([
    Query.equal('email', [createdTask?.userEmail as string]),
  ]);
  console.log('This is the list of all Appwrite users', appWriteUserList);

  if (appWriteUserList.total) {
    return appWriteUserList.users[0].$id;
  } else {
    const result = await users.create(
      createdTask.id as string,
      createdTask.userEmail,
      undefined,
      undefined,
      appWriteUserName,
    );
    console.log('This is the result of app write create user', result);
    return result.$id;
  }
};
