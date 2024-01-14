import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './feedback.entity';
import { User } from 'src/users/users.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<any> {
    try {
      const feedback = await this.feedbackRepository.find({
        relations: ['user'],
      });

      return {
        list_feedback: feedback,
      };
    } catch (error) {
      throw new Error('Find User Failed');
    }
  }

  async create(body: any): Promise<any> {
    try {
      const { content, userId } = body;
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        throw new Error('User not found');
      }

      const feedback = this.feedbackRepository.create({ content, user });
      await this.feedbackRepository.save(
        this.feedbackRepository.create({ content, user }),
      );
      return {
        feedback: feedback,
        status: HttpStatus.OK,
      };
    } catch (error) {}
  }

  async delete(feedbackId: any): Promise<any> {
    try {
      const feedback = await this.feedbackRepository.findOne({
        where: { id: feedbackId },
      });

      console.log(feedback);

      if (!feedback) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Rules Not Found',
        };
      }

      await this.feedbackRepository.remove(feedback);

      return {
        status: HttpStatus.OK,
        message: 'Delete feedback Success',
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Delete Failed',
      };
    }
  }
}
