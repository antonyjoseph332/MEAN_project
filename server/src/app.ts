import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './controllers/userController';
import articleRouter from './controllers/articleController';
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}
class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.connectDatabase();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());
    }

    private routes(): void {
        this.app.use('/api/users', userRouter);
        this.app.use('/api/article', articleRouter);
    }

    private connectDatabase(): void {
        const dbUrl = 'mongodb://127.0.0.1:27017/template';
        mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true } as any);
        mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
        mongoose.connection.once('open', () => {
            console.log('Connected to MongoDB');
        });
    }
}

export default new App().app;
