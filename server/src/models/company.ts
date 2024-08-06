
export interface ICompany extends Document {
    name: string;
    type: string;
    address: string;
    phone: string;
    createdBy: string;
    createdAt: Date;
}