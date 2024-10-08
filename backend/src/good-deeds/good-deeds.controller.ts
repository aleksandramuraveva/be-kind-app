import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { GoodDeedsService } from './good-deeds.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RequestWithUser } from '../dto/request-with-user.dto';
import { FriendsService } from '../friends/friends.service';

@Controller('good-deeds')
@UseGuards(AuthGuard)
export class GoodDeedsController {
  constructor(
    private goodDeedsService: GoodDeedsService,
    private friendsService: FriendsService,
  ) {}

  @Post()
  create(@Body() body: { userId: number; content: string }, @Req() req: RequestWithUser) {
    console.log('Request User ID:', req.user.userId, 'Body User ID:', body.userId);
    if (req.user.userId !== body.userId) {
      throw new ForbiddenException('You can only add good deeds to your own account.');
    }
    return this.goodDeedsService.create(body);
  }

  @Get(':userId')
  async findAllByUser(@Param('userId') userId: number, @Req() req: RequestWithUser) {
    const paramUserId = Number(userId);
    const authUserId = req.user.userId;
    console.log('Request User ID:', authUserId, 'Param User ID:', paramUserId);

    if (authUserId !== paramUserId) {
      const friends = await this.friendsService.getFriendsWithDeeds(authUserId, authUserId);
      const isFriend = friends.some(friend => friend.userId === paramUserId);
      if (!isFriend) {
        console.log('Access Denied - User IDs do not match and not friends');
        throw new ForbiddenException('You can only view your own or your friends\' good deeds.');
      }
    }

    console.log('Access Granted - Fetching Good Deeds');
    return this.goodDeedsService.findAllByUser(paramUserId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { content: string }, @Req() req: RequestWithUser) {
    return this.goodDeedsService.update(Number(id), body.content);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.goodDeedsService.delete(Number(id));
  }
}
