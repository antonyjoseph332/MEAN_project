import Bill from '../entities/billEntity';
import { IBill } from '../models/bill';

class BillService {
    async getAllBills(user: any): Promise<IBill[]> {
        const matchConditions: any = {
            company: { $eq: user.company }
        };
        return Bill.aggregate([
            { $match: user.userType != 'admin' ? matchConditions : {} }
        ]);
    }

    async getBillById(billId: string): Promise<IBill | null> {
        return Bill.findById(billId);
    }

    async createBill(bill: IBill): Promise<IBill> {
        return Bill.create(bill);
    }

    async updateBill(billId: string, updatedBill: IBill): Promise<IBill | null> {
        return Bill.findByIdAndUpdate(billId, updatedBill, { new: true });
    }

    async deleteBill(billId: string): Promise<void> {
        await Bill.findByIdAndDelete(billId);
    }
}

export default new BillService();
