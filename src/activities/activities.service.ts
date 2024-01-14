import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Activities } from './activities.entity';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activities)
    private readonly activityRepository: Repository<Activities>,
  ) {}

  async findAll(): Promise<any> {
    try {
      const activities = await this.activityRepository.find();
      return {
        activities: activities,
      };
    } catch (error) {
      throw new Error('Find New Failed');
    }
  }

  async findById(activityId: any): Promise<any> {
    try {
      const activity = await this.activityRepository.findOne({
        where: { id: activityId },
      });
      return {
        activity: activity,
      };
    } catch (error) {
      throw new Error('Find activity Failed');
    }
  }

  async create(activity: any): Promise<any> {
    try {
      await this.activityRepository.save(
        this.activityRepository.create(activity),
      );

      return {
        status: HttpStatus.OK,
        message: 'Create activity Success',
      };
    } catch (error) {
      console.error('Error during activity creation:', error);
      throw new Error('Create Failed');
    }
  }

  async delete(activityId: any): Promise<any> {
    try {
      const activity = await this.activityRepository.findOne({
        where: { id: activityId },
      });

      if (!activity) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'User Not Found',
        };
      }

      await this.activityRepository.remove(activity);

      return {
        status: HttpStatus.OK,
        message: 'Delete activity Success',
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Delete Failed',
      };
    }
  }
}
