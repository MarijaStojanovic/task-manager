import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
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

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body()
    updateData: Partial<{
      title: string;
      description?: string;
      status: string;
    }>,
  ) {
    return this.taskService.updateTask(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
