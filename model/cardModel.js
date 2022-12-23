const mongoose = require('mongoose');
const autoIncrement = require ('mongoose-sequence')(mongoose)
const cardSchema = new mongoose.Schema({
    _id: Number,
    cardNumber:{
        type:String,
    },
    cardType:{
        type:String,
        enum:["REGULAR","SPECIAL"],
        require:true
    },
    customerName:{
        type:String,
        require:true
    },
    status:{
        type:String,
        enum:["ACTIVE","INACTIVE"],
        default:"ACTIVE"
    },
    vision:{
        type:String,
        require:true
     },
    customerID:{
        type:String,
        ref:"customer"
    }
  
}  ,{timestamps:true},{_id:false}
);
cardSchema.plugin(autoIncrement)

module.exports=mongoose.model("card",cardSchema)