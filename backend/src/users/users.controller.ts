import { Controller, Get, Put, Delete, Param, Body, Req, UseGuards, HttpCode, HttpStatus, ForbiddenException, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('search')
  async searchUsers(@Query('term') term: string) {
    return this.usersService.searchUsers(term);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id/name')
  async updateName(@Param('id') id: string, @Body() input: { name: string }, @Req() req: any) {
    if (req.user.userId !== Number(id)) {
      throw new ForbiddenException('You are not allowed to update another user\'s data.');
    }
    return this.usersService.updateUserName(Number(id), input.name);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id/email')
  async updateEmail(@Param('id') id: string, @Body() input: { email: string }, @Req() req: any) {
    if (req.user.userId !== Number(id)) {
      throw new ForbiddenException('You are not allowed to update another user\'s data.');
    }
    return this.usersService.updateUserEmail(Number(id), input.email);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id/password')
  async updatePassword(@Param('id') id: string, @Body() input: { password: string }, @Req() req: any) {
    if (req.user.userId !== Number(id)) {
      throw new ForbiddenException('You are not allowed to update another user\'s data.');
    }
    return this.usersService.updateUserPassword(Number(id), input.password);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Req() req: any) {
    if (req.user.userId !== Number(id)) {
      throw new ForbiddenException('You are not allowed to delete another user\'s data.');
    }
    return this.usersService.deleteUser(Number(id));
  }
}
