import Home from './home/Home'
import React, { useState, useEffect } from 'react'
import Template from '../../templates/app template/template'
import { Link, useNavigate } from 'react-router-dom';
import Profile from './profiles/Profile';
import Search from './search/Search';
import EnterpriseProfileInvestor from './profiles/other/enterprise/EnterpriseProfileInvestor';
import Invest from './invest page/Invest';
import CreateInvestor from '../create investor/CreateInvestor';
import CreateEnterprise from '../create enterprise/CreateEnterprise';
import routes from '../../../data/routes.json';
import Chats from './chats/Chats';
import Chat from './chats/chat/Chat';
import InvestorProfileEnterprise from './profiles/other/investor/InvestorProfileEnterprise';
import NewPost from './new post/NewPost';
import ReadNews from './read news/ReadNews';
import Notifications from './notifications/Notifications';

function Controller() {

    const [page, setPageState] = useState({page:0, userId: null})
    const [user, setUser] = useState({})
    const [pageHistory, setPageHistory] = useState([{page:0, userId: null}]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hasNotifications, setHasNotifications] = useState(false);

    const navigate = useNavigate();
    
    const setPage = (p, userId) => {
      const newPage = { page: p, userId: userId };
      const newHistory = pageHistory.slice(0, currentIndex + 1); // Eliminar el historial futuro
      setPageHistory([...newHistory, newPage]);
      setPageState(newPage);
      setCurrentIndex(newHistory.length);
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setPageState(pageHistory[currentIndex - 1]);
  }
  };

  const fetchHasNotificationsToRead = async () => {
    try{
        const res = await fetch('http://localhost:9090/api/v1/notifications/has-notifications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sessionToken: localStorage.getItem('sessionToken')
            }),
        });

        const resJson = await res.json();

        if(res.ok){
          setHasNotifications(resJson);
        }
    }catch(error){
    }
  };


  useEffect(() => {
    const sessionToken = localStorage.getItem('sessionToken');
    if(sessionToken){
        checkUser(sessionToken);
    }
    else{
        navigate('/login');
    }
    fetchHasNotificationsToRead()

  }, [page]);

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
        {page.page === routes.home && <Template hasNotificationsToRead={hasNotifications} selected={page.page} setPage={setPage} userType={user.userType}><Home setPage={setPage} userType={user.userType}/></Template>}
        {page.page === routes.search && <Template hasNotificationsToRead={hasNotifications} selected={page.page} setPage={setPage} userType={user.userType}>{<Search setPage={setPage}/>}</Template>}
        {page.page === routes.add && <Template hasNotificationsToRead={hasNotifications} selected={page.page} setPage={setPage} userType={user.userType}><NewPost/></Template>}
        {page.page === routes.messages && <Template hasNotificationsToRead={hasNotifications} selected={page.page} setPage={setPage} userType={user.userType}><Chats setPage={setPage}/></Template>}
        {page.page === routes.news && <Template hasNotificationsToRead={hasNotifications} selected={page.page} setPage={setPage} userType={user.userType}><ReadNews setPage={setPage}/></Template>}
        {page.page === routes.enterpriseAsInvestor && <Template hasNotificationsToRead={hasNotifications} selected={page.page} setPage={setPage} userType={user.userType}><EnterpriseProfileInvestor enterpriseId={page.userId} setPage={setPage} goBack={goBack} userType={user.userType}/></Template>}
        {page.page === routes.invest && <Template hasNotificationsToRead={hasNotifications} selected={page.page} setPage={setPage} userType={user.userType}><Invest enterpriseId={page.userId} setPage={setPage}/></Template>}
        {page.page === routes.profile && <Template hasNotificationsToRead={hasNotifications} selected={page.page} setPage={setPage} userType={user.userType}><Profile setPage={setPage} userType={user.userType}/></Template>}
        {page.page === routes.editInvestor && <Template hasNotificationsToRead={hasNotifications} selected={routes.profile} setPage={setPage} userType={user.userType}><CreateInvestor investorData={user} firstLogin={user.firstLogin} setPage={setPage} goBack={goBack}/></Template>}
        {page.page === routes.editEnterprise && <Template hasNotificationsToRead={hasNotifications} selected={routes.profile} setPage={setPage} userType={user.userType}><CreateEnterprise enterpriseData={user} firstLogin={user.firstLogin} setPage={setPage} goBack={goBack}/></Template>}
        {page.page === routes.chat && <Template hasNotificationsToRead={hasNotifications} selected={routes.messages} setPage={setPage} userType={user.userType}><Chat userId={page.userId} setPage={setPage} goBack={goBack}/></Template>}
        {page.page === routes.investorAsEnterprise && <Template hasNotificationsToRead={hasNotifications} selected={page.page} setPage={setPage} userType={user.userType}><InvestorProfileEnterprise  investorId={page.userId} setPage={setPage} goBack={goBack} userType={user.userType}/></Template>}
        {page.page === routes.notifications && <Template hasNotificationsToRead={hasNotifications} selected={page.page} setPage={setPage} userType={user.userType}><Notifications goBack={goBack} /></Template>}
    </>
  )
}

export default Controller