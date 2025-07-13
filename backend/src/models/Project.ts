import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description?: string;
  status: 'active' | 'completed' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema<IProject> = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['active', 'completed', 'archived'], default: 'active' }
  },
  { timestamps: true }
);

export default mongoose.model<IProject>('Project', ProjectSchema);
