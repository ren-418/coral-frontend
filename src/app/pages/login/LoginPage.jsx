import React, { useState } from 'react'
import './LoginPage.scss'
import { Link } from 'react-router-dom';
import ModernInput from '../../../components/modern inputs/ModernInput';


function LoginPage() {
  const email = useState()


  return (
    <>
    <div className="login-page">
      <div className='pink-background'></div>
      <h1>Login</h1>
      <div className='form-container'>
        <ModernInput type="text" color="white">Email</ModernInput>
        <ModernInput type="password" color="white">Password</ModernInput>
        <button className='button'>Login</button>
      </div>
      <div className='register'>
        <p>Don't have an account?</p>
        <Link to="/">Register here</Link>
      </div>
    </div>
    </>
  )
}

export default LoginPage