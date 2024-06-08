import mongoose, { mongo } from "mongoose";

const conversationSchema=new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    message:[{
         type:mongoose.Schema.Types.ObjectId,
         ref:"messages",
         default:[]
    }]
},{timestamps:true})

const Conversation=mongoose.model("Conversation",conversationSchema)
export default Conversation;