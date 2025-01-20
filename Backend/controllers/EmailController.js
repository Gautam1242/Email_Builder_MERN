import EmailModel from '../models/EmailModel.js';

// create a new entry in database
const createEmail=async(req,res)=>{
    try {
        const {title,content,category}=req.body;
        const newEmail=await EmailModel.create({title,content,category})
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

// fetch the email content on the basis of category
const fetchEmail=async(req,res)=>{
    try {
        const category = req.query.category;
        const email=await EmailModel.findOne({ category });
        res.status(200).json({
            success:true,
            email:email
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

export {createEmail,fetchEmail}