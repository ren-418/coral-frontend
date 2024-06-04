import React, { useEffect, useState } from 'react'
import './EnterpriseProfile.scss'
import ProfileImage from '../../../../../../imgs/global/default-pp.png'
import ProgressBar from '@ramonak/react-progress-bar'
import { FaLocationDot } from 'react-icons/fa6';
import InvestorCard from '../../../../../../components/investor card/InvestorCard'
import HorizontalSlider from '../../../../../../components/horizontal slider/HorizontalSlider';
import { FaUserEdit } from "react-icons/fa";

function EnterpriseProfile({edit, logout, deleteUser}) {

    const [enterpriseData, setEnterpriseData] = useState({
        profileImage: "",
        name: "",
        location: "",
        description: "",
        goal: 0,
        current: "",
        minimumInvestment: "",
        areas: ["a"],
        investors: [],
        totalCollected: 0,
        enterpriseType: ""
    })

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
                setEnterpriseData(resJson);
            }
            else{
            }
        } catch (error) {
        }
    }

  return (
    <div className='enterprise-profile-page'>
        <div className="banner">
            <button className='edit-btn' onClick={edit}><FaUserEdit/></button>
            <button className='logout-btn' onClick={logout}>Logout</button>
            <div className='container'>
                <img src={enterpriseData.profileImage !== "" ? enterpriseData.profileImage : ProfileImage} className='profile-picture' alt="profile picture enterprise"/>
            </div>
        </div>
        <div className='enterprise-data'>
            <h1>{enterpriseData.name}</h1>
            <div className='location'>
                <FaLocationDot color='rgba(0, 0, 0, 0.548)'/>
                <h6>{enterpriseData.location.charAt(0).toUpperCase() + enterpriseData.location.slice(1)}</h6>
            </div>
            <div className="areas">
                {enterpriseData.areas.map((area, index) => (
                  <div key={index} className='area'>{area}</div>
                ))}
            </div>
           {enterpriseData.enterpriseType == "Community" && <div className='progress-bar'>
                <ProgressBar completed={Math.round((enterpriseData.totalCollected/enterpriseData.goal)*100)} bgColor="#ED4E67" width={'100%'}/>
                <div className='numbers'>
                    <p>US$ 0</p>
                    <p>US$ {enterpriseData.goal}</p>
                </div>
            </div>}
            <h4>Description</h4>
            <div className="enterprise-description">
                <p>{enterpriseData.description}</p>
            </div>
            {enterpriseData.investors != null || enterpriseData.investors.lenght != 0 && <h4>My Investors</h4>}
                <HorizontalSlider>
                    {enterpriseData.investors.map((investor, index) => (
                        <div className="card" key={index}>
                            <InvestorCard key={index} investorData={investor}/>
                        </div>
                    ))}
                </HorizontalSlider>
        </div>
        <button className="delete-btn" onClick={deleteUser}>Delete Account</button>
    </div>
  )
}

export default EnterpriseProfile