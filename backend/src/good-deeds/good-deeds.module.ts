import { Module } from '@nestjs/common';
import { GoodDeedsController } from './good-deeds.controller';
import { GoodDeedsService } from './good-deeds.service';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [GoodDeedsController],
  providers: [GoodDeedsService, UsersService],
})
export class GoodDeedsModule {}