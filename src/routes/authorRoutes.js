const express = require("express");
const Authordata = require('../models/Authordata');
const authorsRouter = express.Router();
function router(nav){
  
    authorsRouter.get('/',(request,response)=>{
        Authordata.find()
            .then(function(authors){
                response.render('authors',
                {
                    nav,
                    title:'AUTHORS',
                    authors
                });
            })

    });

    authorsRouter.get('/:authorid',(request,response)=>{
        const author_id = request.params.authorid;
        Authordata.findOne({_id : author_id})
            .then(function(author){
                response.render('author',
                {
                    nav,
                    title:'AUTHOR',
                    author
                });                
            })

    });

    return authorsRouter;

}

module.exports = router;
