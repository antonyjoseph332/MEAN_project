import Company from '../entities/companyEntity';
import { ICompany } from '../models/company';

class CompanyService {
    async getAllCompanys(): Promise<ICompany[]> {
        return Company.find();
    }

    async getCompanyById(companyId: string): Promise<ICompany | null> {
        return Company.findById(companyId);
    }

    async createCompany(company: ICompany): Promise<ICompany> {
        return Company.create(company);
    }

    async updateCompany(companyId: string, updatedCompany: ICompany): Promise<ICompany | null> {
        return Company.findByIdAndUpdate(companyId, updatedCompany, { new: true });
    }

    async deleteCompany(companyId: string): Promise<void> {
        await Company.findByIdAndDelete(companyId);
    }
}

export default new CompanyService();
