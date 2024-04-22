import React from 'react'
import './InvestorCard.scss'

function InvestorCard({name, location, investorType, id, description, image, areas}) {
  return (
    <div className='investor-card'>
        <div className='col1'>
            <img src={image} alt="pfp"/>
            <p>Areas of interest</p>
            {areas.map((area, index) => (
                <div key={index} className='area'>{area}</div>
            ))}
        </div>
        <div className='col2'>
            <h2>{name}</h2>
            <p>{description}</p>
            <p>{location}</p>
        </div>
    </div>
  )
}

export default InvestorCard