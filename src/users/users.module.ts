// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.sercvice';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
