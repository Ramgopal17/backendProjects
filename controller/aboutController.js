const db=require("../model")

const About=db.about
const isValid = function (value) {   
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
}

exports.createAbout=async function (req,res){
    try{

    let data=req.body
    if(Object.keys(data).length==0){
        return res.status(400).send({status:true,msg:"please enter the data "})
    }
    let {info}=data
    if(!isValid(info)){
        res.status(400).send({status:false,msg:"please enter information related to delever"})
    }

    let dataCreated= await About.create(data)
     return res.status(200).send({status:true,msg:"succesfully created",data:dataCreated})

}catch(err){
res.status(500).send({status:false,msg:err.message});
}
}

exports.getAbout=async function (req,res){
    try{
    let data=req.query
   
    let fetchedData= await About.findAll(data)
    return res.status(200).send({status:true,msg:"succesfully created",data:fetchedData})

}catch(err){
    res.status(500).send({status:false,msg:err.message});
}
}

exports.updateAbout=async function (req,res){
    try{
    let data=req.body
    if(Object.keys(data).length==0){
        return res.status(400).send({status:true,msg:"please enter the data to be updated"})
    }
    
    id=req.params.id
    if (!/^\d+$/.test(id)) {
        return res.status(400).send({status:true,msg:"please enter id in valid format number only"})
      }

    const updated =await About.update({data},{where:{id:id}})

      return res.send({status:true,msg:"succesfully updated",data:updated})

    }catch(err){
  res.status(500).send({status:false,msg:err.message});
    }
}

exports.deleteAbout = async (req, res) => {
    try{
    let id = req.params.id
    if (!/^\d+$/.test(id)) {
        return res.status(400).send({status:true,msg:"please enter id in valid format number only"})
      }
    await About.destroy({ where: { id: id }} )
    res.status(200).send({status:true,msg:'about us info is deleted !'})
    }catch(err){
        res.status(500).send({status:false,msg:err.message});
    }
}