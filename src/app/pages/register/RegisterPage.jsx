import React from 'react'
import { useState, useEffect } from 'react';
import './RegisterPage.scss'
import { Link, useNavigate } from 'react-router-dom';
import ModernInput from '../../../components/modern inputs/ModernInput';
import ClassicInput from '../../../components/classic input/ClassicInput';
import PopUp from '../../../components/popup/PopUp';

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({});
  const [accountType, setAccountType] = useState("");

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    userType: ''
  });

  
  const onSubmit = async () => {

    setLoading(true);

    if(!hasErrors()){
      try {
        const res = await fetch('http://localhost:9090/api/v1/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
            accountType: accountType
          }),
        });
    
        const resMessage = await res.text();

        if (!res.ok) {
          
          setNewMessage(resMessage, "error")
        } else {
          setNewMessage(resMessage, "success")
          setEmail("");
          setAccountType("");
          setPassword("");
          setConfirmPassword("");
        }
      } catch (error) {
        setNewMessage("An error has occurred, please verify your connection", "error")
      }
    }
    setLoading(false);
  };

   function hasErrors(){
    var newErrors = {};
    if (isValidEmail(email) === false){
      newErrors.email = 'Invalid email format';
    }
    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if(accountType === ""){
      newErrors.userType = 'You must select an account type';
    }

    setErrors(newErrors);

    if(Object.keys(newErrors).length === 0){
      return false;
    }
    else{
      return true;
    }
  }

  function setNewMessage(message, type){
    var newMessage = {}
    newMessage.text = message
    newMessage.type = type
    setMessage(newMessage);
  }

  function isValidEmail(email) {
    // Regular expression for validating email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  return (
    <>
    <div className="register-page">
      {Object.keys(message).length !== 0 && 
      <PopUp buttonText='Close' close={setMessage} redirectTo={'/login'}>{message}</PopUp>
      }
      <div className='form-container'>
        <h1>Register</h1>
        <div className='select-container'>
          <label>User type</label>
          <ClassicInput type='select' placeholder='Select account type' options={["Enterprise", "Investor"]} onChange={setAccountType} errorMessage={errors.userType}/>
        </div>
        <ModernInput type="text" color="white" onChange={setEmail} errorMessage={errors.email} value={email}>Email</ModernInput>
        <ModernInput type="password" color="white" onChange={setPassword} errorMessage={errors.password} value={password}>Password</ModernInput>
        <ModernInput type="password" color="white" onChange={setConfirmPassword} errorMessage={errors.confirmPassword} value={confirmPassword}>Repeat Password</ModernInput>
        <button className='button' onClick={onSubmit} disabled={loading}>Register</button>
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