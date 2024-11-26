import { Task } from '../types/tasks';

export const getMessageSubject = (task: Task) => `Task ${task?.title} Reminder`;
export const getMessageContent = (userName: string, task: Task) => `
  <!DOCTYPE html>
  <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <p>Hello ${userName} 👋,</p>
      
      <p>This is a friendly reminder that your task, <strong>"${
        task?.title
      }"</strong>, is set to expire in <strong>${
  task?.reminder
}</strong> ⏰. Please find the details of your task below:</p>

      <h3>📝 Task Overview:</h3>
      <ul>
        <li><strong>📌 Title:</strong> ${task?.title}</li>
        <li><strong>📝 Description:</strong> ${
          task?.description || 'No description provided.'
        }</li>
        <li><strong>⚠️ Priority Level:</strong> ${
          task?.priority.charAt(0).toUpperCase() + task?.priority.slice(1)
        }</li>
        <li><strong>⏳ Reminder Time:</strong> ${task?.reminder}</li>
        <li><strong>📂 Topic:</strong> ${task?.topic || 'General'}</li>
        <li><strong>📅 Due Date:</strong> ${
          task?.dueDate
            ? new Date(task?.dueDate).toLocaleString()
            : 'Not specified'
        }</li>
        <li><strong>🗓️ Created On:</strong> ${
          task?.createdAt
            ? new Date(task?.createdAt).toLocaleString()
            : 'Not specified'
        }</li>
        <li><strong>🛠️ Last Updated:</strong> ${
          task?.updatedAt
            ? new Date(task?.updatedAt).toLocaleString()
            : 'Not specified'
        }</li>
      </ul>

      <p>Kindly ensure to complete this task before the due date to avoid any delays or issues. ✅</p>

      <p>If you have any questions or need further assistance, please don't hesitate to reach out. 📧</p>

      <p>Best regards,<br>  
      Your MoAppPlattform Team 🚀</p>
    </body>
  </html>
`;
