import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() body: any) {
    return this.userService.createUser(body);
  }

  @Get('')
  getUser(@Query('page') page: string = '1', @Query('limit') limit: string = '10') {
    return this.userService.getUser(parseInt(page), parseInt(limit));
  }
}