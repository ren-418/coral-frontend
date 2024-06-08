import React, { useEffect, useState } from 'react'
import './InvestorProfile.scss'
import ProfileImage from '../../../../../../imgs/global/default-pp.png'
import { FaLocationDot } from 'react-icons/fa6';
import HorizontalSlider from '../../../../../../components/horizontal slider/HorizontalSlider';
import { FaUserEdit } from "react-icons/fa";
import EnterpriseCard from '../../../../../../components/enterprise card/EnterpriseCard';

import Shark from '../../../../../../imgs/global/shark.png'
import Whale from '../../../../../../imgs/global/whale.png'
import Fish from '../../../../../../imgs/global/fish.png'
import Shrimp from '../../../../../../imgs/global/shrimp.png'

function InvestorProfile({edit, logout, deleteUser, setPage}) {

    const [investorData, setInvestorData] = useState({
        profilePicture: "",
        name: "",
        location: "",
        description: "",
        areas: [],
        enterprises: [],
        investorType: "",
        investmentCriteria: "",
        rangeMin: 0,
        rangeMax: 0,
    })

    const [investorTypeImg, setInvestorTypeImg] = useState('')

    useEffect(() => {
        fetchEnterpriseData()
    }, [])

    const fetchEnterpriseData = async () => {
        try {
            const res = await fetch('http://localhost:9090/api/v1/auth/check-user', {
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
                setInvestorData(resJson);
                if(resJson.investorType === 0){
                    setInvestorTypeImg(Shark)
                  }else if(resJson.investorType === 1){
                    setInvestorTypeImg(Whale)
                  }else if(resJson.investorType === 2){
                    setInvestorTypeImg(Fish)
                  }else if(resJson.investorType === 3){
                    setInvestorTypeImg(Shrimp)
                  }
            }
            else{
            }
        } catch (error) {
        }
    }

  return (
    <div className='investor-profile-page'>
        <div className="banner">
            <button className='edit-btn' onClick={edit}><FaUserEdit/></button>
            <button className='logout-btn' onClick={logout}>Logout</button>
            <div className='container'>
                <img src={investorData.profilePicture !== "" ? investorData.profilePicture : ProfileImage} className='profile-picture' alt="profile picture enterprise"/>
            </div>
            <div className="type-conatiner">
                <img src={investorTypeImg} />
            </div>
        </div>
        <div className='investor-data'>
            <h1>{investorData.name}</h1>
            <div className='location'>
                <FaLocationDot color='rgba(0, 0, 0, 0.548)'/>
                <h6>{investorData.location.charAt(0).toUpperCase() + investorData.location.slice(1)}</h6>
            </div>
            <div className="areas">
                {investorData.areas.map((area, index) => (
                  <div key={index} className='area'>{area}</div>
                ))}
            </div>
            <h4>About Me</h4>
            <div className="investor-description">
                <p>{investorData.description}</p>
            </div>
            <h4>Investment Criteria</h4>
            <div className="investor-description">
                <p>{investorData.investmentCriteria}</p>
            </div>
            {(investorData.enterprises.length !== 0 && investorData.enterprises !== null) && <h4>My Investments</h4>}
                <HorizontalSlider>
                    {investorData.enterprises.map((enterprise, index) => (
                        <div className="card" key={index}>
                            <EnterpriseCard key={index} enterpriseData={enterprise} setPage={setPage}/>
                        </div>
                    ))}
                </HorizontalSlider>
        </div>
        <button className="delete-btn" onClick={deleteUser}>Delete Account</button>
    </div>
  )
}

export default InvestorProfile