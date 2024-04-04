import React from 'react'
import { useState } from 'react';
import './RegisterPage.scss'
import { Link } from 'react-router-dom';
import ModernInput from '../../../components/modern inputs/ModernInput';
import ClassicInput from '../../../components/classic input/ClassicInput';

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [accountType, setAccountType] = useState("");

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    userType: ''
  });


  /*const onSubmit = async () => {
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8080/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });

      setLoading(false);

      if (!res.ok) {
        const error = await res.text();
        handleError(error);
      } else {
        const message = await res.text();
        console.log(message);
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };*/

  function test(){
    const newErrors = {};
    if (!email.includes('@')) {
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
  }

  return (
    <>
    <div className="register-page">
      <div className='pink-background'></div>
      <h1>Register</h1>
      <div className='form-container'>
        <div className='check-container'>
          <label>User type</label>
          <ClassicInput type='select' placeholder='Select account type' options={["Enterprise", "Investor"]} onChange={setAccountType} errorMessage={errors.userType}/>
        </div>
        <ModernInput type="text" color="white" onChange={setEmail} errorMessage={errors.email}>Email</ModernInput>
        <ModernInput type="password" color="white" onChange={setPassword} errorMessage={errors.password}>Password</ModernInput>
        <ModernInput type="password" color="white" onChange={setConfirmPassword} errorMessage={errors.confirmPassword}>Repeat Password</ModernInput>
        <button className='button' onClick={test}>Register</button>
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