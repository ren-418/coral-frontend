import React, { useEffect } from 'react'
import Styles from './Profile.module.scss'
import { Link, useNavigate } from 'react-router-dom';
import EnterpriseProfile from './own/enterprise/EnterpriseProfile';
import routes from '../../../../data/routes.json'
import InvestorProfile from './own/investor/InvestorProfile';

function Profile({setPage, userType}) {

  const navigate = useNavigate();
    
    useEffect(() => {
        const sessionToken = localStorage.getItem('sessionToken');
    
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
                sessionToken: localStorage.getItem('sessionToken'),
              }),
            });
              
            if (res.ok) {
                localStorage.removeItem('sessionToken');
                window.location.reload();
            }
          } catch (error) {
          }
    }

    function edit(){
      if (userType === "InvestorUser"){
        setPage(routes.editInvestor)
      } else {
        setPage(routes.editEnterprise)
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
        {userType === "EnterpriseUser" && <EnterpriseProfile edit={edit} logout={logout} deleteUser={deleteUser} setPage={setPage}/>}
        {userType === "InvestorUser" && <InvestorProfile edit={edit} logout={logout} deleteUser={deleteUser} setPage={setPage}/>}
    </div>
  )
}

export default Profile