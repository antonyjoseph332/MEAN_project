import mongoose, { Schema } from 'mongoose';
import { IArticle } from '../models/article';

const articleSchema: Schema = new Schema({
    article: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: false },
    company: { type: String, required: false },
    userId: { type: String, required: false },
});

export default mongoose.model<IArticle>('Articles', articleSchema);
