import { Controller, Post, Patch, Get, Param, Body } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post()
  createTask(
    @Body('type') type: string,
    @Body('assignedUserId') userId: number,
  ) {
    return this.taskService.createTask(type, userId);
  }

  @Get('open')
  getOpenTasks() {
    return this.taskService.getOpenTasks();
  }

  @Patch(':id/status')
  changeStatus(
    @Param('id') id: string,
    @Body() body: { status: number; nextUserId: number; data: any },
  ) {
    return this.taskService.changeStatus(
      Number(id),
      body.status,
      body.nextUserId,
      body.data,
    );
  }

  @Post(':id/close')
  closeTask(@Param('id') id: number) {
    return this.taskService.closeTask(id);
  }

  @Get('/user/:userId')
  getUserTasks(@Param('userId') userId: number) {
    return this.taskService.getUserTasks(userId);
  }
}
