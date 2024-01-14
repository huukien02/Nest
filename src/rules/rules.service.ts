import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Rules } from './rules.entity';

@Injectable()
export class RulesService {
  constructor(
    @InjectRepository(Rules)
    private readonly rulesRepository: Repository<Rules>,
  ) {}

  async findAll(): Promise<any> {
    try {
      const rules = await this.rulesRepository.find();
      return {
        rules: rules,
      };
    } catch (error) {
      throw new Error('Find rules Failed');
    }
  }

  async findById(ruleId: any): Promise<any> {
    try {
      const rule = await this.rulesRepository.findOne({
        where: { id: ruleId },
      });
      return {
        rules: rule,
      };
    } catch (error) {
      throw new Error('Find activity Failed');
    }
  }

  async create(rule: any): Promise<any> {
    try {
      await this.rulesRepository.save(this.rulesRepository.create(rule));

      return {
        status: HttpStatus.OK,
        message: 'Create rule Success',
      };
    } catch (error) {
      console.error('Error during rule creation:', error);
      throw new Error('Create Failed');
    }
  }

  async delete(ruleId: any): Promise<any> {
    try {
      const activity = await this.rulesRepository.findOne({
        where: { id: ruleId },
      });

      if (!activity) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Rules Not Found',
        };
      }

      await this.rulesRepository.remove(activity);

      return {
        status: HttpStatus.OK,
        message: 'Delete Rules Success',
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Delete Failed',
      };
    }
  }
}
