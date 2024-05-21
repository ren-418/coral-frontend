import React from 'react'
import './InvestorCard.scss'
import { FaLocationDot } from "react-icons/fa6";

import Shark from '../../imgs/global/shark.png'
import Whale from '../../imgs/global/whale.png'
import Fish from '../../imgs/global/fish.png'
import Shrimp from '../../imgs/global/shrimp.png'

function InvestorCard({investorData, setUserId}) {
  const checkInvestorType = () => {
    switch(investorData.investorType){
      case 0:
        return Shark
      case 1:
        return Whale
      case 2:
        return Fish;
      case 3:
        return Shrimp;
      default:
        return '';
    }
  }
  return (
    <div className='investor-card'>
        <div className='col1'>
            <img src={investorData.profilePicture} alt="pfp"/>
            <p>Areas of interest</p>
            <div className='areas-container'>
              {investorData.areas.map((area, index) => (
                  <div key={index} className='area'>{area}</div>
              ))}
            </div>
        </div>
        <div className='col2'>
            <h2>{investorData.name[0].toUpperCase() + investorData.name.slice(1)}</h2>
            <p className='description'>{investorData.description}</p>
            <div className='location-container'>
              <FaLocationDot color='rgba(0, 0, 0, 0.548)'/>
              <p className='location'>{investorData.location[0].toUpperCase() + investorData.location.slice(1)}</p>
            </div>
            <button>View profile</button>
        </div>
        <img className='investor-type' src={checkInvestorType()}/>
    </div>
  )
}

export default InvestorCard