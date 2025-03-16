const express=require('express');
const mongoose=require('mongoose');
require('dotenv').config()
const userRoute = require('./routes/UserRoutes');
const categoryRoute=require('./routes/CategoryRoutes');
const productRoute=require('./routes/ProductRoutes');
const cartRoute=require('./routes/CartRoutes');
const feedbackRoute=require('./routes/FeedbackRoutes');
const orderRoute=require('./routes/OrderRoutes');
const wishlistRoute=require('./routes/WishlistRoutes');
var cors = require('cors')
const bodyParser = require('body-parser');
mongoose.connect(process.env.dbUrl).then(()=>{
    console.log("Connected to DB");

    const app = express();

    app.use(cors({
        origin: "http://localhost:5173",
        credentials: true,  
      }));

    app.use(bodyParser.json());
    app.use('/user',userRoute);
    app.use('/category',categoryRoute);
    app.use('/product',productRoute);
    app.use('/cart',cartRoute);
    app.use('/order',orderRoute);
    app.use('/wishlist',wishlistRoute);
    app.use('/feedback',feedbackRoute);


    app.listen(process.env.PORT,()=>{
        console.log("Server Started");
    })
});