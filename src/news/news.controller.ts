import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  getNews(@Req() req: any): any {
    return this.newsService.findAll();
  }

  @Post('create')
  create(@Body() body: any): any {
    return this.newsService.create(body);
  }

  @Delete('delete/:id')
  delete(@Param('id') newId: any): any {
    return this.newsService.delete(newId);
  }
}
