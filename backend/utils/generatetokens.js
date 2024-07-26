import jwt from "jsonwebtoken"
const generatetokens=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'15d'
    })
    res.cookie("jwt",token,{
        maxAge:15*24*60*6*1000,
     
    });
};

export default generatetokens;