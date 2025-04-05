const mongoose = require("mongoose")

const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'please add name'],
        trim: true,
    },
    number:{
        type: Number,
        required: [true,'please add number'],
    },
    role:{
        type: String,
        default: "user",
    },
},{timestamps:true}
)
const usermodel=mongoose.model("users",userSchema);