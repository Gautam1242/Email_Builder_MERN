import express from "express";
import { userCreateEmail } from "../controllers/userEmailController.js";

const userEmailRouter=express.Router();

userEmailRouter.post('/user',userCreateEmail);

export default userEmailRouter;