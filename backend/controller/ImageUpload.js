const cloudinary=require('cloudinary')
cloudinary.config({
    cloud_name:"dw4v8vpnz",
    api_key:"866421939972355",
    api_secret:"zaZ9TOfDYfIYg360P3QJuKO2c0M"
})

const imageUploadController=async(req,res)=>{
    try{
        const result=await cloudinary.uploader.upload(req.files.image.path)
        console.log(result)
        res.json({
            url:result.secure_url,
            public_id:result.public_id
        })
    }
    catch(err)
    {
        console.log(err)
    }
}
module.exports={imageUploadController};