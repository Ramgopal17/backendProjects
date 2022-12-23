const cardModel=require("../model/cardModel")

const isValid = function (value) {   //function to check entered data is valid or not
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
}
exports.createCard=async function(req,res) {
  let data=req.body
  let {cardType,customerName,status,vision,customerID}=data
  if(!isValid(customerName)){
    res.status(400).send({staus:false,message:"please enter your first name"})
    }
    if(!isValid(cardType)){
      res.status(400).send({staus:false,message:"please enter your card type"})
      }
      if(!(["REGULAR","SPECIAL"].includes(cardType))){
        res.status(400).send({staus:false,message:"please enter your status REGULAR/SPECIAL"})
    }

  if(!(["ACTIVE","INACTIVE"].includes(status))){
    res.status(400).send({staus:false,message:"please enter your status ACTIVE/INACTIVE"})
}
if(!isValid(vision)){
  res.status(400).send({staus:false,message:"please enter your vision regarding tech"})
}
if(!isValid("customerID")){
  res.status(400).send({staus:false,message:"please enter your vision regarding tech"})
}

  let a=await cardModel.create(data)
  return res.status(201).send({status:true,message:"succesfully created", data:a})
}


exports.getListOfCards = async (req, res) => {
    try {
         
        let input = { status: "ACTIVE" }

        const card = await cardModel.find(input)
        if (!card.length > 0) return res.status(404).send({ status: false, message: "Card Not Found" });
        return res.status(200).send({ status: true, count: card.length, message: card })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }

};

