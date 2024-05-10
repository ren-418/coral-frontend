import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import InvestorCard from '../../../components/investor card/InvestorCard';
import EnterpriseCard from '../../../components/enterprise card/EnterpriseCard';
import './Home.scss'
import HorizontalSlider from '../../../components/horizontal slider/HorizontalSlider';

function Home({userType, setPage, setEnterpriseId}) {
  const [response, setResponse] = useState({});

  useEffect(() => {
    onLoad();
  }, [userType]);

  const onLoad = async () => {
    let userPath = ""
    if(userType === 'InvestorUser'){
      userPath ="recommended-enterprises"
    }
    if(userType === 'EnterpriseUser')
    {
      userPath = "recommended-investors"
    }

    if(userPath === "") return;
    try{
        const res = await fetch('http://localhost:9090/api/v1/feed/'+userPath, {
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
          setResponse(resJson);
        }
    }catch(error){
    }
}
  return (
    <div className='home-container'>
      {userType === "InvestorUser" && 
      <>
      <h2>With your interest areas</h2>
      <div className='same-areas-investors'>
        <HorizontalSlider>
          {Object.keys(response).length !== 0 && response["sameAreas"].map((user, index) => (
            <div className="card" key={index}>
            <EnterpriseCard setEnterpriseId={setEnterpriseId} setPage={setPage} key={index} name={user.name} location={user.location} id={user.userId} description={user.description} image={user.profileImage} goal={user.goal} current={2000} minimum={user.minimumInvestment}/>
            </div>
          ))}
        </HorizontalSlider>
      </div>
      <h2>In your location</h2>
      <div className='same-location-investors'>
        <HorizontalSlider>
            {Object.keys(response).length !== 0 && response["sameLocation"].map((user, index) => (
              <div className="card" key={index}>
              <EnterpriseCard setEnterpriseId={setEnterpriseId} setPage={setPage} key={index} name={user.name} location={user.location} id={user.userId} description={user.description} image={user.profileImage} goal={user.goal} current={2000} minimum={user.minimumInvestment}/>
              </div>
            ))}
        </HorizontalSlider>
      </div>
      </>
    }
      
    </div>
  )
}

export default Home