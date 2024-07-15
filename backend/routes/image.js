const express=require('express')
const ExpressFormidable = require('express-formidable')
const multer=require('multer')
const router=express.Router()
const {imageUploadController} =require("../controller/ImageUpload")




router.post("/upload-image",ExpressFormidable({maxFieldsSize:5*2024*2024}),
imageUploadController
)
module.exports=router;