import { Schema, Document, Types } from 'mongoose';
import { User } from '../users/user.schema';

export const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export interface Task extends Document {
  id: string;
  title: string;
  description?: string;
  status: string;
  createdAt: Date;
  user: Types.ObjectId | User;
}
