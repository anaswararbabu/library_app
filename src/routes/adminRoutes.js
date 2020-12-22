const express = require("express");
const bodyparser = require("body-parser");
const { check, validationResult, matchedData } = require("express-validator")

const path = require('path');
const fs = require('fs');
const multer = require('multer');

const multerstorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname,'/uploads'));
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now())
    }
})

const Bookdata = require('../models/Bookdata');
const Authordata = require('../models/Authordata');
const adminRouter = express.Router();
adminRouter.use(bodyparser.json());
const urlencodedParser = bodyparser.urlencoded({ extended: false });
adminRouter.use(urlencodedParser);

//multer
var multerupload = multer({storage:multerstorage});


function router(nav){

    adminRouter.get('/',  (req, res, next) => {
        res.render('admin',
        {
            nav,
            title: 'ADMIN',
            heading: 'Welcome Admin'
        });
      });
 
    adminRouter.get('/books',(request,response)=>{
        Bookdata.find()
            .then(function(books){
                response.render('books',
                {
                    nav:[
                            {link:'/admin/books',name:'Books'},
                            {link:'/admin/add_book',name:'Add New Book'}
                    ],
                    title:'BOOKS',
                    books,
                    user_link : '/admin'
                });
            })
    });


    adminRouter.get('/books/:bookid',(request,response)=>{
        const book_id = request.params.bookid;
        Bookdata.findOne({_id : book_id})
            .then(function(book){
                response.render('book',
                {
                    nav:[
                        {link:'/admin/books',name:'Books'}
                    ],
                    title:'BOOK',
                    book,
                    user_link : '/admin'
                });
            })
    });  

    adminRouter.get('/update_book/:bookid', async (req,res)=>{
        const book_id = req.params.bookid;
        const book = await Bookdata.findById(book_id);

        res.render('edit_book',
        {
            nav:[
                 {link:'/admin/books/'+book_id,name:'Book'}
            ],
            title: 'EDIT BOOK DETAILS',
            id : book_id,
            book
        })        
    });

    
    adminRouter.post('/update_book/:bookid/book_edited', multerupload.single('image'), urlencodedParser, async (req,res)=>{

        const book_id  = req.params.bookid;
        var book_item = {
                            _id             : req.params.bookid,
                            book_title      : req.body.title,
                            book_author     : req.body.author,
                            book_genre      : req.body.genre,
                            book_imageUrl   : req.body.image,
                            book_image      : {
                                                data : fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                                                Type : 'image/jpeg'
                                            }
                        };

        var book = Bookdata(book_item);
        Bookdata.findByIdAndUpdate(req.params.bookid, book, {}, function (err,result) {
            if (err) { return next(err); }
               //redirect to book detail
               res.redirect('/admin/books/'+book_id);
            });
    });

    //DELETE One Book
    adminRouter.delete('/delete_book/:bookid', async (req,res)=>{
        const book_id =req.params.bookid;

        Bookdata.findByIdAndDelete({_id:book_id},function(err,result){
            if(err) { return next(err); }
            res.send("Success - Book Deleted");
        })
    });

    //GET Book form for ADD
    adminRouter.get('/add_book',  (req,res)=> {
        res.render('add_book',
        {
            nav,
            title: 'ADD NEW BOOK'
        })
    });
    adminRouter.post('/book_added', multerupload.single('image'), (req,res) =>{
        var book_item = {
                            book_title      : req.body.title,
                            book_author     : req.body.author,
                            book_genre      : req.body.genre,
                            book_imageUrl   : req.body.image,
                            book_image      : {
                                                data : fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                                                Type : 'image/jpeg'
                                              }
                        };
        
        var book = Bookdata(book_item);
        book.save();           
        res.redirect('/admin/books');
    });
    adminRouter.get('/authors',(request,response)=>{
        Authordata.find()
            .then(function(authors){
                response.render('authors',
                {
                    nav:[
                        {link:'/admin/authors',name:'Authors'},
                        {link:'/admin/add_author',name:'Add New Author'}
                    ],
                    title:'AUTHORS',
                    authors,
                    user_link: '/admin'
                });
            })

    });
    adminRouter.get('/authors/:authorid',(request,response)=>{
        const author_id = request.params.authorid;
        Authordata.findOne({_id : author_id})
            .then(function(author){
                response.render('author',
                {
                    nav:[
                        {link:'/admin/authors',name:'Authors'}
                    ],
                    title:'AUTHOR',
                    author,
                    user_link: '/admin'
                });                
            })
    });
    adminRouter.get('/update_author/:authorid', async (req,res)=>{
        const author_id = req.params.authorid;
        const author = await Authordata.findById(author_id);

        res.render('edit_author',
        {
            nav:[
                 {link:'/admin/authors/'+author_id,name:'Author'}
            ],
            title: 'EDIT AUTHOR DETAILS',
            id : author_id,
            author
        })        
    });
    adminRouter.post('/update_author/:authorid/author_edited', multerupload.single('image'), urlencodedParser, async (req,res)=>{

        const author_id  = req.params.authorid;
        var author_item = {
                                _id                 : req.params.authorid,
                                author_name         : req.body.name,
                                author_famousbooks  : req.body.famousbooks,
                                author_genre        : req.body.genre,
                                author_imageUrl     : req.body.image,
                                author_image        : {
                                                        data : fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                                                        Type : 'image/jpeg'
                                                    }
                            };        

        var author = Authordata(author_item);
        Authordata.findByIdAndUpdate(req.params.authorid, author, {}, function (err,result) {
            if (err) { return next(err); }
               res.redirect('/admin/authors/'+author_id);
            });
    });
    adminRouter.delete('/delete_author/:authorid', async (req,res)=>{
        const author_id =req.params.authorid;

        Authordata.findByIdAndDelete({_id:author_id},function(err,result){
            if(err) { return next(err); }
            res.send("Success - Author Deleted");
        })
    });
    adminRouter.get('/add_author',  (req,res)=> {
        res.render('add_author',
        {
            nav,
            title: 'ADD NEW AUTHOR'
        })
    });
    adminRouter.post('/author_added', multerupload.single('image'), (req,res)=> {
        var author_item = {
                                author_name         : req.body.name,
                                author_famousbooks  : req.body.famousbooks,
                                author_genre        : req.body.genre,
                                author_imageUrl     : req.body.image,
                                author_image        : {
                                                        data : fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                                                        Type : 'image/jpeg'
                                                      }
                            };

        var author = Authordata(author_item);
        author.save();            
        res.redirect('/admin/authors');
    });

    return adminRouter;
}

module.exports = router;