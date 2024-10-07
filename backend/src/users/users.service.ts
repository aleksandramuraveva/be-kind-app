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
  {
    userId: 3,
    username: 'Alex',
    email: 'alex@example.com',
    password: 'passwordtest3@',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 4,
    username: 'Sophia',
    email: 'sophia@example.com',
    password: 'passwordtest4@',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 5,
    username: 'Mike',
    email: 'mike@example.com',
    password: 'passwordtest5@',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 6,
    username: 'Emma',
    email: 'emma@example.com',
    password: 'passwordtest6@',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 7,
    username: 'Liam',
    email: 'liam@example.com',
    password: 'passwordtest7@',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 8,
    username: 'Olivia',
    email: 'olivia@example.com',
    password: 'passwordtest8@',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 9,
    username: 'Noah',
    email: 'noah@example.com',
    password: 'passwordtest9@',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 10,
    username: 'Ava',
    email: 'ava@example.com',
    password: 'passwordtest10@',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

@Injectable()
export class UsersService {
  async findUserById(userId: number): Promise<User | undefined> {
    return users.find(user => user.userId === userId);
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return users.find(user => user.email === email);
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

  async updateUserName(userId: number, newName: string): Promise<User> {
    const user = users.find(user => user.userId === userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.username = newName;
    user.updatedAt = new Date();
    console.log('Updated user:', user);
    return user;
  }

  async updateUserEmail(userId: number, newEmail: string): Promise<User> {
    const user = users.find(user => user.userId === userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.email = newEmail;
    user.updatedAt = new Date();
    console.log('Updated user email:', user);
    return user;
  }

  async updateUserPassword(userId: number, newPassword: string): Promise<User> {
    const user = users.find(user => user.userId === userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.password = newPassword;
    user.updatedAt = new Date();
    console.log('Updated user password:', user);
    return user;
  }

  async deleteUser(userId: number): Promise<void> {
    const index = users.findIndex(user => user.userId === userId);
    if (index === -1) {
      throw new Error('User not found');
    }
    users.splice(index, 1);
    console.log('Deleted user with ID:', userId);
  }
}