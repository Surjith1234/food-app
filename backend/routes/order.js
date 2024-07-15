const express=require('express')
const { createOrder, getAllOrder, getSingleOrder, markOrderAsDelivered } = require('../controller/Order')
const protect = require('../middleware/authMiddleware')
const router=express.Router()


router.post("/neworder",createOrder)
router.post("/getorders",protect,getAllOrder)
router.post("/getorder",protect,getSingleOrder)
router.post("/delivered",protect,markOrderAsDelivered)

module.exports=router;