const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const articleRoutes = require('./routes/articles');
const authorRoutes = require('./routes/authors');

app.use('/articles', articleRoutes);
app.use('/authors', authorRoutes);


app.listen(3021, () => {
    console.log('App is started at http://localhost:3021');
    app.get('/', (req, res) => {
        res.redirect('/articles');
    });
});
