import React from 'react'
import './RegisterPage.scss'
import { Link } from 'react-router-dom';
import ModernInput from '../../../components/modern inputs/ModernInput';
import ClassicInput from '../../../components/classic input/ClassicInput';

function RegisterPage() {
  return (
    <>
    <div className="register-page">
      <div className='pink-background'></div>
      <h1>Register</h1>
      <div className='form-container'>
        <div className='check-container'>
          <label>Investor or enterprise?</label>
          <ClassicInput type='select' placeholder='Select account type' options={["Enterprise", "Investor"]}/>
        </div>
        <ModernInput type="text" color="white">Email</ModernInput>
        <ModernInput type="password" color="white">Password</ModernInput>
        <ModernInput type="password" color="white">Repeat Password</ModernInput>
        <button className='button'>Register</button>
      </div>
      <div className='login'>
        <p>Already have an account?</p>
        <Link to="/login">Login here</Link>
      </div>
    </div>
    </>
  )
}

export default RegisterPage