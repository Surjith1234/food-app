const express=require('express')
const app=express()
const cors=require('cors')
const mongoose=require('mongoose')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const connect=async()=>{
    try {
        await mongoose.connect('mongodb+srv://surjith:surjith2003@cluster0.pw1ezze.mongodb.net/food?retryWrites=true&w=majority&appName=Cluster0')
        console.log("connected");
    }
    catch(err)
    {
        throw err;
    }
}
app.use(cors(
    {
        origin:["https://deploy-mern-1whq.versal.app"],
        methods:["POST","GET"],
        credentials:true
    }
))
app.use('/api/img',require('./routes/image'))
app.use('/api/user',require('./routes/User'))
app.use('/api/food',require('./routes/food'))
app.use('/api/order',require('./routes/order'))
app.use(express.json({limit:"3mb"}))
app.listen(5000,()=>{
    connect();
    console.log("port is running on 5000");
})