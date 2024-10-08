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

@Controller('good-deeds')
@UseGuards(AuthGuard)
export class GoodDeedsController {
  constructor(private goodDeedsService: GoodDeedsService) {}

  @Post()
  create(@Body() body: { userId: number; content: string }, @Req() req: RequestWithUser) {
    if (req.user.userId !== body.userId) {
      throw new ForbiddenException('You can only add good deeds to your own account.');
    }
    return this.goodDeedsService.create(body);
  }

  @Get(':userId')
  findAllByUser(@Param('userId') userId: number, @Req() req: RequestWithUser) {
    if (req.user.userId !== userId) {
      throw new ForbiddenException('You can only view your own good deeds.');
    }
    return this.goodDeedsService.findAllByUser(userId);
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
