const User=require('../models/user');
module.exports.userId=function(req,res,next,id){

    User.findById(id,function(err,user){

      if(err||!user){
          res.status(400).json({
              error:"User not found"
          });
      }
    

      
        


      req.profile=user;
       
      next();
       

    });




};