import React from 'react'
import './Header.scss'
import Logo from '../../imgs/global/logo blanco.png'

function Header() {
  return (
    <header className='logo-header'>
      <img src={Logo} alt="logo"/>
    </header>
  )
}

export default Header