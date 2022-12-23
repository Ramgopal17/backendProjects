const mongoose=require("mongoose")
var {v4:uuidv4 }= require('node-uuid');

const customerSchema= new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        mobileNumber:{
            type:Number
        },
        DOB:{
            type:Date
        },
        emailID:{
            type:String,
            require:true
        },
        address:{type:String,
            required:true
        },
        customerID:
          
            { type: String,
             default:uuidv4
            },

        
        status:{
            type:String,
            default:"Active"
        },
        isDeleted:{
            type:Boolean,
            default:false
        }
    },{
        timestamps:true
    }
    
)

module.exports=mongoose.model("customer",customerSchema)