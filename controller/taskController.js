const Task=require("")


exports.AddTask=async function (req,res){
  let   data=req.body

  let dataCreated=await Task.add(data)
  return res.status(201).send({status:true,msg:"successfully created", data:dataCreated})


}

