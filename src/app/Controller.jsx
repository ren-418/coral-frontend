import Home from './pages/home/Home'
import LoginPage from './pages/login/LoginPage'
import React, { useState, useEffect } from 'react'
import Template from './templates/app template/template'
import { Link, useNavigate } from 'react-router-dom';

function Controller() {
    const routes = {
        home: 0,
        search: 1,
        add: 2,
        messages: 3,
        profile: 4,
        news: 5
    };

    const [page, setPage] = useState(routes.home)
    const [user, setUser] = useState({})


    const navigate = useNavigate();

  useEffect(() => {
    const userObj = JSON.parse(localStorage.getItem('user'));

    if(userObj){
        checkUserById(userObj.userId);
        setUser(userObj);
    }
    else{
        navigate('/login');
    }

  }, []);

  const checkUserById = async (userId) => {
    try {
      const res = await fetch('http://localhost:9090/api/v1/auth/check-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
        }),
      });
  
      if(!res.ok){
        localStorage.removeItem('user');
        navigate('/login');
      }
      else{ 
        navigate('/');
      }

    } catch (error) {
      navigate('/login');
    }
  }

  return (
    <>
        {page === routes.home && <Template selected={page} setPage={setPage} userType={user.userType}><Home setPage={setPage}/></Template>}
        {page === routes.search && <Template selected={page} setPage={setPage} userType={user.userType}><Home/></Template>}
        {page === routes.add && <Template selected={page} setPage={setPage} userType={user.userType}> <Home/></Template>}
        {page === routes.messages && <Template selected={page} setPage={setPage} userType={user.userType}><Home/></Template>}
        {page === routes.profile && <Template selected={page} setPage={setPage} userType={user.userType}><Home/></Template>}
        {page === routes.news && <Template selected={page} setPage={setPage} userType={user.userType}><Home/></Template>}
    </>
  )
}

export default Controller