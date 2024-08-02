
export interface ICompany extends Document {
    name: string;
    type: string;
    address: string;
    phone: string;
    createdAt: Date;
}