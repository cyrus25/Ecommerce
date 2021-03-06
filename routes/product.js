const express=require('express');
const router=express.Router();
const userController=require('../controllers/user');
const authController=require('../controllers/auth');
const categoryController=require('../controllers/category');
const productController=require('../controllers/product');



router.get('/products',productController.list);
router.get('/product/:productId',productController.read);
router.post('/product/create/:userId',authController.requireSignIn,authController.isAuth,authController.isAdmin,productController.productCreate);
router.delete('/product/:productId/:userId',authController.requireSignIn,authController.isAuth,authController.isAdmin,productController.productDelete);
router.put('/product/:productId/:userId',authController.requireSignIn,authController.isAuth,authController.isAdmin,productController.productUpdate);
router.get('/products/related/:productId',productController.listRelated);
router.get('/products/categories',productController.listCategories);
router.post("/products/by/search", productController.listBySearch);
router.get('/product/photo/:productId',productController.photo);
router.param('userId',userController.userId);
router.param('productId',productController.productById);



module.exports=router;