const Category=require('../models/category');
const errorHandler=require('../helpers/dbErrorHandler');
module.exports.categoryCreate=function(req,res){


    console.log(req.body);
    const category=new Category(req.body);

    category.save((err,data)=>{
        if(err){
            res.status(400).json({
                error: errorHandler(err)
            });
        }

      res.json({data});

    });


};
module.exports.categoryId=function(req,res,next,id){

       Category.findById(id).exec((err,category)=>{
           if(err||!category){

               return res.status(400).json({
                   error:'Category not found'
               })
           }

           req.category=category;
           next();
       })





}
module.exports.read=function(req,res){

    return res.json(req.category);
}



module.exports.categoryUpdate=function(req,res){

     
    let category=req.category;

    category.name=req.body.name;
    category.save((err,data)=>{
         
        if(err){
            return res.status(400).json({
                error:errorHandler
            })

        }
        res.json(data);


    })



}
module.exports.categoryDelete=function(req,res){

     
    let category=req.category;

    
    category.remove((err,data)=>{
         
        if(err){
            return res.status(400).json({
                error:errorHandler
            })

        }
        res.json({
            message:"Category deleted"
        });


    })



}
module.exports.list=function(req,res){

    Category.find().exec((err,data)=>{
        if(err){
            return res.status(400).json({
                error:errorHandler
            })

        }
       
        res.json(data);

    });




};