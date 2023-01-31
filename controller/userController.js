
const userModel=require("../model/userModel")
const validator=require("validator")
const jwt=require("jsonwebtoken")
const isValid=function (value){
    if(typeof value=="undefined"||value==null) return false
    if(typeof value=="string" &&value.trim().length) return false
    return true
}

exports.createUser=async function(req,res){
    try{
    data=req.body
    let {name,email,password,confirmPassword}=data
    if(Object.keys(data).length==0){
        res.status(400).send({status:false,msg:"please enter your detail"})
    }
    if(!isValid(name)){
        res.status(400).send({status:false,msg:"please enter your name"})
    }
    if(!isValid(email)){
        res.status(400).send({status:false,msg:"please enter your email"})
    }
    if(!validator.isEmail(email)){
        res.status(400).send({status:false,msg:"please enter your email in correct format"})
    }
    if(!isValid(password)){
        res.status(400).send({status:false,msg:"please enter your password"})
    }
    if(!isValid(confirmPassword)){
        res.status(400).send({status:false,msg:"please enter your confirm password"})
    }
    if(password!=confirmPassword){
        res.status(400).send({status:false,msg:" your confirm password does not match"})
    }
   const userCreated=await userModel.create(data)
   res.status(201).send({status:true,msg:"succesfully created",data:userCreated})
}catch(err){

    res.status(500).send({status:false,msg:err.message})
}
}
exports.updateUser= async function(req,res){
    try{
    userId=req.params.id
    if(!validator.isMongoId(userId)){
        res.status(400).send({status:false,msg:"please enter valid user id"})
    }
    
    data=req.body
    if(Object.keys(data).length==0){
        res.status(400).send({status:false,msg:"please enter something to update"})
    }
    updatedUser=await userModel.findOneAndUpdate({_id:userId},{data},{new:true})
    res.status(200).send({status:true,msg:"successfully updated",data:updatedUser})
}catch(err){
    res.status(500).send({status:false,msg:err.message}) 
}
}

exports.loginUser=async function (req,res){
    try{
    let email=req.body.email
    if(!email){
        res.status(400).send({status:false,msg:"email not given"})
    }
    let password=req.body.password
    if(!email){
        res.status(400).send({status:false,msg:"password not given"})
    }
    let User=await userModel.findOne({email:email,password:password})
    if(!User){
        res.status(400).send({status:false,msg:"user not found"})
    }
  let token =jwt.sign({
    UserId:User._id.toString(),
    color:"orange"

  },secretKey)
  res.setHeader("x-api-key",token)
  return res.status(200).send({status:true,message:" successfully loggin",token:token})
    }catch(err){
        res.status(500).send({status:false,msg:err.message})
    }
}