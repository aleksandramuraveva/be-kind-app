import { Request } from 'express';

interface User {
  userId: number;
  username: string;
}

export interface RequestWithUser extends Request {
  user: User;
}
