import React from 'react'
import './NewsCard.scss'
import routes from '../../data/routes.json'

function NewsCard({title, description, image, date, enterprise, setPage}) {

  const goToEnterprise = () => {
    setPage(routes.enterpriseAsInvestor, enterprise.userId)
  }

  return (
    <div className='news-card'>
        <div className="header">
          <div className="enterprise-data" onClick={goToEnterprise}>
            <img src={enterprise.profileImage}/>
            <p className="enterprise-name">{enterprise.name}</p>
          </div>
            <p className="date">{date}</p>
        </div>
        <div className="content">
            <h3>{title}</h3>
            <div className='image' style={{backgroundImage: 'url('+image+')'}}></div>
            <p>{description}</p>
        </div>
    </div>
  )
}

export default NewsCard