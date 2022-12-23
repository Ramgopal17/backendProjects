const customerModel=require("../model/customerModel")
const isValid = function (value) {   //function to check entered data is valid or not
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
}
const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}
const nameRegex=/^[a-z ,.'-]+$/i
mobileRegex=/^[6-9]\d{9}$/
const emailRegex =/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
exports.createCustomer=async function (req,res){

    let data=req.body
    let {firstName,lastName,mobileNumber,DOB,emailId,address,status}=data
if(!isValid(firstName)){
res.status(400).send({staus:false,message:"please enter your first name"})
}
if(!nameRegex.test(firstName)){
    res.status(400).send({staus:false,message:"please enter your first name in correct format"})
}
if(!isValid(lastName)){
res.status(400).send({staus:false,message:"please enter your last name"})
}

if(!nameRegex.test(lastName)){
    res.status(400).send({staus:false,message:"please enter your last name in correct format"})
}
if(!isValid(mobileNumber)){
    res.status(400).send({staus:false,message:"please enter your last name"})
    }
    if(!isValid(mobileNumber)){
        res.status(400).send({staus:false,message:"please enter your last name"})
        }
if(!mobileRegex.test(mobileNumber)){
    res.status(400).send({staus:false,message:"please enter your mobile no in Indian format"})
}
if(!isValid(emailId)){
    res.status(400).send({staus:false,message:"please enter your email"})
    }

    if(!emailRegex.test(emailId)){
        res.status(400).send({staus:false,message:"please enter your email in correct format"})
    }
    if(!isValid(address)){
        res.status(400).send({staus:false,message:"please enter your address"})
        }
        if(!(["ACTIVE","INACTIVE"].includes(status))){
            res.status(400).send({staus:false,message:"please enter your status ACTIVE/INACTIVE"})
        }

    let dataCreated=await customerModel.create(data)
    res.status(201).send({staus:true,message:"succesfully created",data:dataCreated})
}


exports.getCustomer=async function (req,res)
{ 
    let status=req.query.status
    if(!(["ACTIVE","INACTIVE"].includes(status))){
        res.status(400).send({staus:false,message:"please enter your status ACTIVE/INACTIVE"})
    }
   let fetchedData=await customerModel.find({status:status,isDeleted:false})
    res.status(200).send({staus:true,message:"succesfully fetched data",data:fetchedData})
}

exports.deleteCustomer= async function (req,res){
    uniqueId=req.params.id
    if(!isValidObjectId(uniqueId)){
        res.status(400).send({staus:false,message:"please enter valid id"})
    }
    let a= await customerModel.findOneAndUpdate({_id:uniqueId},{$set:{isDeleted:true}},{new:true})
    if(!a){
        res.status(400).send({staus:false,message:"user does not exist"})
    }
    res.status(200).send({staus:true,message:"succesfully deleted data",data:a})
}
