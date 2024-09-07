export function getEmailUsername(email: string): string {
    if (!email.includes('@')) {
      throw new Error('Invalid email address');
    }
  
    return email.split('@')[0];
  }