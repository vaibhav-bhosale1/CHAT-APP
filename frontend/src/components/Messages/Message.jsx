import React from 'react'

const Message = () => {
  return (
    <div className='chat chat-end'>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />

            </div>
        </div>
        <div></div>
        <div className="chat-bubble text-white ng-blue-500">
            It was said that you would, destroy the Sith, not join them.
        </div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>12:42</div>
      
    </div>
  )
}

export default Message
