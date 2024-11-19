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
}

module.exports = ArticleController;
