import { Request, Response, Router } from 'express';
import articleService from '../services/articleService';
import { IArticle } from '../models/article';
import { authenticateJWT } from './authController';

const router: Router = Router();

class ArticleController {
    async getAllArticles(req: Request, res: Response): Promise<void> {
        try {
            const articles: IArticle[] = await articleService.getAllArticles();
            res.json({ success: true, data: articles });
        } catch (error: any) {
            res.status(500).send({ success: false, message: error.message });
        }
    }

    async getArticleById(req: Request, res: Response): Promise<void> {
        try {
            const articleId = req.params.id;
            const article = await articleService.getArticleById(articleId);
            if (article) {
                res.json({ success: true, data: article });
            } else {
                res.status(404).send({ success: false, message: 'Article not found' });
            }
        } catch (error: any) {
            res.status(500).send({ success: false, message: error.message });
        }
    }

    async createArticle(req: Request, res: Response): Promise<void> {
        try {
            const newArticle: IArticle = req.body;
            const createdArticle: IArticle = await articleService.createArticle(newArticle);
            res.json({ success: true, data: createdArticle });
        } catch (error: any) {
            res.status(500).send({ success: false, message: error.message });
        }
    }

    async updateArticle(req: Request, res: Response): Promise<void> {
        try {
            const articleId = req.params.id;
            const updatedArticle: IArticle = req.body;
            const article = await articleService.updateArticle(articleId, updatedArticle);
            if (article) {
                res.json({ success: true, data: article });
            } else {
                res.status(404).send({ success: false, message: 'Article not found' });
            }
        } catch (error: any) {
            res.status(500).send({ success: false, message: error.message });
        }
    }

    async deleteArticle(req: Request, res: Response): Promise<void> {
        try {
            const articleId = req.params.id;
            await articleService.deleteArticle(articleId);
            res.send({ success: true, data: 'Article deleted successfully' });
        } catch (error: any) {
            res.status(500).send({ success: false, message: error.message });
        }
    }
}

const controller = new ArticleController()
router.get('/', authenticateJWT, controller.getAllArticles);
router.get('/:id', authenticateJWT, controller.getArticleById);
router.post('/', authenticateJWT, controller.createArticle);
router.put('/:id', authenticateJWT, controller.updateArticle);
router.delete('/:id', authenticateJWT, controller.deleteArticle);

export default router;