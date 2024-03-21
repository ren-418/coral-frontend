import React from 'react'
import './ModernInput.scss'

function ModernInput({children, type, color, onChange}) {
  return (
    <div className="input-container">
        <input type={type} style={{color: color, borderBottom: '2px solid '+color}} required onChange={onChange}/>
        <label style={{color: color}}>{children}</label>
    </div>
  )
}

export default ModernInput