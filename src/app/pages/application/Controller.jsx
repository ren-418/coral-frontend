import Home from './home/Home'
import React, { useState, useEffect } from 'react'
import Template from '../../templates/app template/template'
import { Link, useNavigate } from 'react-router-dom';
import Profile from './profile/Profile';
import Search from './search/Search';
import EnterpriseProfileInvestor from './enterprise profile as investor/EnterpriseProfileInvestor';
import Invest from './invest page/Invest';
import CreateInvestor from '../create investor/CreateInvestor';
import CreateEnterprise from '../create enterprise/CreateEnterprise';
import routes from '../../../data/routes.json';

function Controller() {

    const [page, setPage] = useState(routes.home)
    const [user, setUser] = useState({})
    const [userId, setUserId] = useState()
    const [prevPage, setPrevPage] = useState(routes.home)

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
        {page === routes.home && <Template selected={page} setPage={setPage} userType={user.userType}><Home setPage={setPage} userType={user.userType} setUserId={setUserId} setPrevPage={setPrevPage}/></Template>}
        {page === routes.search && <Template selected={page} setPage={setPage} userType={user.userType}>{<Search setUserId={setUserId} setPage={setPage} setPrevPage={setPrevPage}/>}</Template>}
        {page === routes.add && <Template selected={page} setPage={setPage} userType={user.userType}></Template>}
        {page === routes.messages && <Template selected={page} setPage={setPage} userType={user.userType}></Template>}
        {page === routes.news && <Template selected={page} setPage={setPage} userType={user.userType}></Template>}
        {page === routes.enterpriseAsInvestor && <Template selected={page} setPage={setPage} userType={user.userType}><EnterpriseProfileInvestor enterpriseId={userId} setPage={setPage} prevPage={prevPage}/></Template>}
        {page === routes.invest && <Template selected={page} setPage={setPage} userType={user.userType}><Invest enterpriseId={userId} setPage={setPage}/></Template>}
        {page === routes.profile && <Template selected={page} setPage={setPage} userType={user.userType}><Profile setPage={setPage} userType={user.userType}/></Template>}
        {page === routes.editInvestor && <Template selected={routes.profile} setPage={setPage} userType={user.userType}><CreateInvestor nameP={user.name} aboutMeP={user.description} invCriteriaP={user.investmentCriteria} countryP={user.location} invMinP={user.rangeMin} invMaxP={user.rangeMax} investorTypeP={user.investorType} areaListP={user.areas} imageBlobP={user.profilePicture} firstLogin={user.firstLogin}/></Template>}
        {page === routes.editEnterprise && <Template selected={routes.profile} setPage={setPage} userType={user.userType}><CreateEnterprise/></Template>}
    </>
  )
}

export default Controller