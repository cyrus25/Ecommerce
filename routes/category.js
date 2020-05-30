const express=require('express');
const router=express.Router();
const userController=require('../controllers/user');
const authController=require('../controllers/auth');
const categoryController=require('../controllers/category');



router.post('/category/create/:userId',authController.requireSignIn,authController.isAuth,authController.isAdmin,categoryController.categoryCreate);


router.param('userId',userController.userId);


module.exports=router;