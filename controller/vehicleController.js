const db=require("../model")

var Vehicle=db.vehicle

const isValid = function (value) {   
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
}

const dlRegex = /^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/; 


exports.createVehicleInfo=async function (req,res){
    try{
    let data=req.body
    const {typeOfVehicle,insuranceProvider,driverLicenceNumber,insurancePolicyNumber}=data
    if(!isValid(typeOfVehicle)){
        res.status(400).send({status:false,msg:"please enter vehicleType"})
    }
   
      if(!isValid(insuranceProvider)){
        res.status(400).send({status:false,msg:"please enter information insurance service provider"})
      }
      

      if(!isValid(driverLicenceNumber)){
        res.status(400).send({status:false,msg:"please enter driving licence number"})
      }
      if(!dlRegex.test(driverLicenceNumber)){
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
