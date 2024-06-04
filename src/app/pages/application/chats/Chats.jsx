import React, { useEffect, useState } from 'react'
import './Chats.scss'
import ChatPreview from '../../../../components/chat preview/ChatPreview';
import ProfilePic from '../../../../imgs/global/default-pp.png';
import routes from '../../../../data/routes.json'

function Chats({setPage, setUserId}) {
    const [chats, setChats] = useState([{profilePic: ProfilePic, name: 'Joe Biden', lastMessage: 'Example message', userId: 4}, {profilePic: ProfilePic, name: 'Joe Biden', lastMessage: 'Example message', userId: 4}])

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
                setChats(resJson);
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
            {chats && <div className='chats-container'>
                {chats.map((chat, index) => (
                    <ChatPreview key={index} profilePic={chat.profilePic} name={chat.name} userId={chat.userId} lastMessage={chat.lastMessage} openChat={openChat}/>
                ))}
            </div>}
        </div>
    )
}

export default Chats