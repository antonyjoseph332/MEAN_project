"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = __importDefault(require("../services/userService"));
class UserController {
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userService_1.default.getAllUsers();
                res.json(users);
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const user = yield userService_1.default.getUserById(userId);
                if (user) {
                    res.json(user);
                }
                else {
                    res.status(404).send('User not found');
                }
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = req.body;
                const createdUser = yield userService_1.default.createUser(newUser);
                res.json(createdUser);
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const updatedUser = req.body;
                const user = yield userService_1.default.updateUser(userId, updatedUser);
                if (user) {
                    res.json(user);
                }
                else {
                    res.status(404).send('User not found');
                }
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                yield userService_1.default.deleteUser(userId);
                res.send('User deleted successfully');
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
    }
}
exports.default = new UserController();
