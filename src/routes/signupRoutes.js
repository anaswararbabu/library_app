const express = require("express");
const bodyparser = require("body-parser");
const { check, validationResult, matchedData } = require("express-validator")
const Userdata = require('../models/Userdata');
const signupRouter = express.Router();
signupRouter.use(bodyparser.json());
const urlencodedParser = bodyparser.urlencoded({ extended: true });
signupRouter.use(urlencodedParser);

function router(nav){

    signupRouter.get('/',function(req,res){
        res.render('signup',
        {
            nav,
            title:'SIGNUP'
        });
    });

    signupRouter.post('/', urlencodedParser, 
        [
            check('fname','First Name is required')
                .isAlpha().withMessage('First Name must be of alphabets'),
            check('lname','Last Name is required')
                .isAlpha().withMessage('Last Name must be of alphabets'),
            check('email')
                .trim()
                .isEmail().withMessage('Invalid Email')
                .normalizeEmail(),
                
            check('password','Password is required')
                .isLength({ min: 8 }).withMessage('Password is required'),
            check('confirmpassword')
                .trim()
                .isLength({ min: 8 }).withMessage('Retype password')
                .custom(async (confirmPassword, {req})=>{
                    const password = req.body.password;
                    if(password != confirmPassword){ throw new Error('Password must match')}
                })
        ], 
        (request,response)=>{
            const { fname, lname, email } = request.body;
            const errors = validationResult(request);
            var alerts =errors.mapped();
            if(!errors.isEmpty()){

          
                    response.render('signup',
                    {
                        nav,
                        title:'SIGNUP',
                        'fname' : fname, 'lname' : lname, 'email' : email, 
                        alerts
                    });
            }
            else{
                var user_data = {
                    user_fname      : request.body.fname,
                    user_lname      : request.body.lname,
                    user_email      : request.body.email,
                    user_password   : request.body.password   
                };
                var user = Userdata(user_data);
                user.save();
                response.redirect('/login');
            }
    });

    function findUserByEmail(email){
        if(email){
            return new Promise((resolve,reject)=>{
                Userdata.findOne({user_email : req.body.email})
                    .exec((err,doc)=>{
                        if(err) return reject(err);
                        if(doc) return reject(new Error('This Email Already Exists !!'));
                        else return resolve(email)
                    })
                })
        }
    }

    return signupRouter;
}

module.exports = router;