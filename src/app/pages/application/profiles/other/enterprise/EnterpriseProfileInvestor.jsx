import React, { useEffect, useState } from 'react'
import './EnterpriseProfileInvestor.scss'
import ProfileImage from '../../../../../../imgs/global/default-pp.png'
import ProgressBar from '@ramonak/react-progress-bar'
import { BiSolidDollarCircle } from "react-icons/bi";
import { FaLocationDot } from 'react-icons/fa6';
import Invest from '../../../../application/invest page/Invest'
import InvestorCard from '../../../../../../components/investor card/InvestorCard'
import HorizontalSlider from '../../../../../../components/horizontal slider/HorizontalSlider';
import { AiFillMessage } from "react-icons/ai";
import routes from '../../../../../../data/routes.json'

function EnterpriseProfileInvestor({enterpriseId, setPage, goBack, userType}) {

    const [openPopUp, setOpenPopUp] = useState(false)

    const [enterpriseData, setEnterpriseData] = useState({
        profileImage: "",
        name: "",
        location: "",
        description: "",
        goal: "",
        current: "",
        minimumInvestment: "",
        areas: [],
        investors: []
    })

    useEffect(() => {
        if(openPopUp === false){
            console.log('fetching data')
            fetchEnterpriseData()
        }
    }, [openPopUp])

    const fetchEnterpriseData = async () => {
        try {
            const res = await fetch('http://localhost:9090/api/v1/users/enterprise', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionToken: localStorage.getItem('sessionToken'),
                    userId: enterpriseId
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

    const chat = () => {
        setPage(routes.chat, enterpriseId)
    }

  return (
    <div className='enterprise-as-investor-page'>
        {openPopUp === true && <Invest setOpenPopUp={setOpenPopUp} enterpriseData={enterpriseData} setPage={setPage}/>}
        <div className="banner">
            <a className='back-button' onClick={goBack}>{'< Back'}</a>
            <div className='container'>
                <img src={enterpriseData.profileImage !== "" ? enterpriseData.profileImage : ProfileImage} className='profile-picture' alt="profile picture enterprise"/>
                {(userType === "InvestorUser" && enterpriseData.goal !== enterpriseData.totalCollected) && <button className='invest-button' onClick={() => {setOpenPopUp(true)}}>Invest <BiSolidDollarCircle size={25}/> </button>}
            </div>
            {userType === "InvestorUser" && <button className='chat-button' onClick={chat}><AiFillMessage color='rgba(255, 255, 255, 0.8)'/></button>}
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
            {(enterpriseData.investors !== null && enterpriseData.investors.length !== 0) && <h4>Investors</h4>}
                <HorizontalSlider>
                    {enterpriseData.investors.map((investor, index) => (
                        <div className="card" key={index}>
                            <InvestorCard key={index} investorData={investor} setPage={setPage}/>
                        </div>
                    ))}
                </HorizontalSlider>
        </div>
    </div>
  )
}

export default EnterpriseProfileInvestor