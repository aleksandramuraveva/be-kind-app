import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { GoodDeedsService } from './good-deeds.service';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('good-deeds')
@UseGuards(AuthGuard)
export class GoodDeedsController {
  constructor(private goodDeedsService: GoodDeedsService) {}

  @Post()
  create(@Body() body: { userId: number; content: string }) {
    return this.goodDeedsService.create(body);
  }

  @Get(':userId')
  findAllByUser(@Param('userId') userId: number) {
    return this.goodDeedsService.findAllByUser(userId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { content: string }) {
    return this.goodDeedsService.update(Number(id), body.content);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.goodDeedsService.delete(Number(id));
  }
}
