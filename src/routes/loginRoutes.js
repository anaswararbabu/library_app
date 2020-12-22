const express = require("express");
const Userdata = require('../models/Userdata');
const loginRouter = express.Router();
function router(nav){

  loginRouter.get('/',function(req,res){
    res.render('login',
    {
        nav,
        title:'LOGIN'
    });
  });

  loginRouter.post('/',  async (req, res) => {
      console.log(req.body);
      var err;
      const username = req.body.username;
      const password = req.body.password;
      if(username === 'admin' && password === 'admin123')
      {
        res.redirect('/admin');
      }
      else if(username === 'admin' && password != 'admin123')
      {
        err ="Invalid Admin Password"; 
        res.render('login',
        {
            nav,
            title:'LOGIN',
            'err' : err
        });
      }
      else{
        Userdata.findOne({ user_email : username })
        .then(function(user){  console.log(user);
          if(user === null){ 
            err = `Invalid User - SignUp for Login.` ;
            res.render('login',
            {
                nav,
                title:'LOGIN',
                'err' : err
            });
          }
          else{ 
            if(user.user_email === username && user.user_password === password){
                      res.redirect('/members');
            }
            else
            {
              err = "Invalid Username or Password";
              res.render('login',
              {
                  nav,
                  title:'LOGIN',
                  'err' : err
              });
            }

          }
        })
      }


      

  });

  return loginRouter;
}


module.exports = router;