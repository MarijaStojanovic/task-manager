import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Req,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post()
    async create(
    @Body() body: { title: string; description?: string },
    @Req() req: Request,
  ) {
    const user = req.user as { userId: string; email: string };
    return this.taskService.createTask(
      body.title,
      user.userId,
      body.description,
    );
  }

  @Get()
  async findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
