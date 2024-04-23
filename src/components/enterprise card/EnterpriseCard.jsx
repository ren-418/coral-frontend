import React from 'react'
import './EnterpriseCard.scss'
import { FaLocationDot } from "react-icons/fa6";

import ProgressBar from "@ramonak/react-progress-bar";

function EnterpriseCard({name, location, id, description, image, goal, backgroundColor, minimum, current}) {

  return (
    <div className='enterprise-card' style={{backgroundColor: backgroundColor}}>
        <div className='col1'>
            <img src={image} alt="pfp"/>
            <div className='ranges-container'>
              <div className='goal'><p className='subtitle'>Goal:</p><p className='numbers'>US${goal}</p></div>
              <div className='minimum'><p className='subtitle'>Min invest:</p><p className='numbers'>US${minimum}</p></div>
            </div>
            <div className="progrss-bar">
                <ProgressBar completed={(current/goal)*100} bgColor="#3BAFB7" width={'90%'}/>
            </div>
        </div>
        <div className='col2'>
            <h2>{name[0].toUpperCase() + name.slice(1)}</h2>
            <p className='description'>{description}</p>
            <div className='location-container'>
              <FaLocationDot color='rgba(0, 0, 0, 0.548)'/>
              <p className='location'>{location[0].toUpperCase() + location.slice(1)}</p>
            </div>
            <button>View proyect</button>
        </div>
    </div>
  )
}

export default EnterpriseCard