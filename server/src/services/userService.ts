import mongoose from 'mongoose';
import User from '../entities/userEntity';
import { IUser } from '../models/user';

class UserService {

    async getAllUsers(user: any): Promise<IUser[]> {
        const matchConditions: any = {
            _id: { $ne: new mongoose.Types.ObjectId(user.id) }
        };
        if (user.company) {
            matchConditions.company = user.company;
        }
        if (user.userType != 'admin') {
            matchConditions.userType = { $ne: 'admin' }
        }
        return User.aggregate([
            { $match: matchConditions }
        ]);
    }

    async getUserById(userId: string): Promise<IUser | null> {
        return User.findById(userId);
    }

    async getUserByEmailId(email: string): Promise<IUser | null> {
        return User.findOne({ email }).exec();
    }

    async createUser(user: IUser): Promise<IUser> {
        return User.create(user);
    }

    async updateUser(userId: string, updatedUser: IUser): Promise<IUser | null> {
        return User.findByIdAndUpdate(userId, updatedUser, { new: true });
    }

    async deleteUser(userId: string): Promise<void> {
        await User.findByIdAndDelete(userId);
    }
}

export default new UserService();
