const express=require("express")
app=express()
const multer=require("multer")
const route=require("./route/route")
app.use(express.json())
app.use(express.urlencoded({ extended: true })) 
app.use(multer().any())
app.use("/",route)
let PORT=process.env.PORT||3000

app.listen(PORT,function(err,result){
    console.log(`server running on ${PORT}`);

})