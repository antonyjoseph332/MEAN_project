import { Request, Response, Router } from 'express';
import userService from '../services/userService';
import { IUser } from '../models/user';

const router: Router = Router();

class UserController {
    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users: IUser[] = await userService.getAllUsers();
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

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const newUser: IUser = req.body;
            const createdUser: IUser = await userService.createUser(newUser);
            res.json({ success: true, data: createdUser });
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
router.get('/', controller.getAllUsers);
router.get('/:id', controller.getUserById);
router.post('/', controller.createUser);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);

export default router;