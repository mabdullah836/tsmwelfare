import { Schema, Document, model, models } from 'mongoose';

export interface INewsletter extends Document {
  email: string;
  createdAt: Date;
}

const NewsletterSchema = new Schema<INewsletter>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[^@\s]+@[^@\s]+\.[^@\s]+$/, 'Please enter a valid email address'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default models.Newsletter || model<INewsletter>('Newsletter', NewsletterSchema); 