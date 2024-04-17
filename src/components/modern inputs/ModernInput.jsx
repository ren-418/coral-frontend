import React from 'react'
import './ModernInput.scss'

function ModernInput({children, type, color, onChange, errorMessage, value, disabled}) {
  return (
    <div className='modern-input-container'>
    <div className="modern-input">
      <input id={children} name={children} type={type} style={{color: color, borderBottom: '2px solid '+color}} required onChange={(element)=>{onChange(element.target.value)}} value={value} autoComplete={type} disabled={disabled} />
      <label style={{color: color}} name={children} htmlFor={children}>{children}</label>
    </div>
    {errorMessage && <span>{errorMessage}</span>}
    </div>

  )
}

export default ModernInput