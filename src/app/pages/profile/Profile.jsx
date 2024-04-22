import React, { useEffect } from 'react'
import Styles from './Profile.module.scss'

function Profile({}) {

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

  return (
    <div className={Styles["profile-page"]}>
        <button onClick={logout}>Log out</button>
    </div>
  )
}

export default Profile