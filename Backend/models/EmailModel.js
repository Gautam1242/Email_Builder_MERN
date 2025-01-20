import mongoose from "mongoose";

const EmailSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        default:"Title of the email"
    },
    content:{
        type:String,
        required:true,
        default:"Content of the email"
    },
    category:{
        type:String,
        required:true,
        default:""
    }
})

const EmailModel=mongoose.model.email||mongoose.model("email",EmailSchema);

export default EmailModel;