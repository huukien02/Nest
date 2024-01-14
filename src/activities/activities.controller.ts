import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activityService: ActivitiesService) {}

  @Get()
  getActivity(): any {
    return this.activityService.findAll();
  }

  @Get(':id')
  getActivityById(@Param('id') activityId: any): any {
    return this.activityService.findById(activityId);
  }

  @Post('create')
  create(@Body() body: any): any {
    return this.activityService.create(body);
  }

  @Delete('delete/:id')
  delete(@Param('id') activityId: any): any {
    return this.activityService.delete(activityId);
  }
}
