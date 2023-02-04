const db=require("../model")
const jwt = require('jsonwebtoken')
const {validateEmail,passwordValidate}=require("../validation/validation")

const SignUp=db.signUp
const isValid = function (value) {   
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
}

exports.createSignUp=async function (req,res){
    try{

    let data=req.body
    let {email,userName,password,repeatPassword}=data
    if(!isValid(email)){
        res.status(400).send({status:false,msg:"please enter  your email"})
}
if(!validateEmail(email)){
    res.status(400).send({status:false,msg:"please enter email in correct format"})
}
let emailAlreadyExist=await SignUp.findOne({
    where: { email: email },
  })

  if(emailAlreadyExist){
    res.status(400).send({status:false,msg:"user already exist use some other email"})
}
  
if(!isValid(userName)){
    res.status(400).send({status:false,msg:"please enter  your user name"})
}
if(!isValid(password)){
    res.status(400).send({status:false,msg:"please enter password"})
}

if(!passwordValidate(password)){
    res.status(400).send({status:false,msg:"please enter password having Minimum eight characters, at least one letter and one number:"})
}
if(!isValid(repeatPassword)){
    res.status(400).send({status:false,msg:"please enter password again to confirm it"})
}
if(password!=repeatPassword){
    res.status(400).send({status:false,msg:"your password it not matching"})
}
    let dataCreated= await SignUp.create(data)
     return res.status(200).send({status:true,msg:"succesfully created",data:dataCreated})

} catch(err){
res.status(500).send({status:false,msg:err.message});
}
}



exports.loginuser = async function (req, res) {
  try{

    let data = req.body
    if (Object.keys(data).length == 0) {
      return res.status(400).send({ status: false, message: "please  provide email and password" })
    }
    let { email, password } = data
  
    if (!isValid(email)) {
      return res.status(400).send({ status: false, message: "please enter email " })
  
    }
  
    if (!validateEmail(email)) {
      return res.status(400).send({ status: false, message: "please enter email in  correct format" })
  
    }
    if (!isValid(password)) {
      return res.status(400).send({ status: false, message: "please enter password" })
  
    }
  
  
    let findUser = await SignUp.findOne({ email: email })
    if (!findUser) {
      return res.status(400).send({ status: false, message: " email does not exists" })
    }
  

          let userId = findUser._id
            console.log(userId)
          let token = jwt.sign(
              {
                  userId: userId,
                  color: "blue",
                  
                  iat: Date.now(),
                  exp: (Date.now()) + (60 * 1000) * 60
  
              },
              "12345", {
           
          })
  
          res.status(200).send({ status: true, message: "User login successfull", data: { userId: userId, token: token } })
      
  }catch (error) { 
    return res.status(500).send({ status: false, message: error.message })
    }
}
  