import React from 'react'
import './NotificationCard.scss'

function NotificationCard({notification}) {
  return (
    <div className="notification-card">
        <div className="notification-content">
            <div className="investor-info">
                <img src={notification.investor.profileImage}/>
                <p className="investor-name">{notification.investor.name}</p>
            </div>
            <p className="notification-message">{notification.notificationMessage}</p>
        </div>
        <p className="date">{notification.date}</p>
    </div>
  )
}

export default NotificationCard