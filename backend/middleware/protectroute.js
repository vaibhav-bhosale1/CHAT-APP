import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";
const protectRoute=async (req,res,next)=>{
    try{
        const token=req.cookies.jwt;
        if(!token){
            res.status(401).json({error:"unauthorized server error"})
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            res.status(401).json({error:"unauthorized server error"})
        }
        const user=await User.findById(decoded.userId).select("-password");
        if(!user){
            res.status(401).json({error:"user notfound server error"})
        }
        req.user=user;
        next();
    }
    catch(error){
        console.log("Error from protected middleware",error.message)
        res.status(500).json({error:"internal server error"})
    }
}
export default protectRoute;