import React from 'react'
import './ModernInput.scss'

function ModernInput({children, type, color, onChange, errorMessage}) {
  return (
    <div className='modern-input-container'>
    <div className="modern-input">
      <input type={type} style={{color: color, borderBottom: '2px solid '+color}} required onChange={(element)=>{onChange(element.target.value)}}/>
      <label style={{color: color}}>{children}</label>
    </div>
    {errorMessage && <span>{errorMessage}</span>}
    </div>

  )
}

export default ModernInput