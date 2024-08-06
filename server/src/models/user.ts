
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    mobile: string;
    description: string;
    dob: Date;
    img: string;
    userType: string;
    createdBy: string;
    company: string;
    _id?: string
}
