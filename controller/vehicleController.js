const db=require("../model")
const {validDrivingLic}=require("../validation/validation")
var Vehicle=db.vehicle

const isValid = function (value) {   
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
}

exports.createVehicleInfo=async function (req,res){
    try{
    let data=req.body
    const {typeOfVehicle,insuranceProvider,driverLicenceNumber,insurancePolicyNumber}=data
    if(Object.keys(data).length==0){
      return res.status(400).send({status:true,msg:"please enter the data "})
     }
     
    if(!isValid(typeOfVehicle)){
        res.status(400).send({status:false,msg:"please enter vehicleType"})
    }
   
      if(!isValid(insuranceProvider)){
        res.status(400).send({status:false,msg:"please enter information insurance service provider"})
      }
      

      if(!isValid(driverLicenceNumber)){
        res.status(400).send({status:false,msg:"please enter driving licence number"})
      }
      if(!validDrivingLic(driverLicenceNumber)){
        res.status(400).send({status:false,msg:"please enter  indian driving licence number format"})
      }
     if(!isValid(insurancePolicyNumber)){
        res.status(400).send({status:false,msg:"please enter insurance policy number"})
      }

      
    let dataCreated=await Vehicle.create(data)
    res.status(201).send({status:true,msg:"succesfully created",data:dataCreated})
}catch(err){
    return res.status(500).send({status:false,msg:err.message})
}
}
