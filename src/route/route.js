const express=require("express")
const router=express.Router()
const userController=require("../controller/userController")

const productController = require('../controller/productController')
const cartController  = require('../controller/cartController')
const orderController = require('../controller/orderController')
const {authentication,authorization} = require('../middleware/middleware')

// ____________________________________________________________ create user   ___________________________________________

router.post("/register", userController.createUser)

router.post("/login" , userController.loginuser)
router.get("/user/:userId/profile",authentication,authorization, userController.getUser)

router.put("/user/:userId/profile", authentication,authorization,  userController.updateUser)
//// -------------------------------product Api's---------------------------------------------//
router.post("/products", productController.createProduct)
router.get("/products" , productController.getProducts)
router.get("/products/:productId" , productController.getByProductId)
router.put("/products/:productId" , productController.updateProduct)
router.delete("/products/:productId" , productController.deleteProduct)
// -------------------------------cart Api's---------------------------------------------//
router.post("/users/:userId/cart",authentication,authorization, cartController.createCart)
router.put("/users/:userId/cart" ,authentication,authorization, cartController.updateCart)
router.get("/users/:userId/cart" ,authentication,authorization, cartController.getCartById)
router.delete("/users/:userId/cart" ,authentication,authorization, cartController.DeleteCartById)

// -------------------------------order Api's---------------------------------------------//
router.post("/users/:userId/orders",authentication,authorization, orderController.createOrder)
router.put("/users/:userId/orders",authentication,authorization, orderController.updateOrder)



router.all("/**", function (req,res){
    res.status(404).send({status:false, msg:" API you request is not available"})
})















module.exports=router


