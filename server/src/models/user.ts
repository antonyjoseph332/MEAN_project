
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    mobile: string;
    description: string;
    dob: Date;
    img: string;
    _id?: string
}
