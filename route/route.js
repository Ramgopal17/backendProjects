const express=require("express")
router=express.Router()
const {createCustomer, getCustomer,deleteCustomer}=require("../controller/customerController")
const {createCard,getListOfCards}=require("../controller/cardController")

router.post("/create",createCustomer)
router.post("/createcard",createCard)
router.get("/getCustomer",getCustomer)
router.delete("/deleteCustomer/:id",deleteCustomer)
router.get("/getCard",getListOfCards)


module.exports=router