import React, {useState, useEffect} from 'react'
import './Notifications.scss'
import DefaultProfilePic from '../../../../imgs/global/default-pp.png'
import NotificationCard from '../../../../components/notification/NotificationCard';

function Notifications({goBack}) {

    const [notifications, setNotifications] = useState([{investor: {name: 'Tomas Serra', profileImage: DefaultProfilePic}, notificationMessage: 'Has invested $USD 1000 in your enterprise', date: '09/06/2024'}]);

    useEffect(()=>{
        fetchNotifications()
    }, [])

    const fetchNotifications = async () => {
        try{
            const res = await fetch('http://localhost:9090/api/v1/notifications/get-notifications', {
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
                setNotifications(resJson);
            }
        }catch(error){
        }
    }
  return (
    <div className='notifications-page'>
        <h1>Notifications</h1>
        <div className="notifications-container">
            {notifications.map((notification, index) => (
                <NotificationCard key={index} notification={notification}/>
            ))}
            {notifications.length === 0 && <p>No notifications available</p>}
        </div>
    </div>
  )
}

export default Notifications