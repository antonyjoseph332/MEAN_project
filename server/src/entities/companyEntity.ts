import mongoose, { Schema } from 'mongoose';
import { ICompany } from '../models/company';

const companySchema: Schema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    createdAt: { type: Date, required: false },
    createdBy: { type: String, required: false },
});

export default mongoose.model<ICompany>('Companys', companySchema);
