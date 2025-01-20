import UserEmailModel from '../models/UserEmailModel.js';

// create a new entry of user email in database
const userCreateEmail=async(req,res)=>{
    try {
        const {title,content,category}=req.body;
        if(!title||!content||!category){
            return res.json({
                success:false,
                message:"Fields(title,content,category) are required!"
            })
        }
        const newEmail=await UserEmailModel.create({title,content,category})
        await newEmail.save();
        res.status(200).json({
            success:true,
            message:"Email Sent Successfully",
            email:newEmail
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}


export {userCreateEmail}