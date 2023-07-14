const {newFood,getAllFood,removeFromCart,addToCart,getCart, updatecartItem, placeOrder} = require("../controllers/foodController");
const FoodRouter = require("express").Router();
const { ProductModel } = require("../Models/foodmodel");
const {auth}= require("../Middleware/auth.middleware")


FoodRouter.post("/addfood",auth,newFood);
FoodRouter.get("/fetchFood",getAllFood);
FoodRouter.delete("/cart/:id",auth,removeFromCart);
FoodRouter.patch("/cart",auth,addToCart);
FoodRouter.get("/cart",auth,getCart);

FoodRouter.patch("/cart/:itemId",auth,updatecartItem);

FoodRouter.patch("/placeorder",auth,placeOrder)





module.exports={FoodRouter}