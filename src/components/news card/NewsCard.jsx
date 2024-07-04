import React from 'react'
import './NewsCard.scss'
import routes from '../../data/routes.json'

function NewsCard({title, description, image, date, enterpriseId, enterpriseName, enterpriseProfileImage, setPage, tags}) {

  const goToEnterprise = () => {
    setPage(routes.enterpriseAsInvestor, enterpriseId)
  }

  return (
    <div className='news-card'>
        <div className="header">
          <div className="enterprise-data" onClick={goToEnterprise}>
            <img src={enterpriseProfileImage}/>
            <p className="enterprise-name">{enterpriseName}</p>
          </div>
            <p className="date">{date}</p>
        </div>
        <div className="content">
            <h3>{title}</h3>
            <div className='image' style={{backgroundImage: 'url('+image+')'}}></div>
            <p>{description}</p>
            {tags && <div className="tags">
              {tags.map((tag, index) => (
                <p className="tag" key={index} onClick={()=>{
                  const route = tag.type === 'enterprise' ? routes.enterpriseAsInvestor : routes.investorAsEnterprise
                  setPage(route, tag.id)
                }}>{tag.name}</p>
              ))}
            </div>}
        </div>
    </div>
  )
}

export default NewsCard