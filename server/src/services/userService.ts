import User from '../entities/userEntity';
import { IUser } from '../models/user';

class UserService {
    async getAllUsers(): Promise<IUser[]> {
        return User.find();
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
