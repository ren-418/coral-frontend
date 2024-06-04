import React from 'react'
import './ChatPreview.scss'

function ChatPreview({profilePic, name, lastMessage, userId, openChat}) {
  return (
    <div className='chat-preview-component' onClick={()=>{openChat(userId)}}>
        <div className='image-container'>
            <img src={profilePic} alt="pfp"/>
        </div>
        <div className='text-container'>
            <h3>{name}</h3>
            <p>{lastMessage}</p>
        </div>
    </div>
  )
}

export default ChatPreview