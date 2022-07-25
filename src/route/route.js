const express=require("express")
const router=express.Router()
const userController=require("../controller/userController")
const awsController = require('../controller/awsController')


router.post("/register",awsController.awsFile, userController.createUser)
















module.exports=router


