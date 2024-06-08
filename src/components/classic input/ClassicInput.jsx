import React, { useEffect } from 'react'
import './ClassicInput.scss'

function ClassicInput({children, type, placeholder, options, onChange, errorMessage, value, disabled}) {

  return (
    <div className="classic-input-container">
      <div className="classic-input">
          <label>{children}</label>
          {(type==="text" || type==="number") && <input className={errorMessage ? "error" : ""} placeholder={placeholder} type={type} onChange={(element)=>{onChange(element.target.value)}} value={value} disabled={disabled}/>}
          {type==="textarea" && <textarea className={errorMessage ? "error" : ""} placeholder={placeholder} onChange={(element)=>{onChange(element.target.value)}} value={value} disabled={disabled}/>}
          {type==="select" &&
            <select defaultValue="" onChange={(element)=>{onChange(element.target.value)}} value={value} disabled={disabled} className={errorMessage ? "error" : ""}>
              <option value="" disabled>{placeholder}</option>
              {options.map((op)=>(
                <option value={op.toLowerCase()} key={op.toLowerCase()}>{op}</option>
              ))}
            </select>
          }
          {type==="select-multiple" &&
            <select multiple onChange={(element)=>{onChange([...value, element.target.value])}} disabled={disabled} value={value} className={errorMessage ? "error" : ""}>
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