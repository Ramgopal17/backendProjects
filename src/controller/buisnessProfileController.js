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
const {isValid,validateEmail,validMobNum,validName,validFacebookLink,validInstaLink,validYoutubeLink,validCityAndstate,validPinCode,digitValidation,dateValidation}=require("../validation/validation")

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
 let{address,city,state,landMark,pinCode}=data
 if(!isValid(address)){
    res.status(400).send({status:false,msg:"please enter your address"})
}
if(!isValid(city)){
    res.status(400).send({status:false,msg:"please enter your address"})
}
if(!validCityAndstate(city)){
    res.status(400).send({status:false,msg:"please enter city in valid format"})
}
if(!isValid(state)){
    res.status(400).send({status:false,msg:"please enter your address"})
}
if(!validCityAndstate(state)){
    res.status(400).send({status:false,msg:"please enter state in valid format"})
}
if(!isValid(landMark)){
    res.status(400).send({status:false,msg:"please enter your address"})
}
if(!isValid(pinCode)){
    res.status(400).send({status:false,msg:"please enter your address"})
}
if(!validPinCode.test(pinCode)){
    res.status(400).send({status:false,msg:"please valid indian pin code"})
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
if(!isValid(aadharCard)){
    res.status(400).send({status:false,msg:"please upload your aadhar card"})
}
  
   b=await uploadFile(aadharCard[0])
   kycData.aadharCard=b

   const panCard=req.files
   if(!isValid(panCard)){
    res.status(400).send({status:false,msg:"please upload your panCard"})
}
 
   c=await uploadFile(panCard[0])
   kycData.panCard=c
const kyc=await KycDetail.create(kycData,{transaction})
// --------------------  buisness info related data-----------------

let {NameOfbuisness,buisnessDescription,buisnessCategory}=data
if(!isValid(NameOfbuisness)){
    res.status(400).send({status:false,msg:"please enter buisness name"})
}

if(!isValid(buisnessCategory)){
    res.status(400).send({status:false,msg:"please enter buisness category"})
}
if(['Machinery and equipment', 'wheels and trucks', 'Services'].includes(buisnessCategory)){
    res.status(400).send({status:false,msg:"please choose one of the given option"})
}

const buisnessInfoData={
    "NameOfbuisness":NameOfbuisness,
    "buisnessDescription":buisnessDescription,
    "buisnessCategory":buisnessCategory
}

let buisnessdata=await BuisnessInfo.create(buisnessInfoData,{transaction})

//------------------------------ product and service related data
let {NameOfProduct,price,description}=data
if(!isValid(NameOfProduct)){
    res.status(400).send({status:false,msg:"please enter product name"})
}
if(!isValid(price)){
    res.status(400).send({status:false,msg:"please enter price "})
}
const productServiceData={
    "NameOfProduct":NameOfProduct,
    "price":price,
    "description":description,
}
const uploadImage=req.files
  
   d=await uploadFile(uploadImage[0])
   productServiceData.uploadImage=d
const productService=await ProductService.create(productServiceData,{transaction})

// // ---------------------mov related data----------------------------
let {minOrderVal,estimatedDelivery}=data
if(!isValid(minOrderVal)){
    res.status(400).send({status:false,msg:"please enter min Order Value "})
}
if(digitValidation.test(minOrderVal)){
    res.status(400).send({status:false,msg:"only digit allowed"})
}
if(!isValid(estimatedDelivery)){
    res.status(400).send({status:false,msg:"please enter estimated delivery data "})
}
if(!dateValidation(estimatedDelivery)){
    res.status(400).send({status:false,msg:"please enter date in dd-mm-yyyy format"})
}


const movData={
    "minOrderVal":minOrderVal,
    "estimatedDelivery":estimatedDelivery
}

const mov=await Mov.create(movData,{transaction})
// // ------------------------- gallery related data------------------
const galleryData={}

const uploadPhotos=req.files
  
   e=await uploadFile(uploadPhotos[0])
   galleryData.uploadPhotos=e
let gallery=await Gallery.create(galleryData,{transaction})


// ------------------------payment info data--------------------
let {paymentOptions,paymentTerms}=data
if(!isValid(paymentOptions)){
    res.status(400).send({status:false,msg:"please choose payment options"})
}
if(['select all','cash','Net banking','cheque/DD','UPI',"NetBanking"].includes(paymentOptions)){
    res.status(400).send({status:false,msg:"please choose one of the given in cheque box"})
}

if(!isValid(paymentTerms)){
    res.status(400).send({status:false,msg:"please mention the term of payment (Advance payment,part payment,customized payment)"})
}

const paymentInfo={
    "paymentOptions":paymentOptions,
    "paymentTerms":paymentTerms
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