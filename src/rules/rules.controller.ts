import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { RulesService } from './rules.service';

@Controller('rules')
export class RulesController {
  constructor(private readonly rulesService: RulesService) {}

  @Get()
  getNews(@Req() req: any): any {
    return this.rulesService.findAll();
  }

  @Post('create')
  create(@Body() body: any): any {
    return this.rulesService.create(body);
  }

  @Delete('delete/:id')
  delete(@Param('id') newId: any): any {
    return this.rulesService.delete(newId);
  }
}
