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