import React from 'react'
import Message from './Message'
import getMessages from '../../hooks/getMessages'
import MessageSkeleton from '../skeletons/MessageSkeleton'
const Messages = () => {
  const {messages,loading}=getMessages();
  console.log("messages",messages)
  return (
    <div className='px-4 flex-1 overflow-auto'>
    {!loading &&
      messages.length > 0 &&
      messages.map((message) => (
        <div key={message._id} >
          <Message message={message} />
        </div>
      ))}

    {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
    {!loading && messages.length === 0 && (
      <p className='text-center'>Send a message to start the conversation</p>
    )}
  </div>
  )
}

export default Messages
