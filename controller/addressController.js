const db=require("../model")

const Address=db.address

const isValid = function (value) {   
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
}

exports.createAddress=async function (req,res){
    try{
    let data=req.body
    const {street,city,state}=data
    if(!isValid(street)){
        res.status(400).send({status:false,msg:"please enter street"})
    }
   
      if(!isValid(city)){
        res.status(400).send({status:false,msg:"please enter city name"})
      }

      if(!isValid(state)){
        res.status(400).send({status:false,msg:"please enter state name"})
      }
      

    let dataCreated=await Address.create(data)
    res.status(201).send({status:true,msg:"succesfully created",data:dataCreated})
}catch(err){
    return res.status(500).send({status:false,msg:err.message})
}
}
