const express=require("express")
const mongoose=require("mongoose")
const app=express()
const route=require("./route/route.js")

app.use(express.json())

mongoose.connect("mongodb+srv://kashyap:dyqoMd2EfwTtkQvt@cluster0.agakhnj.mongodb.net/projectFup",{useNewUrlParser:true})
.then((res)=>{
    console.log("mongoDB is connected")

})
.catch((err)=>{
    console.log(err.message)
})

app.use("/",route)

app.listen(process.env.PORT||3000,function (){
    console.log(`back end running at`+(process.env.PORT||3000))
})
