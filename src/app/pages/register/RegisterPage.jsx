import React from 'react'
import { useState } from 'react';
import './RegisterPage.scss'
import { Link } from 'react-router-dom';
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
    
        if (!res.ok) {
          const error = await res.text();
          setNewMessage(error, "error")
          //handleError(error);
        } else {
          setNewMessage("Your account has been created", "success")
          setEmail("");
          setAccountType("");
          setPassword("");
          setConfirmPassword("");
        }
      } catch (error) {
        console.error(error);
        setNewMessage("An error has ocurred, please verify your connection", "error")
      }
    }
    setLoading(false);
  };

   function hasErrors(){
    var newErrors = {};
    if (isValidEmail(email) === false){
      newErrors.email = 'Email inválido';
    }
    if (password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    if(accountType === ""){
      newErrors.userType = 'Debes seleccionar un tipo de cuenta';
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

  const handleError = (error) => {

  }

  return (
    <>
    <div className="register-page">
      {Object.keys(message).length !== 0 && 
      <PopUp buttonText='Close' close={setMessage} to={'/login'}>{message}</PopUp>
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