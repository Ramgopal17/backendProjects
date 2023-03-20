const express=require("express")

const cors=require("cors")
const Task=require("../config")

// const route=require("./src/route")

const app=express()

app.use(express.json())

app.use(cors)
// app.use("/",route)

app.post("/create",async(req,res)=>{
    const data=req.body
    await Task.add(data)
    res.send({msg:"user added"})
})

    app.listen(process.env.PORT || 3000, function() {
        console.log('Express app running on port ' + (process.env.PORT || 3000))
    })

    