const mongoose = require('mongoose')

const userSchema =  new mongoose.Schema({
     
        fname: {type:String, required:true},
        lname: {type:String, required: true},
        email: {type:String, required:true, unique:true},
        profileImage: {type:string, required:true}, 
        phone: {type:String, required:true, unique:true}, 
        password: {type:String,required:true, minLen:8, maxLen:15}, // encrypted password
        address: {
          shipping: {
            street: {type:String, required:true},
            city: {type:String, required:true},
            pincode: {type:Number, required:true}
          },
          billing: {
            street: { type:String, required:true},
            city: {type:String, required:true},
            pincode: { type: Number, required:true}
          }
        },createdAt: {timestamp},
          updatedAt: {timestamp}
    });

        module.exports = mongoose.model('user', userSchema);
        

      