import React, { useEffect, useState } from 'react'
import './InvestorProfile.scss'
import ProfileImage from '../../../../../../imgs/global/default-pp.png'
import { FaLocationDot } from 'react-icons/fa6';
import HorizontalSlider from '../../../../../../components/horizontal slider/HorizontalSlider';
import { FaUserEdit } from "react-icons/fa";
import EnterpriseCard from '../../../../../../components/enterprise card/EnterpriseCard';

import { BiSolidFileExport } from "react-icons/bi";

import Shark from '../../../../../../imgs/global/shark.png'
import Whale from '../../../../../../imgs/global/whale.png'
import Fish from '../../../../../../imgs/global/fish.png'
import Shrimp from '../../../../../../imgs/global/shrimp.png'

import GeneratePdf from '../../../../../../components/generate pdf/GeneratePdf';

function InvestorProfile({edit, logout, deleteUser, setPage}) {
    const [exportPopUp, setExportPopUp] = useState(false)
    const [fromDate, setFromDate] = useState('2024-01-01')
    const [toDate, setToDate] = useState('2025-01-01')

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
        const hoy = new Date();
        const dia = hoy.getDate().toString().padStart(2, '0'); // Formato de dos dígitos
        const mes = (hoy.getMonth() + 1).toString().padStart(2, '0'); // Meses en JavaScript van de 0 a 11
        const año = hoy.getFullYear();

        // Formatea la fecha como YYYY-MM-DD
        const fechaFormateada = `${año}-${mes}-${dia}`;
        
        // Establece la fecha en el estado
        setToDate(fechaFormateada);
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

    const closeExportPopUp = () => {
        setExportPopUp(false)
    }

    const openExportPopUp = () => {
        setExportPopUp(true)
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

        {exportPopUp &&
        <div className='pop-up-export'>
            <div className='pop-up-content'>
                <h2>Export your investments data?</h2>
                <div className="time-fiter">
                    <div style={{display: 'flex', flexDirection: 'column', width: '45%'}}>
                        <label name="from-date">From:</label>
                        <input type="date" id="start" name="from-date" value={fromDate} min="2000-01-01" max="2030-01-01" onChange={(e)=>{setFromDate(e.target.value)}}/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', width: '45%'}}>
                        <label name="to-date">To:</label>
                        <input type="date" id="end" name="to-date" value={toDate} min="2000-01-01" max="2030-01-01" onChange={(e)=>{setToDate(e.target.value)}}/>
                    </div>
                </div>
                <div className='buttons'>
                    <GeneratePdf fromDate={fromDate} toDate={toDate}>Export data</GeneratePdf >
                    <button className='cancel' onClick={closeExportPopUp}>Cancel</button>
                </div>
            </div>
        </div>
        }

        <div className='investor-data'>
            <div className="export-pdf">
                <button onClick={openExportPopUp} style={{border: 'none', borderRadius: '5px'}}><BiSolidFileExport color='rgba(0, 0, 0, 0.5)' size={30}/></button>
            </div>
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