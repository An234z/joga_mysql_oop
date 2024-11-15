const express = require('express');
const router = express.Router();
const articleControllerClass = require('../controllers/article'); 

const articleController = new articleControllerClass(); 

module.exports = router;
