const express = require("express");
const Bookdata = require('../models/Bookdata');
const booksRouter = express.Router();
function router(nav){
  
    booksRouter.get('/',(request,response)=>{
        Bookdata.find()
            .then(function(books){
                response.render('books',
                {
                    nav,
                    title:'BOOKS',
                    books
                });
            })
            
    });
 
    booksRouter.get('/:bookid',(request,response)=>{
        const book_id = request.params.bookid;
        Bookdata.findOne({_id : book_id})
            .then(function(book){
                response.render('book',
                {
                    nav,
                    title:'BOOK',
                    book
                });
            })
            
    });

    return booksRouter;

}

module.exports = router;
