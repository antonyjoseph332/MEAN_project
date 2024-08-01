import mongoose, { Schema } from 'mongoose';
import { ICompany } from '../models/company';

const companySchema: Schema = new Schema({
    name: { type: String, required: true },
    type: { type: Number, required: true },
    address: { type: String, required: true },
    phone: { type: Number, required: true },
    createdAt: { type: Date, required: false },
});

export default mongoose.model<ICompany>('Companys', companySchema);
