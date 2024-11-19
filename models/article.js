const BaseSQLModel = require('./base');

class ArticleModel extends BaseSQLModel {
    constructor() {
        super('article');
    }

    async findOneBySlug(slug) {
        return await this.findOne('slug', slug); 
    }
}

module.exports = ArticleModel;
