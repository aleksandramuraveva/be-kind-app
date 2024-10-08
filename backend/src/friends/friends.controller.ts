import { Controller, Post, Get, Param, Body, UseGuards, Req } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RequestWithUser } from '../dto/request-with-user.dto';

@Controller('friends')
@UseGuards(AuthGuard)
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  @Post('add')
  async addFriend(@Body() body: { userId: number; friendUniqueTag: string }, @Req() req: RequestWithUser) {
    console.log('Add Friend - Request User ID:', req.user.userId, 'Body User ID:', body.userId);  
    return this.friendsService.addFriend(
      Number(body.userId),
      body.friendUniqueTag,
    );
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
