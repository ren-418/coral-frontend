import React, { useEffect, useState } from 'react'
import './Chats.scss'
import ChatPreview from '../../../../components/chat preview/ChatPreview';
import ProfilePic from '../../../../imgs/global/default-pp.png';
import routes from '../../../../data/routes.json'

function Chats({setPage, setUserId}) {
    const [chats, setChats] = useState([])

    useEffect(() => {
        fetchChats();
    } ,[])

    const fetchChats = async () => {
        try {
            const res = await fetch('http://localhost:9090/api/v1/chat/get-chats', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionToken: localStorage.getItem('sessionToken')
                }),
            });

            const resJson = await res.json();

            if(res.ok){
                setChats(resJson.chatPreviews);
            }
            else{
                console.log('Error')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const openChat = (userId) => {
        setUserId(userId);
        setPage(routes.chat)
    }

    return (
        <div className='chats-page'>
            <h1>Chats</h1>
             <div className='chats-container'>
                {chats.map((chat, index) => (
                    <ChatPreview key={index} profilePic={chat.profileImage} name={chat.name} userId={chat.userId} lastMessage={chat.lastMessage} openChat={openChat}/>
                ))}
                {chats.length === 0 && <h3 style={{textAlign: 'center', width: '100%'}}>No chats</h3>}
            </div>
        </div>
    )
}

export default Chats