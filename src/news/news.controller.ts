import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  getNews(@Req() req: any): any {
    return this.newsService.findAll();
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  create(@UploadedFile() image, @Body() body: any): any {
    const newsData = {
      title: body.title,
      content: body.content,
      image: image,
    };
    return this.newsService.create(newsData);
  }

  @Delete('delete/:id')
  delete(@Param('id') newId: any): any {
    return this.newsService.delete(newId);
  }
}
