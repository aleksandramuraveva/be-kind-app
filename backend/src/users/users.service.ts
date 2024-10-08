import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { GoodDeed } from '../good-deeds/entities/good-deed.entity';
import { User } from './entities/user.entity'; // Import User entity
import { users, goodDeeds, populateGoodDeeds } from '../mock-data/mock-data';

@Injectable()
export class UsersService {
  async findUserById(userId: number): Promise<User | undefined> {
    const user = users.find((user) => user.userId === userId);
    if (user) {
      populateGoodDeeds(user, goodDeeds);
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    const user = users.find((user) => user.email === email);
    if (user) {
      populateGoodDeeds(user, goodDeeds);
    }
    return user;
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
      goodDeeds: [], // Initialize goodDeeds array
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    users.push(newUser);
    populateGoodDeeds(newUser, goodDeeds); // Populate good deeds for the new user
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
    populateGoodDeeds(user, goodDeeds);
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
    populateGoodDeeds(user, goodDeeds);
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
    populateGoodDeeds(user, goodDeeds);
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
    const user = users.find((user) => user.uniqueTag === uniqueTag);
    if (user) {
      populateGoodDeeds(user, goodDeeds);
    }
    return user;
  }
}
