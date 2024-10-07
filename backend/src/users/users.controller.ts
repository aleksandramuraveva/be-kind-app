import {
  Controller,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  Body,
  UseGuards,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Put(':id/name')
  async updateName(@Param('id') id: string, @Body() input: { name: string }) {
    return this.usersService.updateUserName(Number(id), input.name);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id/email')
  async updateEmail(@Param('id') id: string, @Body() input: { email: string }) {
    return this.usersService.updateUserEmail(Number(id), input.email);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id/password')
  async updatePassword(@Param('id') id: string, @Body() input: { password: string }) {
    return this.usersService.updateUserPassword(Number(id), input.password);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(Number(id));
  }
}
