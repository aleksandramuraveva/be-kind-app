import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodDeedsController } from './good-deeds.controller';
import { GoodDeedsService } from './good-deeds.service';
import { UsersService } from '../users/users.service';
import { FriendsService } from '../friends/friends.service';
import { GoodDeed } from './entities/good-deed.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GoodDeed, User])],
  controllers: [GoodDeedsController],
  providers: [GoodDeedsService, UsersService, FriendsService],
})
export class GoodDeedsModule {}
