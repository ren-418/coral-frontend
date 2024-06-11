import React from 'react'
import './Header.scss'
import Logo from '../../imgs/global/logo blanco.png'
import { IoNotifications } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import routes from '../../data/routes.json'


function Header({hasNotificationsToRead, setPage, userType}) {
  return (
    <header className='logo-header'>
      <img src={Logo} alt="logo"/>
        <div className='notification-btn' onClick={()=>{setPage(routes.notifications)}}>
        {hasNotificationsToRead ?
          <IoNotifications size={30} color='white'/>
          :
          <IoNotificationsOutline size={30} color='white'/>
        }
      </div>
    </header>
  )
}

export default Header