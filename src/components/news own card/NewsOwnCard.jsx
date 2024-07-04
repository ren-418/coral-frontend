import React from 'react'
import { RiEditFill } from "react-icons/ri";
import './NewsOwnCard.scss'
import routes from '../../data/routes.json'


function NewsOwnCard({title, image, description, date, editNew, deleteNew, tags, setPage}) {
  return (
    <div className='new-own-card'>
        <button className='edit-btn' onClick={editNew}><RiEditFill/></button>
        <h6>{title}</h6>
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
  )
}

export default NewsOwnCard