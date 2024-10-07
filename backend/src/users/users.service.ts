import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export type User = {
  userId: number;
  username: string;
  email: string;
  password: string;
  uniqueTag: string;
  friends: User[];
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
    uniqueTag: 'Maria123abc',
    friends: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 2,
    username: 'John',
    email: 'john@example.com',
    password: 'passwordtest2@',
    uniqueTag: 'John456def',
    friends: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

@Injectable()
export class UsersService {
  async findUserById(userId: number): Promise<User | undefined> {
    return users.find((user) => user.userId === userId);
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return users.find((user) => user.email === email);
  }

  async createUser(input: {
    name: string;
    email: string;
    password: string;
  }): Promise<User> {
    const uniqueTag = `${input.name}${uuidv4().slice(0, 6)}`;
    const newUser: User = {
      userId: users.length + 1,
      username: input.name,
      email: input.email,
      password: input.password,
      uniqueTag: uniqueTag,
      friends: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    users.push(newUser);
    return newUser;
  }

  async updateUserName(userId: number, newName: string): Promise<User> {
    const user = users.find((user) => user.userId === userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.username = newName;
    user.updatedAt = new Date();
    console.log('Updated user:', user);
    return user;
  }

  async updateUserEmail(userId: number, newEmail: string): Promise<User> {
    const user = users.find((user) => user.userId === userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.email = newEmail;
    user.updatedAt = new Date();
    console.log('Updated user email:', user);
    return user;
  }

  async updateUserPassword(userId: number, newPassword: string): Promise<User> {
    const user = users.find((user) => user.userId === userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.password = newPassword;
    user.updatedAt = new Date();
    console.log('Updated user password:', user);
    return user;
  }

  async deleteUser(userId: number): Promise<void> {
    const index = users.findIndex((user) => user.userId === userId);
    if (index === -1) {
      throw new Error('User not found');
    }
    users.splice(index, 1);
    console.log('Deleted user with ID:', userId);
  }

  async findUserByUniqueTag(uniqueTag: string): Promise<User | undefined> {
    return users.find((user) => user.uniqueTag === uniqueTag);
  }
}
