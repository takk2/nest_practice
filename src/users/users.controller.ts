import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.sercvice';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserData: Omit<User, 'id'>): User {
    return this.usersService.create(createUserData);
  }

  @Get()
  findAll(): User[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): User {
    const user = this.usersService.findOne(+id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserData: Partial<User>): User {
    const user = this.usersService.update(+id, updateUserData);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Delete(':id')
  remove(@Param('id') id: string): { success: boolean } {
    const isDeleted = this.usersService.remove(+id);
    if (!isDeleted) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return { success: true };
  }
}
