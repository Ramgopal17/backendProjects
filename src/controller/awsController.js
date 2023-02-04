const aws = require("aws-sdk")
aws.config.update({
    accessKeyId: "AKIAWVFUTOX4RBDD34VI",
    secretAccessKey: "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",
    region: "ap-south-1"
})

exports.uploadFile= async ( file) =>{
   return new Promise( function(resolve, reject) {
//  create s3 service object
    let s3= new aws.S3({apiVersion: '2006-03-01'}); // we will be using the s3 service of aws

    var uploadParams= {
        ACL: "public-read",
        Bucket: "yourbucket345",  //HERE
        Key: "abc/" + file.originalname, //HERE 
        Body: file.buffer
    }



    s3.upload( uploadParams, function (err, data ){
        if(err) {
            console.log("data",err)
            return reject({"error": err})
        


        }
        // console.log(data)

        console.log("file uploaded succesfully")
        return resolve(data.Location)
    })



   })
}



