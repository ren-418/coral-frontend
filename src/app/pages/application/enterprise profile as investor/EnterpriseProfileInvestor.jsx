import React, { useEffect, useState } from 'react'
import './EnterpriseProfileInvestor.scss'
import ProfileImage from '../../../../imgs/global/default-pp.png'
import ProgressBar from '@ramonak/react-progress-bar'
import { BiSolidDollarCircle } from "react-icons/bi";
import { FaLocationDot } from 'react-icons/fa6';
import Invest from '../invest page/Invest'

function EnterpriseProfileInvestor({enterpriseId, setPage, nextPage}) {

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
            const res = await fetch('http://localhost:9090/api/v1/users/enterprise/' + enterpriseId, {
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
                console.log("Error")
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='enterprise-as-investor-page'>
        {openPopUp === true && <Invest setOpenPopUp={setOpenPopUp} enterpriseData={enterpriseData}/>}
        <div className="banner">
            <div className='container'>
                <img src={ProfileImage} className='profile-picture' alt="profile picture enterprise"/>
                <button className='invest-button' onClick={() => {setOpenPopUp(true)}}>Invest <BiSolidDollarCircle size={25}/> </button>
            </div>
        </div>
        <div className='enterprise-data'>
            <h1>Microsoft</h1>
            <div className='location'>
                <FaLocationDot color='rgba(0, 0, 0, 0.548)'/>
                <h6>Canada</h6>
            </div>
            <div className='progress-bar'>
                <ProgressBar completed={Math.round(70)} bgColor="#ED4E67" width={'100%'}/>
                <div className='numbers'>
                    <p>US$ 0</p>
                    <p>US$ 4000</p>
                </div>
            </div>
            <h4>Description</h4>
            <div className="description">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro laudantium dolorum, aut alias iusto facilis exercitationem. Doloribus voluptates</p>
            </div>
        </div>
    </div>
  )
}

export default EnterpriseProfileInvestor