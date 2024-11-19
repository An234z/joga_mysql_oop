const BaseSQLModel = require('./base');

class AuthorModel extends BaseSQLModel {
    constructor() {
        super('author');  
    }

    
    async findById(id) {
        return await this.findOne('id', id);  
    }
}

module.exports = AuthorModel;
