const express=require("express")
const router=express.Router()
const {createUser,updateUser,loginUser}=require("../controller/userController")


router.post("/signUp",createUser)
router.put("/updateUser/:id",updateUser)
router.post("/login",loginUser)


module.exports=router