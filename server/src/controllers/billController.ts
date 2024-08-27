import { Request, Response, Router } from 'express';
import billService from '../services/billService';
import { IBill } from '../models/bill';
import { authenticateJWT } from './authController';

const router: Router = Router();

class BillController {
    async getAllBills(req: Request, res: Response): Promise<void> {
        try {
            const bills: IBill[] = await billService.getAllBills(req.user);
            res.json({ success: true, data: bills });
        } catch (error: any) {
            res.status(500).send({ success: false, message: error.message });
        }
    }

    async getBillById(req: Request, res: Response): Promise<void> {
        try {
            const billId = req.params.id;
            const bill = await billService.getBillById(billId);
            if (bill) {
                res.json({ success: true, data: bill });
            } else {
                res.status(404).send({ success: false, message: 'Bill not found' });
            }
        } catch (error: any) {
            res.status(500).send({ success: false, message: error.message });
        }
    }

    async createBill(req: Request, res: Response): Promise<void> {
        try {
            const newBill: IBill = req.body;
            if (req.user.userType !== 'admin') {
                newBill.company = req.user?.company
            }
            newBill.userId = req.user.id;
            newBill.paidStatus = 'Unpaid';
            newBill.itemStatus = 'Opened';
            const createdBill: IBill = await billService.createBill(newBill);
            res.json({ success: true, data: createdBill });
        } catch (error: any) {
            res.status(500).send({ success: false, message: error.message });
        }
    }

    async updateBill(req: Request, res: Response): Promise<void> {
        try {
            const billId = req.params.id;
            const updatedBill: IBill = req.body;
            const bill = await billService.updateBill(billId, updatedBill);
            if (bill) {
                res.json({ success: true, data: bill });
            } else {
                res.status(404).send({ success: false, message: 'Bill not found' });
            }
        } catch (error: any) {
            res.status(500).send({ success: false, message: error.message });
        }
    }

    async deleteBill(req: Request, res: Response): Promise<void> {
        try {
            const billId = req.params.id;
            await billService.deleteBill(billId);
            res.send({ success: true, data: 'Bill deleted successfully' });
        } catch (error: any) {
            res.status(500).send({ success: false, message: error.message });
        }
    }
}

const controller = new BillController()
router.get('/', authenticateJWT, controller.getAllBills);
router.get('/:id', authenticateJWT, controller.getBillById);
router.post('/', authenticateJWT, controller.createBill);
router.put('/:id', authenticateJWT, controller.updateBill);
router.delete('/:id', authenticateJWT, controller.deleteBill);

export default router;