import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task } from './task.schema';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private taskModel: Model<Task>) {}

  async isOwner(userId: string, taskId: string): Promise<boolean> {
    const task = await this.taskModel.findById(taskId).exec();
    if (!task) {
      return false;
    }
    return (task.user as Types.ObjectId).toString() === userId;
  }

  async createTask(title: string, userId: string, description?: string) {
    const task = new this.taskModel({ title, description, user: userId });
    return task.save();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().lean().exec();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).lean().exec();
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async updateTask(id: string, userId: string, updateData: Partial<Task>): Promise<Task> {
    const task = await this.taskModel
      .findById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    const isOwner = await this.isOwner(userId, id);
    if (!isOwner) {
      throw new ForbiddenException('You do not have permission to update this task');
    }
    Object.assign(task, updateData);
    return task.save();
  }

  async deleteTask(id: string, userId: string): Promise<void> {
    const result = await this.taskModel.deleteOne({
      _id: new Types.ObjectId(id),
      user: new Types.ObjectId(userId),
    });

    if (result.deletedCount === 0) {
      throw new NotFoundException('Task not found or not owned by user');
    }
  }
}
