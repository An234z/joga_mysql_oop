const ArticleModel = require('../models/article');

class ArticleController {
    constructor() {
        this.model = new ArticleModel();
    }

    async getAllArticles(req, res) {
        try {
            const articles = await this.model.findAll();
            res.json(articles);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch articles' });
        }
    }

    async getArticleBySlug(req, res) {
        try {
            const slug = req.params.slug;
            const article = await this.model.findOneBySlug(slug);

            if (!article) {
                return res.status(404).json({ error: 'Article not found' });
            }

            res.json(article);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch article' });
        }
    }

    async createNewArticle(req, res) {
        const newArticle = {
            name: req.body.name,
            slug: req.body.slug,
            image: req.body.image,
            body: req.body.body,
            author_id: req.body.author_id,
            published: new Date().toISOString().slice(0, 19).replace('T', ' '),
        };

        console.log("Creating new article:", newArticle);
        
        try {
            const articleId = await this.model.create(newArticle);
            res.status(201).json({
                message: `Created article with ID ${articleId}`,
                article: { id: articleId, ...newArticle },
            });
        } catch (error) {
            res.status(500).json({ error: 'Failed to create article' });
        }
    }
}

module.exports = ArticleController;
