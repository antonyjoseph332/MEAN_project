"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const userController_1 = __importDefault(require("./controllers/userController"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
        this.connectDatabase();
    }
    config() {
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use((0, cors_1.default)());
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.send('Hello, this is the MEAN stack sample project!');
        });
        // User routes
        this.app.get('/api/users', userController_1.default.getAllUsers.bind(userController_1.default));
        this.app.get('/api/users/:id', userController_1.default.getUserById.bind(userController_1.default));
        this.app.post('/api/users', userController_1.default.createUser.bind(userController_1.default));
        this.app.put('/api/users/:id', userController_1.default.updateUser.bind(userController_1.default));
        this.app.delete('/api/users/:id', userController_1.default.deleteUser.bind(userController_1.default));
    }
    connectDatabase() {
        const dbUrl = 'mongodb://localhost:27017/mean_stack_sample';
        mongoose_1.default.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        mongoose_1.default.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
        mongoose_1.default.connection.once('open', () => {
            console.log('Connected to MongoDB');
        });
    }
}
exports.default = new App().app;
