const express = require("express");
const Bookdata = require('../models/Bookdata');
const Authordata = require('../models/Authordata');
const   membersRouter = express.Router();
function router(nav){
     const nav_items =[
        {link:'/members/books'  ,name:'Books'},
        {link:'/members/authors',name:'Authors'}
    ];
    membersRouter.get('',(req,res)=>{
        res.render('members',
        {
            nav,
            title: 'LIBRARY',
            heading: 'Welcome'
        })
    })
    membersRouter.get('/books',(request,response)=>{
        Bookdata.find()
            .then(function(books){
                response.render('books',
                {
                    nav : nav_items,
                    title:'BOOKS',
                    books,
                    user_link: '/members'
                });
            })
    });
    membersRouter.get('/books/:bookid',(request,response)=>{
        const book_id = request.params.bookid;
        Bookdata.findOne({_id : book_id})
            .then(function(book){
                response.render('book',
                {
                    nav : nav_items,
                    title:'BOOK',
                    book,
                    user_link: '/members'
                });
            })
    });
    membersRouter.get('/authors',(request,response)=>{
        Authordata.find()
            .then(function(authors){
                response.render('authors',
                {
                    nav : nav_items,
                    title:'AUTHORS',
                    authors,
                    user_link: '/members'
                });
            })
    });    
    membersRouter.get('/authors/:authorid',(request,response)=>{
        const author_id = request.params.authorid;
        Authordata.findOne({_id : author_id})
            .then(function(author){
                response.render('author',
                {
                    nav : nav_items,
                    title:'AUTHOR',
                    author,
                    user_link: '/members'
                });                
            })
    });

    return  membersRouter;
}

module.exports = router;