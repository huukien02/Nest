import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { News } from './news.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}

  async findAll(): Promise<any> {
    try {
      const listNews = await this.newsRepository.find();
      return {
        list_news: listNews,
      };
    } catch (error) {
      throw new Error('Find New Failed');
    }
  }

  async create(news: any): Promise<any> {
    try {
      await this.newsRepository.save(this.newsRepository.create(news));

      return {
        status: HttpStatus.OK,
        message: 'Create New Success',
      };
    } catch (error) {
      console.error('Error during New creation:', error);
      throw new Error('Create Failed');
    }
  }

  async delete(newId: any): Promise<any> {
    try {
      const news = await this.newsRepository.findOne({
        where: { id: newId },
      });

      if (!news) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'User Not Found',
        };
      }

      await this.newsRepository.remove(news);

      return {
        status: HttpStatus.OK,
        message: 'Delete News Success',
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Delete Failed',
      };
    }
  }
}
