const db=require("../model")

const Contact=db.contact
const isValid = function (value) {   
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
}

let emailRegex=/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
let fullNameRegex = /^[a-zA-Z][a-zA-Z\\s]+$/;

exports.createContact=async function (req,res){
    try{

    let data=req.body
    let {fullName,email,message}=data
    if(!isValid(fullName)){
        return res.status(400).send({status:true,msg:"please enter your fullName"})
    }
   if(!fullNameRegex.test(fullName)){
    return res.status(400).send({status:true,msg:"please enter your fullName in correct format"})
}
    if(!isValid(email)){
        return res.status(400).send({status:true,msg:"please enter your email"})
    }
    if(!emailRegex.test(email)){
        return res.status(400).send({status:true,msg:"please enter email in abc@gmail.com format"})
    }
    if(!isValid(message)){
        return res.status(400).send({status:true,msg:"please enter your message"})
    }
 

    let dataCreated= await Contact.create(data)
    return res.status(200).send({status:true,msg:"succesfully created",data:dataCreated})
}catch(err){
    return res.status(500).send({status:false,msg:err.message})
}}