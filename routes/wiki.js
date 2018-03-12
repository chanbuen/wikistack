const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;

module.exports = router

router.get('/', (req, res, next) => {
    res.redirect('/');
    // res.render('wikipage')
})

router.get('/add', (req, res, next) => {
    res.render('addpage')
});

router.post('/', (req, res, next) => {
    console.log('req is :', req.body)
    let newPage = {
        title : req.body.title,
        content : req.body.pageContent,
        status : req.body.pageStatus
    }
    const page = Page.build(newPage)

    page.save()
        .then((req, res, next) => {
            res.json({page}).redirect('/')
        })

    // let newUser = {
    //     name : req.body.authorName,
    //     email : req.body.authorEmail,
    // }
    
    // const user = User.build(newUser)

    // user.save()

    // Page.build(req.body)
    // .save()
    // .then(page => res.json({page}))
    // .catch(err => console.log("an err!", err))
    // res.json({"hello" : "goodbye"})
})