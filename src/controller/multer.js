const multer=require("multer")



    const fileFilter =  (req, res, next) => {
    const files = req.files

    if(files.length ==0) return res.status(400).send({ status: false, message: "Only .png, .jpg and .jpeg format allowed!" });
    
    

    next();

}
 


module.exports={fileFilter}