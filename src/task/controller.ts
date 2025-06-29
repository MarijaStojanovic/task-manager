import { Controller, Post, Body } from '@nestjs/common';
import { TaskService } from './service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() body: { title: string; description?: string }) {
    return this.taskService.createTask(body.title, body.description);
  }
}
