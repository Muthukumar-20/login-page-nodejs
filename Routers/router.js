import express from "express";
import { getUser, loginUser, registerUser } from "../Controllers/user.controler.js";
import authmiddleware from "../Middleware/auth.middleware..js";


const router =express.Router();

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/getuser",authmiddleware,getUser)


export default router;