
export interface ICompany extends Document {
    name: string;
    type: string;
    address: string;
    phone: number;
    createdAt: Date;
}