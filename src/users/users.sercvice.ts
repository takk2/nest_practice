import { Injectable } from '@nestjs/common';
import { User } from '../users/interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];
  private idCounter = 1;

  create(user: Omit<User, 'id'>): User {
    const newUser = {
      id: this.idCounter++,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  update(id: number, updateData: Partial<User>): User | null {
    const user = this.findOne(id);
    if (!user) {
      return null;
    }

    const updatedUser = { ...user, ...updateData };
    const index = this.users.findIndex((u) => u.id === id);
    this.users[index] = updatedUser;

    return updatedUser;
  }

  remove(id: number): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return false;
    }

    this.users.splice(index, 1);
    return true;
  }
}
