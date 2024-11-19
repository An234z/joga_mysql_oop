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

    async create(article){
        const createdArticleId = await super.create(article)
        return createdArticleId
    }
    async update(id, data) {
        return await super.update(id, data);
        }
}

module.exports = ArticleModel;
