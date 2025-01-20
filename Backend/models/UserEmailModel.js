import mongoose from "mongoose";

const UserEmailSchema=new mongoose.Schema({
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

const UserEmailModel=mongoose.model.useremail||mongoose.model("useremail",UserEmailSchema);

export default UserEmailModel;