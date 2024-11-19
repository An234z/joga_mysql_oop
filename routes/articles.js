const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/article');

const articleController = new ArticleController();

router.get('/', (req, res) => articleController.getAllArticles(req, res));
router.get('/article/:slug', (req, res) => articleController.getArticleBySlug(req, res));
router.post('/create', articleController.createNewArticle);
router.patch('/edit/:id', (req, res) => articleController.updateArticle(req, res));

module.exports = router;
