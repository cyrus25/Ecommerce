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

module.exports.read=function(req,res){




    console.log(req.profile);
    


    req.profile.hashed_password=undefined;
    req.profile.salt=undefined;

    return res.json(req.profile);


}


module.exports.update=function(req,res){

     User.findOneAndUpdate({_id:req.profile._id},{$set:req.body},{new:true},(err,user)=>{
         if(err)
         {
             return res.status(400).json({
                 error:'You are not authorized to perform this action'
             });
         }

         user.hashed_password=undefined;
          user.salt=undefined;

          return res.json(user);


     })




}