const db=require("../model")
const { sequelize } = require("../model")
const { uploadFile } = require("../controller/awsController")
const {isValid,validateEmail,validMobNum,validName}=require("../validation/validation")

const PersonalData=db.personalData
const ProfessionalDetail=db.professionalDetail
const KycData=db.kycData

exports.createIndividal=async function (req,res){
    try{
      data=req.body
    
      let {firstName,lastName,email,contactNumber}=data
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
 let personalInfo={
    "firstName":firstName,
    "lastName":lastName,
    "email":email,
    "contactNumber":contactNumber,
   }
  
     profileImage=req.files
   a = await uploadFile(profileImage[0])
   personalInfo.profileImage=a

        const transaction=await sequelize.transaction();
        const personDetails=await PersonalData.create(personalInfo,{transaction})
   // --------------- professional detail----

  let professionalInfo={
   "service":req.body.service,
   "experience":req.body.experience

   }
   let profession= await ProfessionalDetail.create(professionalInfo,{transaction})
      //   -------------------------- kyc details-----------------
kycInfo={
   "aadharCard":req.body.aadharCard,
   "panCard":req.body.panCard
}
aadharCard=req.files
if(!isValid(aadharCard)){
   return res.status(400).send({status:false,msg:"please enter aadhar card"})
}

b = await uploadFile(aadharCard[0])
kycInfo.aadharCard=b


panCard=req.files
if(!isValid(panCard)){
   return res.status(400).send({status:false,msg:"please enter Pan card"})
}

b = await uploadFile(panCard[0])
kycInfo.panCard=b

let kyc= await KycData.create(kycInfo,{transaction})
await transaction.commit()
res.status(200).send({status:false,msg:"successfully created",data:personDetails,profession,kyc})
} catch (error) { 
return res.status(500).send({ status: false, message: error.message })
}
}

