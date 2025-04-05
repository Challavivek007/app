const express = require('express')
const mongoose=require("mongoose")
const cors = require('cors')
const bodyparser=require('body-parser')


const app=express()
app.use(express.json());
app.use(bodyparser.json())
app.use(cors())


const connectDB = async () => {
    try {
      await mongoose.connect("mongodb+srv://aletisiddhureddy:o2JY0wR6sDBvlsNw@cluster0.wy5pyhr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
      });
      console.log('✅ MongoDB connected');
    } catch (err) {
      console.error('❌ MongoDB connection error:', err.message);
      process.exit(1); // Abort mission
    }
  };
connectDB();

app.get('/',(req,res)=>{
    
    return res.json("hi");    
})


app.listen(3000,()=>{
    console.log("listening");
})
