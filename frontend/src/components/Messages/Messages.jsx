import React from 'react'
import Message from './Message'
import getMessages from '../../hooks/getMessages'
const Messages = () => {
  const {messages,loading}=getMessages();
  console.log("messages",messages)
  return (
    <div className='px-4 flex-1 overflow-auto'>
        <Message/>
        <Message/>
       
      
    </div>
  )
}

export default Messages
