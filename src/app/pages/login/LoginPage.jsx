import React, { useState, useEffect } from 'react'
import './LoginPage.scss'
import { Link, useNavigate } from 'react-router-dom';
import ModernInput from '../../../components/modern inputs/ModernInput';
import PopUp from '../../../components/popup/PopUp';


function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const sessionToken = localStorage.getItem('sessionToken');
    
    if(sessionToken){
      checkUser(sessionToken);
    }

  }, []);

  const onSubmit = async () => {

    setLoading(true);

    try {
      const res = await fetch('http://localhost:9090/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });

      const resMessage = await res.text();
  
      if (!res.ok) {
        setNewMessage(resMessage, "error");
      } else {
        setEmail("");
        setPassword("");
        //Redirect to home and save user id in local storage
        localStorage.setItem('sessionToken', resMessage);
        navigate('/');
      }
      setLoading(false);
    } catch (error) {
      setNewMessage("An error has occurred, please verify your connection", "error")
      setLoading(false);
    }
  };

  function setNewMessage(message, type){
    var newMessage = {}
    newMessage.text = message
    newMessage.type = type
    setMessage(newMessage);
  }

  const checkUser = async (sessionToken) => {
    try {
      const res = await fetch('http://localhost:9090/api/v1/auth/check-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionToken: sessionToken,
        }),
      });
  
      if(!res.ok){
        localStorage.removeItem('sessionToken');
      }
      else{ 
        navigate('/');
      }

    } catch (error) {
      setNewMessage("An error has occurred, please verify your connection", "error")
    }
  }

  return (
    <>
    <div className="login-page">
      {Object.keys(message).length !== 0 && 
        <PopUp buttonText='Close' close={setMessage}>{message}</PopUp>
      }
      <div className='form-container'>
        <h1>Login</h1>
        <ModernInput type="text" color="white" onChange={setEmail} value={email}>Email</ModernInput>
        <ModernInput type="password" color="white" onChange={setPassword} value={password}>Password</ModernInput>
        <button className='button' onClick={onSubmit} disabled={loading}>Login</button>
      </div>
      <div className='register'>
        <p>Don't have an account?</p>
        <Link to="/register">Register here</Link>
      </div>
    </div>
    </>
  )
}

export default LoginPage