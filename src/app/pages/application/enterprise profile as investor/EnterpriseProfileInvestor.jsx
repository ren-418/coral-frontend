import React, { useEffect, useState } from 'react'
import './EnterpriseProfileInvestor.scss'
import ProfileImage from '../../../../imgs/global/default-pp.png'
import ProgressBar from '@ramonak/react-progress-bar'
import { BiSolidDollarCircle } from "react-icons/bi";
import { FaLocationDot } from 'react-icons/fa6';
import Invest from '../invest page/Invest'

function EnterpriseProfileInvestor({enterpriseId, prevPage, setPage}) {

    const [openPopUp, setOpenPopUp] = useState(false)

    const [enterpriseData, setEnterpriseData] = useState({
        profileImage: "",
        name: "",
        location: "",
        description: "",
        goal: "",
        current: "",
        minimumInvestment: "",
        areas: []
    })

    useEffect(() => {
        fetchEnterpriseData()
    }, [])

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
                console.log("Error")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const goBack = () => {
        setPage(prevPage)
    }

  return (
    <div className='enterprise-as-investor-page'>
        {openPopUp === true && <Invest setOpenPopUp={setOpenPopUp} enterpriseData={enterpriseData} setPage={setPage}/>}
        <div className="banner">
            <a className='back-button' onClick={goBack}>{'< Back'}</a>
            <div className='container'>
                <img src={enterpriseData.profileImage !== "" ? enterpriseData.profileImage : ProfileImage} className='profile-picture' alt="profile picture enterprise"/>
                <button className='invest-button' onClick={() => {setOpenPopUp(true)}}>Invest <BiSolidDollarCircle size={25}/> </button>
            </div>
        </div>
        <div className='enterprise-data'>
            <h1>{enterpriseData.name}</h1>
            <div className='location'>
                <FaLocationDot color='rgba(0, 0, 0, 0.548)'/>
                <h6>{enterpriseData.location.charAt(0).toUpperCase() + enterpriseData.location.slice(1)}</h6>
            </div>
            <div className='progress-bar'>
                <ProgressBar completed={Math.round((enterpriseData.totalCollected/enterpriseData.goal)*100)} bgColor="#ED4E67" width={'100%'}/>
                <div className='numbers'>
                    <p>US$ 0</p>
                    <p>US$ {enterpriseData.goal}</p>
                </div>
            </div>
            <h4>Description</h4>
            <div className="description">
                <p>{enterpriseData.description}</p>
            </div>
        </div>
    </div>
  )
}

export default EnterpriseProfileInvestor