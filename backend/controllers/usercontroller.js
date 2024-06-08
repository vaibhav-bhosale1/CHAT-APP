import User from "../models/usermodel.js";

export const getusersforsidebar=async(req,res)=>{
    try{
        const loggedinuserid=req.user._id;
        const filtereduser=await User.find({_id:{$ne:loggedinuserid}}).select("-password")
        res.status(200).json(filtereduser);

    }
    catch(error){
        console.log("errror from getsidebar",error.message)
        res.status(500).json({error:"internal server error"})
    }
}
