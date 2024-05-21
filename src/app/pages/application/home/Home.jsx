import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import InvestorCard from '../../../../components/investor card/InvestorCard';
import EnterpriseCard from '../../../../components/enterprise card/EnterpriseCard';
import './Home.scss'
import HorizontalSlider from '../../../../components/horizontal slider/HorizontalSlider';
import routes from '../../../../data/routes.json'

function Home({userType, setPage, setEnterpriseId, setPrevPage}) {
  const [response, setResponse] = useState({});

  useEffect(() => {
    onLoad();
  }, [userType]);

  useEffect(() => {
    setPrevPage(routes.home)
  }, [])

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
          console.log(resJson)
        }
    }catch(error){
    }
}
  return (
    <div className='home-container'>
      {userType === "InvestorUser" && 
      <>
      <h2>With your interest areas</h2>
        <HorizontalSlider>
        {Object.keys(response).length !== 0 && response["sameAreas"].map((user, index) => (
            <div className="card" key={index}>
            <EnterpriseCard setEnterpriseId={setEnterpriseId} setPage={setPage} key={index} name={user.name} location={user.location} id={user.userId} description={user.description} image={user.profileImage} goal={user.goal} current={user.totalCollected} minimum={user.minimumInvestment}/>
            </div>
          ))}
        </HorizontalSlider>
      <h2>In your location</h2>
        <HorizontalSlider>
            {Object.keys(response).length !== 0 && response["sameLocation"].map((user, index) => (
              <div className="card" key={index}>
              <EnterpriseCard setEnterpriseId={setEnterpriseId} setPage={setPage} key={index} name={user.name} location={user.location} id={user.userId} description={user.description} image={user.profileImage} goal={user.goal} current={user.totalCollected} minimum={user.minimumInvestment}/>
              </div>
            ))}
        </HorizontalSlider>
      </>
    }
      
    </div>
  )
}

export default Home