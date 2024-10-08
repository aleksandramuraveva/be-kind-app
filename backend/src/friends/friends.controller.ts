import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('friends')
@UseGuards(AuthGuard)
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  @Post('add')
  async addFriend(@Body() body: { userId: number; friendUniqueTag: string }) {
    return this.friendsService.addFriend(
      Number(body.userId),
      body.friendUniqueTag,
    );
  }

  @Get(':userId')
  async getFriends(@Param('userId') userId: string) {
    const friends = await this.friendsService.getFriendsWithDeeds(
      Number(userId),
    );
    return friends.map((friend) => ({
      userId: friend.userId,
      username: friend.username,
      uniqueTag: friend.uniqueTag,
      goodDeeds: friend.goodDeeds,
    }));
  }
}
