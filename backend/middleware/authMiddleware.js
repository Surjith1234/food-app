const jwt=require('jsonwebtoken')
const protect=async(req,res,next)=>{
    try{
      const token=req.headers["authorization"].split(" ")[1]
      jwt.verify(token,"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",(err,decode)=>{
        if(err)
        {
            return res.status(200).send({
                message:"auth failed",
                success:false,
            })
        }
        else{
            req.body.userId=decode.id;
            next()
        }
      })
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
module.exports=protect;