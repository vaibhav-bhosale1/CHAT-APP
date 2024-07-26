import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from "../../context/authcontext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const [profilePic, setProfilePic] = useState('');

  // Fetch avatar URL when component mounts or when selectedConversation changes
  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await axios.get(`https://robohash.org/${fromMe ? authUser._id : selectedConversation?._id}.png`);
        setProfilePic(response.config.url); // robohash.org directly provides the URL in response
      } catch (error) {
        console.error('Error fetching avatar:', error);
        // Set a fallback image URL if fetching fails
        setProfilePic('https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png');
      }
    };

    fetchAvatar();
  }, [authUser._id, fromMe, selectedConversation?._id]);

  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img alt='User avatar' src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
      <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
    </div>
  );
};

export default Message;
