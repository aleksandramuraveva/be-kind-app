import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findUserById(userId: number): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { userId },
      relations: ['goodDeeds', 'friends'],
    });
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { email },
      relations: ['goodDeeds', 'friends'],
    });
  }

  async findUserByUniqueTag(uniqueTag: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { uniqueTag },
      relations: ['goodDeeds', 'friends'],
    });
  }

  async searchUsers(term: string): Promise<User[]> {
    return this.usersRepository.find({
      where: [{ username: term }, { uniqueTag: term }],
    });
  }

  async createUser(input: {
    name: string;
    email: string;
    password: string;
  }): Promise<User> {
    const uniqueTag = `${input.name}${uuidv4().slice(0, 6)}`;
    const newUser: User = this.usersRepository.create({
      username: input.name,
      email: input.email,
      password: input.password,
      uniqueTag,
      goodDeeds: [],
      friends: [],
    });
    return this.usersRepository.save(newUser);
  }

  async updateUserName(userId: number, newName: string): Promise<User> {
    const user = await this.findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.username = newName;
    user.updatedAt = new Date();
    return this.usersRepository.save(user);
  }

  async updateUserEmail(userId: number, newEmail: string): Promise<User> {
    const user = await this.findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.email = newEmail;
    user.updatedAt = new Date();
    return this.usersRepository.save(user);
  }

  async updateUserPassword(userId: number, newPassword: string): Promise<User> {
    const user = await this.findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.updatedAt = new Date();
    return this.usersRepository.save(user);
  }



  async deleteUser(userId: number): Promise<void> {
    const user = await this.findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    await this.usersRepository.createQueryBuilder()
      .delete()
      .from('good_deed')
      .where('userId = :userId', { userId })
      .execute();


    await this.usersRepository.createQueryBuilder()
      .delete()
      .from('user_friends_user')
      .where('userUserId_1 = :userId', { userId })
      .orWhere('userUserId_2 = :userId', { userId })
      .execute();

    await this.usersRepository.delete(userId);
  }

  async saveUser(user: User): Promise<User> {
    return this.usersRepository.save(user);
  
  }
}
