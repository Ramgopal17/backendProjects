const db=require("../model")
const { sequelize } = require("../model")
const User=db.user
const Address=db.address
const isValid = function (value) {   
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
}
let emailRegex=/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
let mobileRegex=/^[7-9][0-9]{9}$/
let cityAndStateRegex=/([A-Za-z]+(?: [A-Za-z]+)*),? ([A-Za-z]{2})/
let nameRegex=/^[A-Za-z][a-z]*(([,.] |[ '-])[A-Za-z][a-z]*)*(\.?)( [IVXLCDM]+)?$/


exports.createSignIn=async function (req,res){
  try{
        let data=req.body

  let  {firstName,lastName,email,phone}=data
 if(!isValid(firstName)){
    return res.status(400).send({status:false,msg:"please enter your firstName"})
}
if(!nameRegex.test(firstName)){
  res.status(400).send({status:false,msg:" first name should contain only alphabetical letter"})
 }

 if(!isValid(lastName)){
    return res.status(400).send({status:false,msg:"please enter your lastName"})

 }
 if(!nameRegex.test(lastName)){
  res.status(400).send({status:false,msg:"last name should contain only alphabetical letter"})
 }

 if(!isValid(email)){
    return res.status(400).send({status:false,msg:"please enter your email"})

 }
 if(!emailRegex.test(email)){
    return res.status(400).send({status:false,msg:"please enter email in valid abc@gmail.com"})
 }
if(!isValid(phone)){
    return res.status(400).send({status:false,msg:"please enter your mobile no"})
}
if(!mobileRegex.test(phone)){
    return res.status(400).send({status:false,msg:"please enter your indian mobile no"}) 
}

const transaction=await sequelize.transaction();

let userCreated=await User.create(data,{transaction})
// ---------------- user address data-------------------
let {street,city,state}=data
if(!isValid(street)){
  return res.status(400).send({status:false,msg:"please enter street name"})
}

if(!isValid(city)){
  return res.status(400).send({status:false,msg:"please enter city name"})
}
if(!cityAndStateRegex.test(city)){
  res.status(400).send({status:false,msg:"please enter city name in valid format"})
 }
if(!isValid(state)){
  return res.status(400).send({status:false,msg:"please enter state name"})
}
if(!cityAndStateRegex.test(state)){
  res.status(400).send({status:false,msg:"please enter state name in valid format"})
 }

const addressData={
  "street":street,
  "city":city,
  "state":state,
  }
const address= await Address.create(addressData,{transaction})
 await transaction.commit()
res.status(200).send({status:true,msg:"successfully created",data:userCreated,address})
}catch(err){
res.status(500).send({ status: false, msg: err.message });
  
}
}



















exports.getUser= async function (req,res){
  let fetchedData= await User.findAll()
  return res.status(200).send({status:true,msg:"success",data:fetchedData})
}


exports.updateUser=async function (req,res){
  try{
    let data=req.body
    if(Object.keys(data).length==0){
        return res.status(400).send({status:true,msg:"please enter the data to be updated"})
}
    id=req.params.id
    if (!/^\d+$/.test(id)) {
        return res.status(400).send({status:true,msg:"please enter id in valid format number only"})
      }
      const user = await User.findByPk(id);


      let updated=await user.update(data);

      return res.send({status:true,msg:"succesfully updated",data:updated})
}catch(err){
  res.status(500).send({status:false,msg:err.message});
    }
}



exports.deleteUser=async function (req,res){
  try{
    let id = req.params.id
    if (!/^\d+$/.test(id)) {
        return res.status(400).send({status:true,msg:"please enter id in valid format number only"})
      }
 
   let a= await User.destroy({ where: { id: id }} )
   console.log(a)
    res.status(200).send({status:true,msg:'user info is deleted !'})
    }catch(err){
        res.status(500).send({status:false,msg:err.message});
    }
}