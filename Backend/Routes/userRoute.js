// Importing all the required dependencies
const { registerNewUser ,loginUser} = require("../controllers/usercontroller");
const UserRouter = require("express").Router();




UserRouter.post("/register",registerNewUser);
UserRouter.post("/login",loginUser);


module.exports={UserRouter}