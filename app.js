const express = require("express");
const mongoose = require("mongoose");
// const db_url = 'mongodb://localhost:27017/ExpressJS_Library'
const db_url = 'mongodb+srv://user1:user1@ictak-library.zvpzy.mongodb.net/LIBRARY?retryWrites=true&w=majority'
const app = new express();

const port = process.env.PORT || 2000;

mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (error)=>{
    if(!error)
    {
        console.log('Success - Database Connected.');
    }
    else{
        console.log('Error - Unable to connect Database.')
    }
});


app.set('view engine','ejs');
app.set('views','./src/views');
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));


const login_nav =[
                  {link:'/signup',name:'SIGN UP'}
                 ];
const loginRouter = require('./src/routes/loginRoutes')(login_nav);


const signup_nav =[
                    {link:'/login',name:'LOGIN'}
                  ];
const signupRouter = require('./src/routes/signupRoutes')(signup_nav);


const admin_nav =[
    {link:'/admin'        ,name:'Home'},
    {link:'/admin/books'  ,name:'Books'},
    {link:'/admin/authors',name:'Authors'}
];
const adminRouter = require('./src/routes/adminRoutes')(admin_nav);

const members_nav =[
    {link:'/members'        ,name:'Home'},
    {link:'/members/books'  ,name:'Books'},
    {link:'/members/authors',name:'Authors'}
];
const membersRouter = require('./src/routes/membersRoutes')(members_nav);
app.use('/login'    ,loginRouter);
app.use('/signup'   ,signupRouter);
app.use('/admin'    ,adminRouter);
app.use('/members' ,membersRouter);


const nav =[
    {link:'/login'  ,name:'Login'}
      
];


app.get('/',function(req,res){
    res.render("index",  
    {
        nav,
        title: 'HOME',
        
    }); 
});


app.listen(port,(error)=>{
    if(!error)
    {
        console.log("Server Ready at "+ port);
    }  
});