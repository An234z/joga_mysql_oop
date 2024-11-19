const BaseSQLModel = require('./base');

class ArticleModel extends BaseSQLModel {
    constructor() {
        super('article');
    }

    async findOneBySlug(slug) {
        return await this.findOne('slug', slug); 
    }

    async findManyByAuthorId(authorId) {
        return await this.findMany('author_id', authorId);
    }
}

module.exports = ArticleModel;
