import React, {useEffect, useState, useRef} from 'react'
import './Chat.scss'
import ProfilePic from '../../../../../imgs/global/default-pp.png'
import { IoIosArrowBack } from "react-icons/io";
import { IoSend } from "react-icons/io5";

function Chat({userId: toUserId, goBack}) {
    const [messages, setMessages] = useState([])
    const [userData, setuserData] = useState({name: '', profileImage: ProfilePic, myUserId: ''})
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
                    senderSessionToken: localStorage.getItem('sessionToken'),
                    receiverId: toUserId
                }),
            });

            if(res.ok){
                const resJson = await res.json();
                setMessages(resJson.messages);
                setuserData({name: resJson.name, profileImage: resJson.profileImage, myUserId: resJson.clientId});
            }
            else{
                console.log('Error')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const sendMessage = async () => {
        if(message.trim() === "") return;
        try {
            const res = await fetch('http://localhost:9090/api/v1/chat/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    senderSessionToken: localStorage.getItem('sessionToken'),
                    receiverId: toUserId,
                    message: message
                }),
            });

            if(res.ok){
                fetchMessages()
                setMessage('')
            }
            else{
                console.log('Error')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getHour = (d) => {
        const date = new Date(d);
        const hoursAndMinutes = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return hoursAndMinutes;
    }

  return (
    <div className='chat-page'>
        <div className='chat-header'>
            <button className='back-button' onClick={goBack}><IoIosArrowBack/></button>
            <img src={userData.profileImage} className='profile-pic'/>
            <h3>{userData.name}</h3>
        </div>
        <div className='messages-container'>
            {messages.map((message, index) => (
                <div key={index} className={message.senderId === userData.myUserId ? 'my-message' : 'other-message'}>
                    <p>{message.message}</p>
                    <p className='time'>{getHour(message.timeStamp)}</p>
                </div>
            ))}
        </div>
        <div className='chat-input'>
            <div className='container'>
                <input type="text" placeholder='' value={message} onChange={(event) => {setMessage(event.target.value)}}/>
                <button className='send-btn' onClick={sendMessage}><IoSend/></button>
            </div>
        </div>
    </div>
  )
}

export default Chat