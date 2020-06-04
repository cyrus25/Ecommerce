const express=require('express');
const router=express.Router();
const userController=require('../controllers/user');
const authController=require('../controllers/auth');
const categoryController=require('../controllers/category');


router.get('/category/:categoryId',categoryController.read);
router.post('/category/create/:userId',authController.requireSignIn,authController.isAuth,authController.isAdmin,categoryController.categoryCreate);
router.put('/category/:categoryId/:userId',authController.requireSignIn,authController.isAuth,authController.isAdmin,categoryController.categoryUpdate);
router.delete('/category/:categoryId/:userId',authController.requireSignIn,authController.isAuth,authController.isAdmin,categoryController.categoryDelete);
router.get('/categories',categoryController.list);
router.param('userId',userController.userId);
router.param('categoryId',categoryController.categoryId);

module.exports=router;