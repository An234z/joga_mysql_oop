const authorDbModel = require('../models/author');
const articleDbModel = require('../models/article');

const authorModel = new authorDbModel();
const articleModel = new articleDbModel();

class AuthorController {
    constructor() {}
    async findArticlesWithAuthorsByAuthorId(authorId) {
        const sql = `
            SELECT articles.*, authors.name as author_name 
            FROM articles
            JOIN authors ON articles.author_id = authors.id
            WHERE articles.author_id = ?`;
        const results = await db.query(sql, [authorId]);
        return results;
    }
    

    async getAuthorById(req, res) {
        try {
            const author = await authorModel.findById(req.params.id);
            if (!author) {
                return res.status(404).json({ error: 'Author not found' });
            }
    
            const articles = await articleModel.findManyByAuthorId(author.id); 
            author['articles'] = articles;
            res.status(201).json({ author: author });
    
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch author data' });
        }
    }
    
}

module.exports = AuthorController;
