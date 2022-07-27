const express=require("express")
const router=express.Router()
const userController=require("../controller/userController")
const awsController = require('../controller/awsController')
const productController = require('../controller/productController')


router.post("/register",awsController.awsFile, userController.createUser)

router.post("/login" , userController.loginuser)
router.get("/user/:userId/profile" , userController.getUser)

router.put("/user/:userId/profile",awsController.updateAwsFile,   userController.updateUser)
//-------------------------------product Api's---------------------------------------------//
router.post("/products",awsController.awsFile,productController.createProduct)
router.get("/products" , productController.getProducts)
router.get("/products/:productId" , productController.getByProductId)
router.put("/products/:productId" ,awsController.updateAwsFile, productController.updateProduct)
// router.delete("/products/:productId" , productController.deleteProduct)















module.exports=router


