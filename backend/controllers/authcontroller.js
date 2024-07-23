import User from "../models/usermodel.js"
import generatetokens from "../utils/generatetokens.js"
import bcryptjs from "bcryptjs"

export const signup=async (req,res)=>{
  try{
    const {fullName,username,password,confirmPassword,gender}=req.body;

  if(password!==confirmPassword){
      return res.status(400).json({error:"Passwords dont match"})
  }
  const user=await User.findOne({username});
  if(user){
      return res.status(400).json({error:"username already exist"})
  }
  const salt=await bcryptjs.genSalt(10);
  const hashedpassword=await bcryptjs.hash(password,salt);

  const profilename=`https://ui-avatars.com/api/?name={username}`

  const newUser=new User({
      fullName,
      username,
      password:hashedpassword,
      profilepic:profilename,
      gender,
  })
  if(newUser){
    generatetokens(newUser._id,res)
    await newUser.save();
    res.status(201).json({
        _id:newUser._id,
        username:newUser.username,
        profilepic:newUser.profilepic,
    })
  }
  else{
    console.log("invalid  user data",error.message);
    res.status(500).json({error:"invalid  user data"});
  }
  
}
 catch(error){
  console.log("error in signup controller",error.message);
  res.status(500).json({error:"Internal server errorr"});
}
}

export const login=async (req,res)=>{
    try{
      const {username,password}=req.body;
      const user=await User.findOne({username});
      const isPasswordcorrect=await bcryptjs.compare(password,user?.password || "");

      if(!user || !isPasswordcorrect){
        return res.status(400).json({error:"invalid username or password"});
      }
      generatetokens(user._id,res);
      res.status(201).json({
        _id:user._id,
        username:user.username,
        profilepic:user.profilepic,
        message:"Logged in Successfully"
    })
    }catch(error){
      console.log("error in login controller",error.message);
      res.status(500).json({error:"Internal server error"});
    }
}

export const logout=(req,res)=>{
  try{
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"Logged out Successfully"})
  }catch(error){
    console.log("error in logout controller",error.message);
    res.status(500).json({error:"Internal server error"});
  }
}
