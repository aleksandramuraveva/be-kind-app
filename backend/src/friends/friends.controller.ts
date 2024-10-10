import { Controller, Post, Get, Param, Body, UseGuards, Req } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RequestWithUser } from '../dto/request-with-user.dto';

@Controller('friends')
@UseGuards(AuthGuard)
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  @Post('add')
  async addFriend(@Body() body: { friendUniqueTag: string }, @Req() req: RequestWithUser) {
    const userId = req.user.userId;
    console.log('Add Friend - Request User ID:', userId);
    const friend = await this.friendsService.addFriend(
      userId,
      body.friendUniqueTag,
    );
    return {
      userId: friend.userId,
      username: friend.username,
      uniqueTag: friend.uniqueTag,
    }; 
  }

  @Get(':userId')
  async getFriends(@Param('userId') userId: string, @Req() req: RequestWithUser) {
    const authUserId = req.user.userId;
    const friends = await this.friendsService.getFriendsWithDeeds(authUserId, Number(userId));
    return friends.map((friend) => ({
      userId: friend.userId,
      username: friend.username,
      uniqueTag: friend.uniqueTag,
      goodDeeds: friend.goodDeeds,
    }));
  }
}
