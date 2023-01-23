const db=require("../model")
const Bank=db.bank
const Address=db.address

const isValid = function (value) {   //function to check entered data is valid or not
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
}

exports.addBankInfo=async function (req,res){
    try{

    let data=req.body
    if(Object.keys(data).length==0){
        res.status(400).send({status:false,msg:"please enter some data"})
    }
    let {bankName,branchName,firstName,lastName}=data
    if(!isValid(bankName)){
        res.status(400).send({status:false,msg:"please enter bank name"})
       }

       if(!isValid(branchName)){
        res.status(400).send({status:false,msg:"please enter  branch name"})
       }
       if(!isValid(firstName)){
        res.status(400).send({status:false,msg:"please enter first name"})
       }
       if(!isValid(lastName)){
        res.status(400).send({status:false,msg:"please enter last name"})
       }


      //  if (!isValid(branchAddress)) {
      //   return res.status(400).send({ status: false, message: "please enter address" })
      // }
  
    //   try {
  
      
    // var j = JSON.parse(JSON.stringify(branchAddress))

    //   }
    //   catch (error) {
    //     return res.status(400).send({ message: "please enter bank address correctly" })
    //   }

  
    //   data.branchAddress = j

  
    // if (!isValid(j.street)) {
    //     return res.status(400).send({ status: false, message: "please enter  street in  branch address" })
    //   }
  
  
    //   if (!isValid(j.city)) {
    //     return res.status(400).send({ status: false, message: "please enter  city in  branch address" })
    //   }
    
    //   if (!isValid(j.state)) {
    //     return res.status(400).send({ status: false, message: "please enter  city in  branch address" })
    //   }
     
    //   if (!isValid(j.pinCode)) {
    //     return res.status(400).send({ status: false, message: "please enter  pincode in  branch address" })
    //   }
  
    //   if (!/^[0-9]{6}$/.test(j.pinCode)) {
    //     return res.status(400).send({ status: false, message: "Pin code needed in valid format in branch address." })
    //   }



    let dataCreated= await Bank.create(data,{include:[Address]})
    
    return res.status(200).send({status:true,msg:"succesfully created",data:dataCreated})
}catch(err){
    res.status(500).send({status:false,msg:err.message});
}
}