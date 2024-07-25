import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSocketContext } from '../../context/SocketContext';
import useConversation from '../../zustand/useConversation';

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  // State to store the avatar URL
  const [avatarUrl, setAvatarUrl] = useState('');

  // Function to fetch random avatar URL from robohash.org
  const fetchAvatar = async () => {
    try {
      const response = await axios.get(`https://robohash.org/${conversation._id}.png`);
      setAvatarUrl(response.config.url); // robohash.org directly provides the URL in response
    } catch (error) {
      console.error('Error fetching avatar:', error);
      // Set a fallback image URL if fetching fails
      setAvatarUrl('https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png');
    }
  };

  // Fetch avatar URL when component mounts or when conversation changes
  useEffect(() => {
    fetchAvatar();
  }, [conversation._id]);

  const handleConversationClick = () => {
    setSelectedConversation(conversation);
  };

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${selectedConversation?._id === conversation._id ? "bg-sky-500" : ""}`}
        onClick={handleConversationClick}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className='w-12 h-12 rounded-full overflow-hidden'>
            <img src={avatarUrl} alt='user avatar' style={{ width: '100%', height: 'auto' }} />
          </div>
        </div>

        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between'>
            <p className='font-bold text-gray-200'>{conversation.fullName}</p>
            <span className='text-xl'>{emoji}</span>
          </div>
        </div>
      </div>
      {!lastIdx && <div className='divider my-0 py-0 h-1' />}
    </>
  );
};

export default Conversation;
