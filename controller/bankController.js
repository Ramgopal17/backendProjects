const db=require("../model")
const { sequelize } = require("../model")
const Bank=db.bank
const BranchAddress=db.branchAddress
let regexPostal=/^[1-9]{1}[0-9]{2}\\s{0, 1}[0-9]{3}$/;
let cityAndStateRegex=/([A-Za-z]+(?: [A-Za-z]+)*),? ([A-Za-z]{2})/
let nameRegex=/^[A-Za-z][a-z]*(([,.] |[ '-])[A-Za-z][a-z]*)*(\.?)( [IVXLCDM]+)?$/


const isValid = function (value) {   //function to check entered data is valid or not
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
}

exports.addBankInfo=async function (req,res){
    try{

    let data=req.body
    if(Object.keys(data).length==0){
        res.status(400).send({status:false,msg:"please enter some data"})
    }
    let {bankName,branchName,firstName,lastName}=data
    if(!isValid(bankName)){
        res.status(400).send({status:false,msg:"please enter bank name"})
       }

       if(!isValid(branchName)){
        res.status(400).send({status:false,msg:"please enter  branch name"})
       }
       if(!isValid(firstName)){
        res.status(400).send({status:false,msg:"please enter first name"})
       }
       if(!nameRegex.test(firstName)){
        res.status(400).send({status:false,msg:" first name should contain only alphabetical letter"})
       }
       if(!isValid(lastName)){
        res.status(400).send({status:false,msg:"please enter last name"})
        if(!nameRegex.test(lastName)){
            res.status(400).send({status:false,msg:" lastName should contain only alphabetical letter"})
           }
    }
    const transaction=await sequelize.transaction();
let dataCreated= await Bank.create(data,{transaction})
// -------------------------------- branch address data----------
let {street,city,state,postalCode}=req.body
if(!isValid(street)){
    res.status(400).send({status:false,msg:"please enter street name"})
   }

   if(!isValid(city)){
    res.status(400).send({status:false,msg:"please enter street name"})
   }
   if(!cityAndStateRegex.test(city)){
    res.status(400).send({status:false,msg:"please enter city name in valid format"})
   }
   if(!isValid(state)){
    res.status(400).send({status:false,msg:"please enter street name"})
   }
   if(!cityAndStateRegex.test(state)){
    res.status(400).send({status:false,msg:"please enter state name in valid format"})
   }
   if(!isValid(postalCode)){
    res.status(400).send({status:false,msg:"please enter street name"})
   }
   if(!regexPostal.test(postalCode)){
    res.status(400).send({status:false,msg:"please enter valid postal code"})
   }
const branchAddressData={
    "street":street,
    "city":city,
    "state":state,
    "postalCode":postalCode
    }
  
let BranchDealingAddress=await BranchAddress.create(branchAddressData,{transaction})
    
    return res.status(200).send({status:true,msg:"succesfully created",data:dataCreated,BranchDealingAddress})
}catch(err){
    res.status(500).send({status:false,msg:err.message});
}
}


