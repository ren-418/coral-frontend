import React, { useEffect } from 'react'
import './ClassicInput.scss'

function ClassicInput({children, type, placeholder, options, onChange, errorMessage, value}) {
  
  return (
    <div className="classic-input-container">
      <div className="classic-input">
          <label>{children}</label>
          {(type==="text" || type==="number") && <input placeholder={placeholder} type={type} onChange={(element)=>{onChange(element.target.value)}} value={value}/>}
          {type==="textarea" && <textarea placeholder={placeholder} onChange={(element)=>{onChange(element.target.value)}} value={value}/>}
          {type==="select" &&
              <select defaultValue="" onChange={(element)=>{onChange(element.target.value)}} value={value}>
                <option value="" disabled>{placeholder}</option>
                {options.map((op)=>(
                  <option value={op.toLowerCase()} key={op.toLowerCase()}>{op}</option>
                ))}
              </select>
          }
      </div>
      {errorMessage && <span>{errorMessage}</span>}
    </div>
  )
}

export default ClassicInput