import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TaskService } from './service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() body: { title: string; description?: string }) {
    return this.taskService.createTask(body.title, body.description);
  }

  @Get()
  async findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }
}
