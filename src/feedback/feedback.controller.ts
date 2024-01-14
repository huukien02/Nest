import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get()
  getFeedback(): any {
    return this.feedbackService.findAll();
  }

  @Post('create')
  create(@Body() body: any): any {
    return this.feedbackService.create(body);
  }

  @Delete('delete/:id')
  delete(@Param('id') feedbackId: string): any {
    return this.feedbackService.delete(feedbackId);
  }
}
