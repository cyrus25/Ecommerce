const User=require('../models/user');
const jwt=require("jsonwebtoken");  //to generate signed token
const expressJwt=require('express-jwt'); //for authorise check
module.exports.signup=(req,res)=>{
 
console.log(req.body);
    

const user=new User(req.body);
  user.save((err, user)=>{
      if(err){
          return res.status(400).json({
              err
          });
      }
      user.salt=undefined
      user.hashed_password=undefined
      res.json({
          user
      });
  });
   
  
  

}

module.exports.signups=(req,res)=>{


    return res.render('sign-up');

    
}

module.exports.signin=function(req,res){


   const{email,password}=req.body;
   User.findOne({email:email},function(err,user){

         if(err){
             res.status(400).json({
                 err:"User with that email don't exist"
             })
         }

          if(!user.authenticate(password)){
              res.status(401).json({
                  error:"email and passwrd dont match"
              })
          }
         

         
         const token=jwt.sign({_id:user._id},process.env.JWT_SECRET)
         res.cookie('t',token,{expire:new Date()+9999})

        const {_id,name,email,role}=user
         return res.json({token,user:{_id,name,email,role}});



   });






};



module.exports.signout=function(req,res){
    console.log("hello");
    res.clearCookie("t");
    res.json({message:"Sign-out successfull"});
};

module.exports.requireSignIn=expressJwt({   //install cookie parser


    secret:process.env.JWT_SECRET,
    userProperty:"auth"

});

exports.isAuth = (req,res,next)=>{

    console.log(req.auth);
   let user=req.profile&&req.auth&&req.profile._id==req.auth._id

   if(!user){
       return res.status(403).json({
           error:'Access denied'
       });
   }

   next();


}

exports.isAdmin = (req,res,next)=>{

  if(req.profile.role==0){
      return res.status(403).json({
          error:'Admin resourse,access denies'
      });
  }

  next();
}