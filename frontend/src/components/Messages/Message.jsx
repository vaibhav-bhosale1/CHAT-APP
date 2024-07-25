import React from 'react'

const Message = () => {
  return (
    <div className='chat chat-end'>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
            <img src="https://api.dicebear.com/9.x/bottts/avif" />

            </div>
        </div>
        <div></div>
        <div className="chat-bubble text-white ng-blue-500">
         hi
        </div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>12:42</div>
      
    </div>
  )
}

export default Message
