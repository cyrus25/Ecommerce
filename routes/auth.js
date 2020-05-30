const express=require('express');
const router=express.Router();
const  authController=require('../controllers/auth');
const {userSignUpValidator}=require('../validator/index');




router.post("/signup",userSignUpValidator,authController.signup);
router.post('/signin',authController.signin);
router.post('/signout',authController.signout);

router.get("/create",authController.signups);

router.get('/hello',authController.requireSignIn,function(req,res){
    res.send("hello");
})




module.exports=router;