import Conversation from "../models/conversationmodel.js";
import messages from "../models/messagemodel.js";

export const sendmessage=async (req,res)=>{
    try{
        const{message}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;
        let conversation=await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        })
        if(!conversation){
            conversation=await Conversation.create({
                participants:[senderId,receiverId]
            })
        }

        const newmessage=new messages({
            senderId,
            receiverId,
            message
        })
        if(newmessage){
            conversation.message.push(newmessage._id)
        }
        ///socketio


        await Promise.all([conversation.save(),newmessage.save()]);
        res.status(201).json(newmessage)

    }catch(error){
        console.log("Error in sending message",error.message)
        res.status(500).json({error:"Internal server error"})
    }
}

export const getmessage=async (req,res)=>{
    try{
        const {id:usertochatid}=req.params;
        const senderId=req.user._id;
        const conversation=await Conversation.findOne({
            participants:{$all:[senderId,usertochatid]}
        }).populate("message")
        res.status(200).json(conversation.message)

    }catch(error){
        console.log("Error in getting message",error.message)
        res.status(500).json({error:"Internal server error"})
    }
}