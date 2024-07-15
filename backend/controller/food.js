const food=require('../model/Food')

const createFood=async(req,res)=>{
    try{
    //  const {name,price,description,category,weight,foodImage}=req.body;
     const newFood=new food(req.body)
     const savefood=newFood.save();
     res.status(200).json({
        message:"food successfully added",
        success:true,
        data:{
            food:savefood,
        }
     })
    }catch(err)
    {
        console.log(err);
        res.status(500).json({
            error:"Internal server error",
            success:false,
        })
    }
}



const getAllFood=async(req,res)=>{
    try{
        const {category}=req.query;
        console.log(category)
        if(category==='all')
        {
            const fooditems=await food.find()
            res.status(200).json({
               message:"food successfully added",
               success:true,
               data:{
                   food:fooditems,
               }
            })
        }else{
            const fooditems=await food.find({category:category})
            res.status(200).json({
                message:"food successfully added",
                success:true,
                data:{
                    food:fooditems,
                }
             })
        }
    
       }catch(err)
       {
           console.log(err);
           res.status(500).json({
               error:"Internal server error",
               success:false,
           })
       }
}
const getNewFood=async(req,res)=>{
    try{
       
            const fooditems=await food.find().sort({createdAt:-1}).limit(12)
            res.status(200).json({
               message:"12 register food showing",
               success:true,
               data:{
                   food:fooditems,
               }
            })
       
    
       }catch(err)
       {
           console.log(err);
           res.status(500).json({
               error:"Internal server error",
               success:false,
           })
       }
}
const getProductsFromDistinctCategory=async(req,res)=>{
    try{
       
            const distinctCategory=await food.distinct("category")
            const distinctfood=await Promise.all(distinctCategory.slice(0,4).map(async(category)=>{
                const foods=await food.findOne({category})
                return foods;
            }))
            res.status(200).json({
               message:"4 different category food",
               success:true,
               data:{
                   food:distinctfood,
               }
            })
       }catch(err)
       {
           console.log(err);
           res.status(500).json({
               error:"Internal server error",
               success:false,
           })
       }
}
const getTopRating=async(req,res)=>{
    try{
       
            const topRatedFood=await food.find().sort({"reviews.rating":-1}).limit(4)
           
            res.status(200).json({
               message:"4 different category food",
               success:true,
               data:{
                   food:topRatedFood,
               }
            })
       }catch(err)
       {
           console.log(err);
           res.status(500).json({
               error:"Internal server error",
               success:false,
           })
       }
}
const getFoodById=async(req,res)=>{
    try{
        const {id}=req.params;
       
            const fooditems=await food.findById(id);
            res.status(200).json({
               message:"food details",
               success:true,
               data:{
                   food:fooditems,
               }
            })
        }
       catch(err)
       {
           console.log(err);
           res.status(500).json({
               error:"Internal server error",
               success:false,
           })
       }
}
module.exports={createFood,getAllFood,getFoodById,getNewFood,getProductsFromDistinctCategory,getTopRating}