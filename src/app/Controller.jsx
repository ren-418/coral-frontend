import Home from './pages/home/Home'
import SearchInvestors from './pages/search investors/SearchInvestors'
import React, { useState, useEffect } from 'react'
import Template from './templates/app template/template'
import { Link, useNavigate } from 'react-router-dom';
import Profile from './pages/profile/Profile';
import CreateInvestor from './pages/create investor/CreateInvestor';
import CreateEnterprise from './pages/create enterprise/CreateEnterprise';

function Controller() {
    const routes = {
        home: 0,
        search: 1,
        add: 2,
        messages: 3,
        profile: 4,
        news: 5,
        editInvestor: 6,
        editEnterprise: 7
    };

    const [page, setPage] = useState(routes.home)
    const [user, setUser] = useState({})

    const navigate = useNavigate();

  useEffect(() => {
    const sessionToken = localStorage.getItem('sessionToken');

    if(sessionToken){
        checkUser(sessionToken);
    }
    else{
        navigate('/login');
    }

  }, []);

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
        navigate('/login');
      }
      else{ 
        const user = await res.json();
        if(res.ok){
          setUser(user);
          console.log(user)

          if(user.firstLogin === true){
            if(user.userType === "InvestorUser"){
              navigate('/create-investor');
            }
            else{
              navigate('/create-enterprise');
            }
          }
          else{
            navigate('/');
          }
        }else{
          navigate('/login');
        }
      }

    } catch (error) {
      navigate('/login');
    }
  }

  return (
    <>
        {page === routes.home && <Template selected={page} setPage={setPage} userType={user.userType}><Home setPage={setPage} userType={user.userType}/></Template>}
        {page === routes.search && <Template selected={page} setPage={setPage} userType={user.userType}>{ user.userType === "InvestorUser" ? <SearchInvestors/> : <SearchInvestors/>}</Template>}
        {page === routes.add && <Template selected={page} setPage={setPage} userType={user.userType}> <Home/></Template>}
        {page === routes.messages && <Template selected={page} setPage={setPage} userType={user.userType}><Home/></Template>}
        {page === routes.profile && <Template selected={page} setPage={setPage} userType={user.userType}><Profile setPage={setPage} userType={user.userType}/></Template>}
        {page === routes.news && <Template selected={page} setPage={setPage} userType={user.userType}><Home/></Template>}
        {page === routes.editInvestor && <Template selected={routes.profile} setPage={setPage} userType={user.userType}><CreateInvestor nameP={user.name} aboutMeP={user.description} invCriteriaP={user.investmentCriteria} countryP={user.location} invMinP={user.rangeMin} invMaxP={user.rangeMax} investorTypeP={user.investorType} areaListP={user.areas} imageBlobP={user.profilePicture} firstLogin={user.firstLogin}/></Template>}
        {page === routes.editEnterprise && <Template selected={routes.profile} setPage={setPage} userType={user.userType}><CreateEnterprise/></Template>}
    </>
  )
}

export default Controller