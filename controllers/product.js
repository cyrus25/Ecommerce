const Product=require('../models/product');
const formidable=require('formidable');
const _=require('lodash');
const fs=require('fs');
const errorHandler=require('../helpers/dbErrorHandler');
module.exports.productById=function(req,res,next,id){

    Product.findById(id,function(err,product){

      if(err||!product){
          res.status(400).json({
              error:"Product  not found"
          });
      }
    

      
        
       

      req.product=product;

      
       
      next();
       

    });




};
module.exports.productCreate=function(req,res){

   //console.log(req.body);



var form=new formidable.IncomingForm();
form.keepExtensions=true
form.parse(req,(err,fields,files)=>{

    if(err){
        return res.status(400).json({
            error:'Image could not be uploaded'
        });

    }

    let product=new Product(fields); //name email
    if(files.photo){   //files like pdf,img
        product.photo.data=fs.readFileSync(files.photo.path);
        product.photo.contentType=files.photo.type;

    }

    product.save((err,result)=>{
        if(err){
            return res.status(400).json({
                error:errorHandler
            })
        }
        res.json(result);

    })


})



};



module.exports.read=function(req,res){

    req.product.photo=undefined;
    return res.json(req.product);




}


module.exports.productDelete=function(req,res){


      let product=req.product;
      product.remove((err,deletedProduct)=>{
            
           if(err){
               return res.status(400).json({
                   error:errorHandler
               });
           }


           res.json({
               message:'Product deleted successfully!'
           })
            


      })




}