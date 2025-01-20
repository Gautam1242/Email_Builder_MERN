import express from "express";
import {createEmail, fetchEmail} from '../controllers/EmailController.js'

const emailRouter=express.Router();

emailRouter.post('/create',createEmail);
emailRouter.get('/fetch',fetchEmail);

export default emailRouter;