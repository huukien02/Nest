import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import * as path from 'path';
import * as fs from 'fs';

import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<any> {
    try {
      const listUser = await this.userRepository.find();
      return {
        list_user: listUser,
      };
    } catch (error) {
      throw new Error('Find User Failed');
    }
  }

  async findById(userId: any): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      return {
        user: user,
      };
    } catch (error) {
      throw new Error('Find User Failed');
    }
  }

  async create(user: any): Promise<any> {
    try {
      const { username, password } = user;
      const isUser = await this.userRepository.findOne({ where: { username } });
      if (isUser) {
        return {
          status: HttpStatus.CONFLICT,
          message: 'Username already exists',
        };
      }

      await this.userRepository.save(this.userRepository.create(user));

      return {
        status: HttpStatus.OK,
        message: 'Create User Success',
      };
    } catch (error) {
      console.error('Error during user creation:', error);
      throw new Error('Create Failed');
    }
  }

  async delete(userId: any): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'User Not Found',
        };
      }

      await this.userRepository.remove(user);

      return {
        status: HttpStatus.OK,
        message: 'Delete User Success',
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Delete Failed',
      };
    }
  }

  async loginAdmin(body: any): Promise<any> {
    try {
      const { username, password } = body;
      const user = await this.userRepository.findOne({
        where: { username, password },
      });

      if (user.role != 0) {
        return {
          status: HttpStatus.FORBIDDEN,
        };
      }

      return {
        user: user,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new Error('Find User Failed');
    }
  }

  async loginUser(body: any): Promise<any> {
    try {
      const { username, password } = body;
      const user = await this.userRepository.findOne({
        where: { username, password },
      });
      if (!user) {
        return HttpStatus.NOT_FOUND;
      }

      return {
        user: user,
        status: HttpStatus.OK,
      };
    } catch (error) {}
  }
}
