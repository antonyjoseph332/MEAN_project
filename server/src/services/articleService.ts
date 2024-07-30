import Article from '../entities/articleEntity';
import { IArticle } from '../models/article';

class ArticleService {
    async getAllArticles(): Promise<IArticle[]> {
        return Article.find();
    }

    async getArticleById(articleId: string): Promise<IArticle | null> {
        return Article.findById(articleId);
    }

    async createArticle(article: IArticle): Promise<IArticle> {
        return Article.create(article);
    }

    async updateArticle(articleId: string, updatedArticle: IArticle): Promise<IArticle | null> {
        return Article.findByIdAndUpdate(articleId, updatedArticle, { new: true });
    }

    async deleteArticle(articleId: string): Promise<void> {
        await Article.findByIdAndDelete(articleId);
    }
}

export default new ArticleService();
