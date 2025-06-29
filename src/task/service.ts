import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schema';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private taskModel: Model<Task>) {}

  async createTask(title: string, description?: string): Promise<Task> {
    const newTask = new this.taskModel({ title, description });
    return newTask.save();
  }
}
