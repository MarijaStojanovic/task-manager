import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async updateTask(id: string, updateData: Partial<Task>): Promise<Task> {
    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    if (!updatedTask) {
      throw new NotFoundException('Task not found');
    }
    return updatedTask;
  }

  async deleteTask(id: string): Promise<void> {
    const deleted = await this.taskModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException('Task not found');
    }
  }
}
