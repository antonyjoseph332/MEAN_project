import { Request, Response, Router } from 'express';
import userService from '../services/userService';
import { IUser } from '../models/user';
import bcrypt from 'bcrypt';
import { secret } from '../config';
import jwtToken from 'jsonwebtoken';
import { authenticateJWT } from './authController';

const router: Router = Router();

class UserController {

    async loginUser(req: Request, res: Response): Promise<void> {
        try {
            const { userName, password } = req.body;
            const user = await userService.getUserByEmailId(userName);
            if (user) {
                const userPassword = await bcrypt.compare(password, user.password);
                if (userPassword) {
                    const userDetails = {
                        id: user._id,
                        email: user.email,
                        name: user.name,
                        userType: user.userType,
                        company: user.company
                    }
                    const token = jwtToken.sign(userDetails, secret, { expiresIn: '1h' });
                    res.json({ success: true, data: { token, user } });
                } else {
                    res.json({ success: false, message: 'Invalid Password' });
                }
            }
            else {
                res.json({ success: false, message: 'Invalid credentials' });
            }
        } catch (error: any) {
            res.status(500).send({ success: false, message: error.message });
        }
    }

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const newUser: IUser = req.body;
            if (req.user.userType === 'admin') {
                newUser.userType = 'user'
            } else {
                newUser.company = req.user.company;
                newUser.createdBy = req.user.id;
                newUser.userType = req.user.userType
            }
            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(newUser.password, salt);
            const createdUser: IUser = await userService.createUser(newUser);
            res.json({ success: true, data: createdUser });
        } catch (error: any) {
            res.status(500).send({ success: false, message: error.message });
        }
    }

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users: IUser[] = await userService.getAllUsers(req.user);
            res.json({ success: true, data: users });
        } catch (error: any) {
            res.status(500).send({ success: false, message: error.message });
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.id;
            const user = await userService.getUserById(userId);
            if (user) {
                res.json({ success: true, data: user });
            } else {
                res.status(404).send({ success: false, message: 'User not found' });
            }
        } catch (error: any) {
            res.status(500).send({ success: false, message: error.message });
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.id;
            const updatedUser: IUser = req.body;
            const user = await userService.updateUser(userId, updatedUser);
            if (user) {
                res.json({ success: true, data: user });
            } else {
                res.status(404).send({ success: false, message: 'User not found' });
            }
        } catch (error: any) {
            res.status(500).send({ success: false, message: error.message });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.id;
            await userService.deleteUser(userId);
            res.send({ success: true, data: 'User deleted successfully' });
        } catch (error: any) {
            res.status(500).send({ success: false, message: error.message });
        }
    }

}

const controller = new UserController()
router.get('/', authenticateJWT, controller.getAllUsers);
router.get('/:id', authenticateJWT, controller.getUserById);
router.post('/login', controller.loginUser);
router.post('/', authenticateJWT, controller.createUser);
router.put('/:id', authenticateJWT, controller.updateUser);
router.delete('/:id', authenticateJWT, controller.deleteUser);

export default router;