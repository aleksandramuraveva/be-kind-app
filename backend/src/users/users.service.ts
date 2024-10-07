import { Injectable } from '@nestjs/common';

export type User = {
  userId: number;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

// Mock data
const users: User[] = [
  {
    userId: 1,
    username: 'Maria',
    email: 'maria@example.com',
    password: 'passwordtest1@',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 2,
    username: 'John',
    email: 'john@example.com',
    password: 'passwordtest2@',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

@Injectable()
export class UsersService {
  async findUserByEmail(email: string): Promise<User | undefined> {
    return users.find((user) => user.email === email);
  }

  async createUser(input: { name: string; email: string; password: string }): Promise<User> {
    const newUser: User = {
      userId: users.length + 1,
      username: input.name,
      email: input.email,
      password: input.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    users.push(newUser);
    return newUser;
  }
}
