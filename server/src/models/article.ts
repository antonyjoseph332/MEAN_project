
export interface IArticle extends Document {
    article: string;
    price: number;
    description: string;
    company: string;
    userId: string;
}