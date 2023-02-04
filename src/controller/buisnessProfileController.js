const db=require("../model")
const { uploadFile } = require("../controller/awsController")
const { sequelize } = require("../model")
const PersonalDetail=db.personalDetail
const BuisnessDetail=db.buisnessDetail
const AddressDetail=db.addressDetail
const KycDetail=db.kycDetail
const BuisnessInfo=db.buisnessInfo
const ProductService=db.productService
const Mov=db.mov
const Gallery=db.gallery
const PaymentInfo=db.paymentInfo
const Faq=db.faq
const {isValid,validateEmail,validMobNum,validName,validFacebookLink,validInstaLink,validYoutubeLink}=require("../validation/validation")

exports.createBuisnessProfile=async function (req,res){
    try{
    data=req.body
    
   let {firstName,lastName,email,userName,contactNumber}=data
   if(Object.keys(data).length==0){
    return res.status(400).send({status:true,msg:"please enter the data "})
}
   if(!isValid(firstName)){
    res.status(400).send({status:false,msg:"please enter your first name"})
}
if(!validName(firstName)){
    return res.status(400).send({status:false,msg:"please enter first name in valid format"})
 }
if(!isValid(lastName)){
    res.status(400).send({status:false,msg:"please enter your lastName "})
}
if(!validName(lastName)){
    return res.status(400).send({status:false,msg:"please enter last name in valid format"})
 }
if(!isValid(email)){
    res.status(400).send({status:false,msg:"please enter your email"})
}
if(!validateEmail(email)){
    return res.status(400).send({status:false,msg:"please enter email in valid abc@gmail.com"})
 }
if(!isValid(contactNumber)){
    return res.status(400).send({status:false,msg:"please enter your mobile no"})
}
if(!validMobNum(contactNumber)){
    return res.status(400).send({status:false,msg:"please enter your indian mobile no"}) 
}
let personalData={
    "firstName":firstName,
    "lastName":lastName,
    "email":email,
    "userName":userName,
    "contactNumber":contactNumber
}
       const profileImage=req.files
  
   a=await uploadFile(profileImage[0])
   personalData.profileImage=a

    const transaction=await sequelize.transaction();
    const personal=await PersonalDetail.create(personalData,{transaction})
 //-----------------buisness related information--------------------
   let {buisnessName,buisnessWebsite,from,to,facebookLink,instagramLink,youtubeLink}=data
   if(!isValid(buisnessName)){
    res.status(400).send({status:false,msg:"please enter buisness name "})
}
if(!isValid(buisnessWebsite)){
    res.status(400).send({status:false,msg:"please enter buisness website "})
}
if (!validFacebookLink(youtubeLink)){
    res.status(400).send({status:false,msg:"please enter valid facebook  link"})
}
if(!validInstaLink(instagramLink)){
    res.status(400).send({status:false,msg:"please enter valid instagram  link"})
}

if (!validYoutubeLink(youtubeLink)){
    res.status(400).send({status:false,msg:"please enter valid youtube link"})
}
 const buisnessData={
        "buisnessName":buisnessName,
        "buisnessWebsite":buisnessWebsite,
        "from":from,
        "to":to,
        "facebookLink":facebookLink,
        "instagramLink":instagramLink,
        "youtubeLink":youtubeLink
    }
    const buisness=await BuisnessDetail.create(buisnessData,{transaction})
// ----------------------------- address related data-------------------
 let{address,city,state,landMark}=data
 if(!isValid(address)){
    res.status(400).send({status:false,msg:"please enter your address"})
}

const addressData={
    "address":address,
    "city":city,
    "state":state,
    "landMark":landMark,
    "pinCode":pinCode
}

const addressCreated= await AddressDetail.create(addressData,{transaction})
//------------- kyc related data-------------------------------
const kycData ={
    "aadharCard":req.body.aadharCard,
    "panCard":req.body.panCard,
    "gstRegistration":req.body.gstRegistration
}
const aadharCard=req.files
  
   b=await uploadFile(aadharCard[0])
   kycData.aadharCard=b

   const panCard=req.files
   console.log(1223);
   c=await uploadFile(panCard[0])
   kycData.panCard=c
const kyc=await KycDetail.create(kycData,{transaction})
// --------------------  buisness info related data-----------------

const buisnessInfoData={
    "NameOfbuisness":req.body.NameOfbuisness,
    "buisnessDescription":req.body.buisnessDescription,
    "buisnessCategory":req.body.buisnessCategory
}

let buisnessdata=await BuisnessInfo.create(buisnessInfoData,{transaction})

//------------------------------ product and service related data
const productServiceData={
    "NameOfProduct":req.body.NameOfProduct,
    "price":req.body.price,
    "description":req.body.description,
}
const uploadImage=req.files
  
   d=await uploadFile(uploadImage[0])
   productServiceData.uploadImage=d
const productService=await ProductService.create(productServiceData,{transaction})

// // ---------------------mov related data----------------------------
const movData={
    "mov":req.body.mov,
    "estimatedDelivery":req.body.estimatedDelivery
}

const mov=await Mov.create(movData,{transaction})
// // ------------------------- gallery related data------------------
const galleryData={}

const uploadPhotos=req.files
  
   e=await uploadFile(uploadPhotos[0])
   galleryData.uploadPhotos=e
let gallery=await Gallery.create(galleryData,{transaction})


// ------------------------payment info data--------------------
const paymentInfo={
    "paymentOptions":req.body.paymentOptions,
    "paymentTerms":req.body.paymentTerms
}

const payment=await PaymentInfo.create(paymentInfo,{transaction})

// ---------------------- frequently asked question-------------
  const faqData={
    "question":req.body.question
  }
  const faq=await Faq.create(faqData,{transaction})
await transaction.commit()

   res.status(200).send({status:false,msg:"successfully created",data:personal,buisness,addressCreated,kyc,buisnessdata,productService,mov,gallery,payment,faq})
} catch (error) { 
    return res.status(500).send({ status: false, message: error.message })
    }
}