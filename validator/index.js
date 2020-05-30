module.exports.userSignUpValidator=function(req,res,next){

     

    req.check('name','Name is required').notEmpty()
    req.check('email','Email must be between 6 and 32 characters')
    .matches(/.+\@.+\..+/)
    .withMessage('Email must contains @')
    .isLength({
        min:4,
        max:32
    });
    req.check('password',"Password is required").notEmpty()
    req.check('password')
    .isLength({min:6})
    .withMessage("password must contain atleast 6 characters")
    .matches(/\d/)
    .withMessage('password must contain a number')


    const errors=req.validationErrors();

    if(errors){
        const firstError=errors.map(err=>err.msg)[0];
        return res.status(400).json({err:firstError});
    }

  next();



};