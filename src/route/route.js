const express=require("express")
const router=express.Router()
const {fileFilter}=require("../controller/multer")
const {createSignUp,loginuser}=require("../controller/signUpController")
const {createIndividal}=require("../controller/indivisualProfileController")
const {createBuisnessProfile}=require("../controller/buisnessProfileController")
router.post("/signUp",createSignUp)
router.post("/login",loginuser)
router.post("/indivisualProfileCreation",fileFilter,createIndividal)
router.post("/buisnessProfile1",createBuisnessProfile)
module.exports=router