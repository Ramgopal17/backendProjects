const express=require("express")
const router=express.Router()
const {createAmbulance,getAmbulance,updateAmbulance,deleteAmbulance}=require("../controller/ambulanceControlller")
const {createAbout,getAbout,updateAbout,deleteAbout}=require("../controller/aboutController")
const {createContact}=require("../controller/contactUsController")
const {createSignIn,getUser,updateUser,deleteUser}=require("../controller/userController")
const {addBankInfo}=require("../controller/bankController")
const {createVehicleInfo}=require("../controller/vehicleController")
const {createAddress}=require("../controller/addressController")

const {bookAmbulance}=require("../controller/bookingController")
// --------------------about page related api---------------------
router.post("/post/about",createAbout)
router.get("/get/about",getAbout)  

router.put("/updateAbout/:id",updateAbout)  
router.delete("/delete/about/:id",deleteAbout)

router.post("/post/address",createAddress)

//------------------------ambulance page api-----------------------
router.post("/post/ambulance",createAmbulance)
router.get("/get/ambulance",getAmbulance)
router.put("/update/ambulance/:id",updateAmbulance)
router.delete("/delete/ambulance/:id",deleteAmbulance)

// ------------------------ contact us related api---------------
router.post("/post/Contact",createContact)

// -----------------------signIn user--------------------------

router.post("/signIn",createSignIn)
router.get("/getUser",getUser)
router.put("/updateUser/:id",updateUser)
router.delete("/deleteUser/:id",deleteUser)


// ----------------ambulance booking related api--------------

router.post("/post/booking",bookAmbulance)

// ----------------------------bank info api--------------------

router.post("/post/bankInfo",addBankInfo)
//------------------------- vehicle related api---------------------
router.post("/post/vehicle",createVehicleInfo)
module.exports=router