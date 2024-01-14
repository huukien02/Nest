import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Req() req: any): any {
    return this.usersService.findAll();
  }

  @Get(':id')
  getUserById(@Param('id') userId: any): any {
    return this.usersService.findById(userId);
  }

  @Post('create')
  create(@Body() body: { username: string; password: string }): any {
    return this.usersService.create(body);
  }

  @Post('admin-login')
  loginAdmin(@Body() body: { username: string; password: string }): any {
    return this.usersService.loginAdmin(body);
  }

  @Post('user-login')
  userAdmin(@Body() body: { username: string; password: string }): any {
    return this.usersService.loginUser(body);
  }

  @Delete('delete/:id')
  delete(@Param('id') userId: any): any {
    return this.usersService.delete(userId);
  }
}
