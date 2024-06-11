import React, { useEffect, useState } from 'react'
import './InvestorProfileEnterprise.scss'
import ProfileImage from '../../../../../../imgs/global/default-pp.png'
import { FaLocationDot } from 'react-icons/fa6';
import HorizontalSlider from '../../../../../../components/horizontal slider/HorizontalSlider';
import EnterpriseCard from '../../../../../../components/enterprise card/EnterpriseCard';
import { AiFillMessage } from "react-icons/ai";

import Shark from '../../../../../../imgs/global/shark.png'
import Whale from '../../../../../../imgs/global/whale.png'
import Fish from '../../../../../../imgs/global/fish.png'
import Shrimp from '../../../../../../imgs/global/shrimp.png'

import routes from '../../../../../../data/routes.json'
import {BiSolidCircle, BiSolidDollarCircle} from "react-icons/bi";
import Invest from "../../../invest page/Invest";
import PopUp from "../../../../../../components/popup/PopUp";

function InvestorProfileEnterprise({investorId, setPage, goBack, userType}) {
    const [openPopUp, setOpenPopUp] = useState(false)
    const [message, setMessage] = useState({});
    const [isFollowing, setIsFollowing] = useState(false);

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
        fetchInvestorData()
    }, [])

    const fetchInvestorData = async () => {
        try {
            const res = await fetch('http://localhost:9090/api/v1/users/investor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionToken: localStorage.getItem('sessionToken'),
                    userId: investorId
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

    const chat = () => {
        setPage(routes.chat, investorId)
    }

    const follow = async () => {
        try {
            const res = await fetch('http://localhost:9090/api/v1/users/follow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionToken: localStorage.getItem('sessionToken'),
                    investorId: investorId
                }),
            });

            const resMessage = await res.text();

            if(res.ok){
                setMessage({
                    text:resMessage,
                    type: "success"
                })
            }
            else{
                setMessage({
                    text:resMessage,
                    type: "error"
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    const unfollow = async () => {
        try {
            const res = await fetch('http://localhost:9090/api/v1/users/unfollow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionToken: localStorage.getItem('sessionToken'),
                    investorId: investorId
                }),
            });

            const resMessage = await res.text();

            if(res.ok){
                setMessage({
                    text:resMessage,
                    type: "success"
                })
            }
            else{
                setMessage({
                    text:resMessage,
                    type: "error"
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    const fetchIsFollowing = async () => {
        try {
            const res = await fetch('http://localhost:9090/api/v1/users/is-following', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionToken: localStorage.getItem('sessionToken'),
                    investorId: investorId
                }),
            });

            const resMessage = await res.text();

            if(res.ok){
                console.log(resMessage)
                setIsFollowing(true)
            }
            else {
                console.log(resMessage)
                setIsFollowing(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchIsFollowing()
    }, [message])
  return (
    <div className='investor-as-enterprise-page'>
        {Object.keys(message).length !== 0 &&
        <PopUp buttonText={"OK"} close={setMessage}>{message}</PopUp>
        }
        <div className="banner">
            <a className='back-button' onClick={goBack}>{'< Back'}</a>
            <div className='container'>
                <img src={investorData.profilePicture !== "" ? investorData.profilePicture : ProfileImage} className='profile-picture' alt="profile picture enterprise"/>
                {userType === "InvestorUser" && <button style={isFollowing ? {backgroundColor:"#09495D"} : {backgroundColor:"#66B9BF"}} className='invest-button' onClick={isFollowing ? unfollow : follow}>{isFollowing ? "Unfollow" : "Follow"} </button>}
            </div>
            <div className="type-conatiner">
                <img src={investorTypeImg} />
            </div>
            {userType === "EnterpriseUser" && <button className='chat-button' onClick={chat}><AiFillMessage color='rgba(255, 255, 255, 0.8)'/></button>}
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
            {(investorData.enterprises !== null && investorData.enterprises.length !== 0) && <h4>Investments</h4>}
                <HorizontalSlider>
                    {investorData.enterprises.map((enterprise, index) => (
                        <div className="card" key={index}>
                            <EnterpriseCard key={index} enterpriseData={enterprise} setPage={setPage}/>
                        </div>
                    ))}
                </HorizontalSlider>
        </div>
    </div>
  )
}

export default InvestorProfileEnterprise