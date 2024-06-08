import express from"express"
import {signup,login,logout} from "../controllers/authcontroller.js"
const router=express.Router();
router.post("/login",login)
router.post("/signup",signup)
router.post("/logout",logout)
export default router;