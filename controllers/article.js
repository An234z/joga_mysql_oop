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


    async updateArticle(req, res) {
        const articleId = req.params.id; 
        const updatedData = {};
    
    
        if (req.body.name) updatedData.name = req.body.name;
        if (req.body.slug) updatedData.slug = req.body.slug;
        if (req.body.image) updatedData.image = req.body.image;
        if (req.body.body) updatedData.body = req.body.body;
        if (req.body.author_id) updatedData.author_id = req.body.author_id;
        updatedData.published = new Date().toISOString().slice(0, 19).replace('T', ' '); // Uuendatud kuupäev
    
        if (Object.keys(updatedData).length === 0) {
            return res.status(400).json({ error: 'No valid fields provided to update' });
        }
    
        try {
            
            const updatedRows = await this.model.update(articleId, updatedData);
    
            if (updatedRows > 0) {
                res.status(200).json({ message: `Article with ID ${articleId} updated successfully` });
            } else {
                res.status(404).json({ error: 'Article not found or no changes made' });
            }
        } catch (error) {
            console.error('Error updating article:', error);
            res.status(500).json({ error: 'Failed to update article' });
        }
    }
    async deleteArticle(req, res) {
        const articleId = req.params.id;  
        try {
            
            const deletedRows = await this.model.delete(articleId);
            
            if (deletedRows > 0) {
                res.status(200).json({ message: `Article with ID ${articleId} deleted successfully` });
            } else {
                res.status(404).json({ error: 'Article not found' });
            }
        } catch (error) {
            console.error('Error deleting article:', error);
            res.status(500).json({ error: 'Failed to delete article' });
        }
    }
    
} 

module.exports = ArticleController;
