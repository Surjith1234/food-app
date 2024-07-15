const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const user=require("../model/User")
const otpGenerator=require('otp-generator')
const nodemailer=require('nodemailer')
const registerController=async(req,res)=>{
    try{
        const existinguser=await user.findOne({email:req.body.email});
        if(existinguser)
        {
            return res.status(200).send({
                message:"user already exist",
                success:false,
            })
        }
        const password=req.body.password
        const salt=await bcrypt.genSalt(10)
        const hashPassword=await bcrypt.hash(password,salt)
        req.body.password=hashPassword
        const confirmpassword=await bcrypt.hash(req.body.confirmpassword,salt)
        const otp=otpGenerator.generate(6,{
            digits:true,
            upperCase:false,
            specialChars:false,
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
        }); 
        req.body.confirmpassword=confirmpassword
        if(req.body.password===req.body.confirmpassword)
        {
            const newUser=new user({
                name:req.body.name,
                email:req.body.email,
                profileImage:req.body.profileImage,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword,
                otp:otp,
            })
            await newUser.save();
            const token=jwt.sign({id:newUser._id},"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",{
                expiresIn:"1d"
            });
           
            return res.status(201).send({
                message:"Registered successfully",
                data:{
                    user:newUser,
                    token,
                },
                success:true,
            })
        }
        else
        {
            return res.status(500).send({
                message:"password not match",
                success:false,
            })
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).send({
            message:"Registered error",
            success:false,
        })
    }
}

const authController=async(req,res)=>{
    try{
        const foundUser=await user.findOne({_id:req.body.userId}).select('+isVerified');
        if(!foundUser)
        {
            return res.status(200).send({
                message:"User not found",
                success:false,
            })
        }
        else{
            console.log(foundUser)
            return res.status(200).send({
                message:"User found successfully",
                data:{
                    user: foundUser,
                },
                success:true,
            })
        }
    }
    catch(err)
    {
        console.log(err)
        res.status(500).send({
            success:false,
            message:'Auth error',
        })
    }
}

// const loginController=async(req,res)=>{
//     try{
//         const user=await user.findOne({email:req.body.email}).select("+password")
//         if(!user)
//         {
//             return res.status(200).send({
//                 message:"user not found",
//                 success:false,
//             })
//         }
//         const isMatch=await bcrypt.compare(req.body.password,user.password)
//         const signuser=await user.findOne({email:req.body.email})
//         if(!isMatch)
//         {
//             return res.status(200).send({
//                 message:"Invalid password and mail",
//                 success:false,
//             })
//         }
//         const token=jwt.sign({id:signuser._id},"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",{
//             expiresIn:"1d",
//         });
//         return res.status(201).send({
//             message:"Login successfully",
//             data:{
//                 user:signuser,
//                 token,
//             },
//             success:true,
//         })
//     }
//     catch(err)
//     {
//         console.log(err)
//         res.status(500).send({
//             success:false,
//             message:'Auth error',
//         })
//     }   
// }
const loginController = async (req, res) => {
    try {
        const foundUser = await user.findOne({ email: req.body.email }).select("+password"); // Changed variable name to foundUser
        if (!foundUser) {
            return res.status(200).send({
                message: "user not found",
                success: false,
            });
        }
        const isMatch = await bcrypt.compare(req.body.password, foundUser.password); // Changed variable name to foundUser
        const signuser = await user.findOne({ email: req.body.email }).select('+isVerified');
        if (!isMatch) {
            return res.status(200).send({
                message: "Invalid password and mail",
                success: false,
            });
        }
        const token = jwt.sign({ id: signuser._id }, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", {
            expiresIn: "1d",
        });
        return res.status(201).send({
            message: "Login successfully",
            data: {
                user: signuser,
                token,
            },
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Auth error',
        });
    }
};
const verifyOtpController=async(req,res)=>{
    try{
        const userotp=await user.findOne({email:req.body.email})
        if(userotp.otp===req.body.combineOtp)
        {

            user.isVerified=true;
            await user.save();
            res.status(200).send({
                success:true,
                message:'otp verified'
            })
        }
        else
        {
            res.status(200).send({
                success:true,
                message:'otp not verified'
            })
        }

    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'failed to verify',
        });
    }
}
const updateUserProfile=async(req,res)=>{
    try{
        const {name,profileImage,userId,street,city,state,zipcode,country}=req.body;
        const updateUser=await user.findById(userId)
       if(!updateUser)
       {
        return res.status(200).send({
            message: "user not found",
            success: false,
        });
       }
       updateUser.name=name||updateUser.name
       updateUser.profileImage=profileImage||updateUser.profileImage
       updateUser.street=street||updateUser.street
       updateUser.city=city||updateUser.city
       updateUser.state=state||updateUser.state
       updateUser.zipcode=zipcode||updateUser.zipcode
       updateUser.country=country||updateUser.country
        await updateUser.save()
        return res.status(201).send({
            message: "Profile updated successfully",
            success: true,
        });
    }catch(err)
    {
        console.log(err)
        return res.status(200).send({
            message: "user errir",
            success: false,
        });
    }
}
module.exports={registerController,authController,loginController,verifyOtpController,updateUserProfile}