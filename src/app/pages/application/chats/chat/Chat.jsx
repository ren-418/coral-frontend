import React, {useEffect, useState} from 'react'
import './Chat.scss'
import ProfilePic from '../../../../../imgs/global/default-pp.png'
import routes from '../../../../../data/routes.json'
import { IoIosArrowBack } from "react-icons/io";
import { IoSend } from "react-icons/io5";

function Chat({userId, setPage}) {
    const [messages, setMessages] = useState([])
    const [userData, setuserData] = useState({})
    const [message, setMessage] = useState('')

    useEffect(() => {
        fetchMessages()
    } ,[])

    const fetchMessages = async () => {
        try {
            const res = await fetch('http://localhost:9090/api/v1/chat/get-messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionToken: localStorage.getItem('sessionToken'),
                    toUserId: userId
                }),
            });

            const resJson = await res.json();

            if(res.ok){
                setMessages(resJson.messages);
                setuserData(resJson.userData);
            }
            else{
                console.log('Error')
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='chat-page'>
        <div className='chat-header'>
            <button className='back-button' onClick={()=>{setPage(routes.messages)}}><IoIosArrowBack/></button>
            <img src={ProfilePic} className='profile-pic'/>
            <h3>Joe Biden</h3>
        </div>
        <div className='messages-container'>
            {messages.map((message, index) => (
                <div key={index} className={message.sender === userId ? 'message sent' : 'message received'}>
                    <p>{message.message}</p>
                </div>
            ))}
        </div>
        <div className='chat-input'>
            <div className='container'>
                <input type="text" placeholder='' value={message} onChange={(event) => {setMessage(event.target.value)}}/>
                <button className='send-btn'><IoSend/></button>
            </div>
        </div>
    </div>
  )
}

export default Chat