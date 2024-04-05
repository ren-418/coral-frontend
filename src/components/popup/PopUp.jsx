import React from 'react'
import './PopUp.scss'
import { Link } from 'react-router-dom';

function PopUp({children, buttonText, close, redirectTo}) {
  return (
    <div className='popup-container'>
        <div className='message-pop-up'>
          {children.type === "error" ?
          <>
            <p style={{color: 'red'}}>{children.text}</p>
            <button onClick={()=>{close({})}}>{buttonText}</button>
          </>
          :
          children.type === "success" ?
          <>
            <p style={{color: 'green'}}>{children.text}</p>
            <Link to={redirectTo}>{buttonText}</Link>
          </>
          :
          <>
            <p style={{color: 'black'}}>{children.text}</p>
            <Link onClick={()=>{close({})}}>{buttonText}</Link>
          </>
          }
        </div>
    </div>
  )
}

export default PopUp