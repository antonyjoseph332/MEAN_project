import { Request, Response, Router } from 'express';
import companyService from '../services/companyService';
import { ICompany } from '../models/company';
import { authenticateJWT } from './authController';

const router: Router = Router();

class CompanyController {
    async getAllCompanys(req: Request, res: Response): Promise<void> {
        try {
            const companys: ICompany[] = await companyService.getAllCompanys();
            res.json({ success: true, data: companys });
        } catch (error: any) {
            res.status(500).send({ success: false, message: error.message });
        }
    }

    async getCompanyById(req: Request, res: Response): Promise<void> {
        try {
            const companyId = req.params.id;
            const company = await companyService.getCompanyById(companyId);
            if (company) {
                res.json({ success: true, data: company });
            } else {
                res.status(404).send({ success: false, message: 'Company not found' });
            }
        } catch (error: any) {
            res.status(500).send({ success: false, message: error.message });
        }
    }

    async createCompany(req: Request, res: Response): Promise<void> {
        try {
            const newCompany: ICompany = req.body;
            newCompany.createdAt = new Date();
            const createdCompany: ICompany = await companyService.createCompany(newCompany);
            res.json({ success: true, data: createdCompany });
        } catch (error: any) {
            res.status(500).send({ success: false, message: error.message });
        }
    }

    async updateCompany(req: Request, res: Response): Promise<void> {
        try {
            const companyId = req.params.id;
            const updatedCompany: ICompany = req.body;
            const company = await companyService.updateCompany(companyId, updatedCompany);
            if (company) {
                res.json({ success: true, data: company });
            } else {
                res.status(404).send({ success: false, message: 'Company not found' });
            }
        } catch (error: any) {
            res.status(500).send({ success: false, message: error.message });
        }
    }

    async deleteCompany(req: Request, res: Response): Promise<void> {
        try {
            const companyId = req.params.id;
            await companyService.deleteCompany(companyId);
            res.send({ success: true, data: 'Company deleted successfully' });
        } catch (error: any) {
            res.status(500).send({ success: false, message: error.message });
        }
    }
}

const controller = new CompanyController()
router.get('/', authenticateJWT, controller.getAllCompanys);
router.get('/:id', authenticateJWT, controller.getCompanyById);
router.post('/', authenticateJWT, controller.createCompany);
router.put('/:id', authenticateJWT, controller.updateCompany);
router.delete('/:id', authenticateJWT, controller.deleteCompany);

export default router;