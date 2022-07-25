const express=require("express")
const router=express.Router()
const userController=require("../controller/userController")
const awsController = require('../controller/awsController')


router.post("/register",awsController.awsFile, userController.createUser)

router.post("/login" , userController.loginuser)
router.get("/user/:userId/profile" , userController.getUser)

router.put("/user/:userId/profile",awsController.updateAwsFile,   userController.updateUser)















module.exports=router


