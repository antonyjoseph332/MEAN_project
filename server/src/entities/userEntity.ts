import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../models/user';

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    mobile: { type: String, required: true },
    description: { type: String, required: false },
    dob: { type: Date, required: true },
    img: { type: String, required: false },
    company: { type: String, required: false },
    userType: { type: String, required: true },
    createdBy: { type: String, required: false }
});

export default mongoose.model<IUser>('User', UserSchema);