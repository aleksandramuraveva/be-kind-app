import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoodDeed } from './entities/good-deed.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class GoodDeedsService {
  constructor(
    @InjectRepository(GoodDeed)
    private goodDeedsRepository: Repository<GoodDeed>,
    private usersService: UsersService,
  ) {}

  async create(goodDeed: {
    userId: number;
    content: string;
  }): Promise<GoodDeed> {
    const user = await this.usersService.findUserById(goodDeed.userId);
    if (!user) {
      throw new Error('User not found');
    }

    const newDeed = this.goodDeedsRepository.create({
      ...goodDeed,
      createdAt: new Date(),
      updatedAt: new Date(),
      user: user,
    });

    return this.goodDeedsRepository.save(newDeed);
  }

  async findAllByUser(userId: number): Promise<GoodDeed[]> {
    return this.goodDeedsRepository.find({
      where: { userId },
      relations: ['user'],
    });
  }

  async update(id: number, content: string): Promise<GoodDeed | undefined> {
    const goodDeed = await this.goodDeedsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (goodDeed) {
      goodDeed.content = content;
      goodDeed.updatedAt = new Date();
      return this.goodDeedsRepository.save(goodDeed);
    }
    return undefined;
  }

  async delete(id: number): Promise<GoodDeed | undefined> {
    const goodDeed = await this.goodDeedsRepository.findOne({ where: { id } });
    if (goodDeed) {
      await this.goodDeedsRepository.delete(id);
      return goodDeed;
    }
    return undefined;
  }
}
