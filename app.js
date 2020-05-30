const express=require('express');
const mongoose=require('mongoose');
const db=require('./config/mongoose');
const bodyParser = require('body-parser')
//bodyParser = require('body-parser').json();
const morgan=require('morgan');
const cookieParser=require('cookie-parser');
const expressValidator=require('express-validator');
require('dotenv').config();


const authRoutes=require('./routes/auth');
const userRoutes=require('./routes/user');
const categoryRoutes=require('./routes/category');
const productRoutes=require('./routes/product');
const app=express();





//app.use(bodyParser).json();
app.use(express.urlencoded({ extended: true }));
/*app.use(bodyParser.urlencoded({
    extended: true
  }));*/
app.use(cookieParser());
app.use(morgan('dev'));
app.use(expressValidator());

app.set('view engine','ejs');
app.set('views','./views');


app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);






    



const port=process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})
