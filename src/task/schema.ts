import { Schema, Document } from 'mongoose';

export const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now },
});

export interface Task extends Document {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
}
