import mongoose, { Schema } from 'mongoose';
import { IBill } from '../models/bill';

const billItemSchema: Schema = new Schema({
    serialNo: { type: Number, required: true },
    article: { type: String, required: true },
    noOfItem: { type: Number, required: true },
    deliveredItems: { type: Number, required: true },
    discount: { type: Number, required: false },
    price: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    amountToPay: { type: Number, required: true },
});

const billSchema: Schema = new Schema({
    orderDate: { type: String, required: true },
    deliveryDate: { type: String, required: false },
    items: { type: [billItemSchema], required: false },
    paidStatus: { type: String, required: false },
    itemStatus: { type: String, required: false },
    totalAmount: { type: String, required: false },
    deliveryAmount: { type: String, required: false },
    paidAmount: { type: String, required: false },
    totalItems: { type: String, required: false },
    totalDeliveredItems: { type: String, required: false },
    company: { type: String, required: true },
    userId: { type: String, required: true },
});

export default mongoose.model<IBill>('Bills', billSchema);
