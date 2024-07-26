import jwt from "jsonwebtoken"
const generatetokens=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'15d'
    })
    res.cookie("jwt",token,{
        maxAge:15*24*60*6*1000,
        httpOnly:true,//prevent from attack
        sameSite:"strict",
        secure: process.env.NODE_ENV !== "development",
    });
};

export default generatetokens;