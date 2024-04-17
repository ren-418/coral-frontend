import React, {useState} from 'react'
import './ForgotPassword.scss'
import ModernInput from '../../../components/modern inputs/ModernInput';
import PopUp from '../../../components/popup/PopUp';
import { Link, useNavigate } from 'react-router-dom';


function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [emailSend, setEmailSend] = useState(true);
    const [correctCode, setCorrectCode] = useState(true);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({});
    const [errors, setErrors] = useState({
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();


    const sendEmail = async () => {
        setLoading(true);

        try {
            const res = await fetch('http://localhost:9090/api/v1/auth/reset-password/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                }),
            });

            const resMessage = await res.text();

            if (!res.ok) {
                setNewMessage(resMessage, "error");
            } else {
                setNewMessage(resMessage, "success");
                setEmailSend(true);
            }
            setLoading(false);
        } catch (error) {
            setNewMessage("An error has occurred, please verify your connection", "error")
            setLoading(false);
        }
    }

    const sendCode = async () => {
        setLoading(true);

        try {
            const res = await fetch('http://localhost:9090/api/v1/auth/reset-password/send-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    code: code,
                }),
            });

            const resMessage = await res.text();

            if (!res.ok) {
                setNewMessage(resMessage, "error");
            } else {
                setNewMessage(resMessage, "success");
                setCorrectCode(true);
            }
            setLoading(false);
        } catch (error) {
            setNewMessage("An error has occurred, please verify your connection", "error")
            setLoading(false);
        }
    }

    const sendPassword = async () => {
        
        if(!hasErrors()){
            setLoading(true);
            try {
                const res = await fetch('http://localhost:9090/api/v1/auth/reset-password/send-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        code: code,
                        password: password,
                    }),
                });

                const resMessage = await res.text();

                if (!res.ok) {
                    setNewMessage(resMessage, "error");
                } else {
                    setNewMessage(resMessage, "success");
                    navigate('/login')
                }
                setLoading(false);
            } catch (error) {
                setNewMessage("An error has occurred, please verify your connection", "error")
                setLoading(false);
            }
        }
    }

    function setNewMessage(message, type){
        var newMessage = {}
        newMessage.text = message
        newMessage.type = type
        setMessage(newMessage);
    }

    function hasErrors(){
        let newErrors = {}
        if(password !== confirmPassword){
            newErrors.confirmPassword = "Passwords do not match"
        }
        if(password.length < 8){
            newErrors.password = "Password must be at least 8 characters long"
        }
        setErrors(newErrors);
        return newErrors.password || newErrors.confirmPassword;
    }


  return (
    <div className='forgot-page'>
        {Object.keys(message).length > 0 && <PopUp buttonText='Close' close={setMessage}>{message}</PopUp>}
        <button className='back-button' onClick={()=>{navigate('/login')}}>{'< Back'}</button>
        <div className='form-container'>
            <h1>Reset Password</h1>
            <ModernInput type="email" color="white" onChange={setEmail} value={email} disabled={emailSend}>Email</ModernInput>
            {emailSend && <ModernInput type="number" color="white" onChange={setCode} value={password} disabled={correctCode}>Code</ModernInput>}
            {correctCode && <>
                <ModernInput type="password" color="white" onChange={setPassword} value={password} errorMessage={errors.password}>New password</ModernInput>
                <ModernInput type="password" color="white" onChange={setConfirmPassword} value={confirmPassword} errorMessage={errors.confirmPassword}>Repeat new password</ModernInput>
            </>}
            {!emailSend && !correctCode ?
                <button className='button' disabled={loading} onClick={sendEmail}>Send code</button>
            : emailSend && !correctCode ?
                <button className='button' disabled={loading} onClick={sendCode}>Confirm code</button>
            : <button className='button' disabled={loading} onClick={sendPassword}>Change Password</button>}
        </div>
    </div>
  )
}

export default ForgotPassword