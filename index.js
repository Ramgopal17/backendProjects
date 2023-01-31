const express=require("express")
const { mongoose } = require("mongoose")
let app=express()
const route=require("./route/route")
app.use(express.json())
mongoose.connect("mongodb+srv://kashyap:dyqoMd2EfwTtkQvt@cluster0.agakhnj.mongodb.net/test",{
useNewUrlParser:true}).then(()=>{
    console.log("mongoDb is connected")
}).catch((err)=>{
    console.log(err)
})
app.use("/",route)

app.listen(process.env.PORT||3000,function(err,data){
    console.log(`server running on 3000`)
})

