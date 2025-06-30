import { Schema, Document } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
  name?: string;
}

export const UserSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
});
