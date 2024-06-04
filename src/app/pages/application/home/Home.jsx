import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import InvestorCard from '../../../../components/investor card/InvestorCard';
import EnterpriseCard from '../../../../components/enterprise card/EnterpriseCard';
import './Home.scss'
import HorizontalSlider from '../../../../components/horizontal slider/HorizontalSlider';
import routes from '../../../../data/routes.json'

function Home({userType, setPage, setUserId, setPrevPage}) {
  const [response, setResponse] = useState({
    sameAreas: [],
    sameLocation: []
  });

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
        }
    }catch(error){
    }
}
  return (
    <div className='home-container'>
      {userType === "InvestorUser" && 
      <>
      {Object.keys(response["sameAreas"]).length !== 0 && <h2>With your interest areas</h2>}
        <HorizontalSlider>
        {Object.keys(response["sameAreas"]).length !== 0 && response["sameAreas"].map((user, index) => (
            <div className="card" key={index}>
            <EnterpriseCard setUserId={setUserId} setPage={setPage} key={index} enterpriseData={user}/>
            </div>
          ))}
        </HorizontalSlider>
        {Object.keys(response["sameLocation"]).length !== 0 && <h2>In your location</h2>}
        <HorizontalSlider>
            {Object.keys(response["sameLocation"]).length !== 0 && response["sameLocation"].map((user, index) => (
              <div className="card" key={index}>
                <EnterpriseCard setUserId={setUserId} setPage={setPage} key={index} enterpriseData={user}/>
              </div>
            ))}
        </HorizontalSlider>
      </>
    }
    {userType === "EnterpriseUser" &&
      <>
      {Object.keys(response["sameAreas"]).length !== 0 && <h2>With your interest areas</h2>}
        <HorizontalSlider>
        {Object.keys(response["sameAreas"]).length !== 0 && response["sameAreas"].map((user, index) => (
            <div className="card" key={index}>
            <InvestorCard setUserId={setUserId} setPage={setPage} key={index} investorData={user}/>
            </div>
          ))}
        </HorizontalSlider>
        {Object.keys(response["sameLocation"]).length !== 0 && <h2>In your location</h2>}
        <HorizontalSlider>
            {Object.keys(response["sameLocation"]).length !== 0 && response["sameLocation"].map((user, index) => (
              <div className="card" key={index}>
                <InvestorCard setUserId={setUserId} setPage={setPage} key={index} investorData={user}/>
              </div>
            ))}
        </HorizontalSlider>
      </>
    }
      
    </div>
  )
}

export default Home