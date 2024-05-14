import React, { useEffect } from 'react'
import Styles from './Profile.module.scss'
import { Link, useNavigate } from 'react-router-dom';


function Profile({setPage, userType}) {

  const navigate = useNavigate();

    let sessionToken
    
    useEffect(() => {
        sessionToken = localStorage.getItem('sessionToken');
    
        if(!sessionToken){
            window.location.reload();
        }
      }, []);

    const logout = async () => {
        try {
            const res = await fetch('http://localhost:9090/api/v1/auth/logout', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                sessionToken: sessionToken,
              }),
            });
      
            const resMessage = await res.text();
        
            if (res.ok) {
                localStorage.removeItem('sessionToken');
                window.location.reload();
            }
          } catch (error) {
          }
    }

    function edit(){
      if (userType === "InvestorUser"){
        setPage(6)
      } else {
        setPage(7)
      }
    }

    const deleteUser = async () => {
      try {
        const res = await fetch('http://localhost:9090/api/v1/auth/delete-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionToken: localStorage.getItem('sessionToken'),
          }),
        });
    
        if(res.ok){
          localStorage.removeItem('sessionToken');
          navigate('/login');
        }
        else{ 
          alert("error, couldnt delete user")
        }
      } catch (error) {
        alert("error, couldnt delete user");
      }
    }

  return (
    <div className={Styles["profile-page"]}>
        <button onClick={logout}>Log out</button>
        <button onClick={edit}>Edit</button>
        <button onClick={deleteUser}>Delete</button>
    </div>
  )
}

export default Profile