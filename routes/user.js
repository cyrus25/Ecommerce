const express=require('express');
const router=express.Router();
const userController=require('../controllers/user');
const authController=require('../controllers/auth');



router.get('/secret/:userId',authController.requireSignIn,authController.isAuth,function(req,res){

  res.json({
      user:req.profile
  });


});


router.get('/user/:userId',authController.requireSignIn,authController.isAuth,userController.read);
router.put('/user/:userId',authController.requireSignIn,authController.isAuth,userController.update);



router.param('userId',userController.userId);  //this middleware runs when there is user id in route


module.exports=router;