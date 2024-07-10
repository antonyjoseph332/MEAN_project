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
const userEntity_1 = __importDefault(require("../entities/userEntity"));
class UserService {
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return userEntity_1.default.find();
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return userEntity_1.default.findById(userId);
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return userEntity_1.default.create(user);
        });
    }
    updateUser(userId, updatedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return userEntity_1.default.findByIdAndUpdate(userId, updatedUser, { new: true });
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield userEntity_1.default.findByIdAndDelete(userId);
        });
    }
}
exports.default = new UserService();
