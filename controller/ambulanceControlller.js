const db=require("../model")
const Ambulance=db.ambulance

const isValid = function (value) {   
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
}

exports.createAmbulance=async function (req,res){
    try{
    let data=req.body
    const {vehicleType,info}=data
    if(!isValid(vehicleType)){
        res.status(400).send({status:false,msg:"please enter vehicleType"})
    }
   
      if(!isValid(info)){
        res.status(400).send({status:false,msg:"please enter information related to ambulance"})
      }

    let dataCreated=await Ambulance.create(data)
    res.status(201).send({status:true,msg:"succesfully created",data:dataCreated})
}catch(err){
    return res.status(500).send({status:false,msg:err.message})
}
}

exports.getAmbulance=async function (req,res){
    try{
    let data=req.query
    let fetchedAmbulanceData= await Ambulance.findAll(data)

   return  res.status(200).send({status:true,msg:"success",data:fetchedAmbulanceData})
}catch(err){
    return res.status(500).send({status:false,msg:err.message})
}
}


exports.updateAmbulance=async function (req,res){
    try{
    let data=req.body
    id=req.params.id
    if (!/^\d+$/.test(id)) {
        return res.status(400).send({status:true,msg:"please enter id in valid format number only"})
      }
    if(Object.keys(data).length==0){
        return res.status(200).send({status:true,msg:"please enter the data to be updated"})

    }
    

    let updated= await Ambulance.update(data,{where:{id:id}})
    return res.status(200).send({status:true,msg:"succesfully updated",data:updated})
   
}catch(err){
        return res.status(500).send({status:false,msg:err.message})
    }
}

exports.deleteAmbulance = async function (req, res) {
    try{
    let id = req.params.id
    if (!/^\d+$/.test(id)) {
        return res.status(400).send({status:true,msg:"please enter id in valid format number only"})
      }
    await Ambulance.destroy({ where: { id: id }} )
  return  res.status(200).send({status:true,msg:'about us info is deleted !'})

}catch(err){
    return res.status(500).send({status:false,msg:err.message})
}
}
