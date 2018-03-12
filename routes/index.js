const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const wikiRouter = require('./wiki');

module.exports = router

router.use('/wiki', wikiRouter);

router.get('/', (req, res, next) => {
    console.log('req.app', req.app.get)
    console.log('running get')
    res.render('index')
});
