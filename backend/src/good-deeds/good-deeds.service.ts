import { Injectable } from '@nestjs/common';
import { GoodDeed } from './entities/good-deed.entity';
import { UsersService } from '../users/users.service';

// Mock data
const goodDeeds: GoodDeed[] = [
  {
    id: 1,
    userId: 1,
    content: 'Helped an old lady cross the street',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    userId: 1,
    content: 'Donated clothes to charity',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    userId: 2,
    content: 'Cleaned the park',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

@Injectable()
export class GoodDeedsService {
  constructor(private usersService: UsersService) {}

  async create(goodDeed: {
    userId: number;
    content: string;
  }): Promise<GoodDeed> {
    const user = await this.usersService.findUserById(goodDeed.userId);
    if (!user) {
      throw new Error('User not found');
    }

    const newDeed: GoodDeed = {
      id: goodDeeds.length + 1,
      ...goodDeed,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    goodDeeds.push(newDeed);
    return newDeed;
  }

  findAllByUser(userId: number): GoodDeed[] {
    const numericUserId = Number(userId);
    const userDeeds = goodDeeds.filter((deed) => deed.userId === numericUserId);
    return userDeeds;
  }

  update(id: number, content: string): GoodDeed | undefined {
    const numericId = Number(id);
    const goodDeed = goodDeeds.find((deed) => deed.id === numericId);
    if (goodDeed) {
      goodDeed.content = content;
      goodDeed.updatedAt = new Date();
      console.log('Updated Good Deed:', goodDeed);
      return goodDeed;
    }
    return undefined;
  }

  delete(id: number): GoodDeed | undefined {
    const numericId = Number(id);
    const index = goodDeeds.findIndex((deed) => deed.id === numericId);
    if (index !== -1) {
      const deletedDeed = goodDeeds.splice(index, 1)[0];
      return deletedDeed;
    }
    return undefined;
  }
}
