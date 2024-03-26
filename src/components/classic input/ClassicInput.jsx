import React, { useEffect } from 'react'
import './ClassicInput.scss'

function ClassicInput({children, type, placeholder, options}) {
  
  return (
    <div className="classic-input-container">
        <label>{children}</label>
        {(type==="text" || type==="number") && <input placeholder={placeholder} type={type}/>}
        {type==="textarea" && <textarea placeholder={placeholder}/>}
        {type==="select" &&
            <select defaultValue="">
              <option value="" disabled>{placeholder}</option>
              {options.map((op)=>(
                <option value={op} key={op}>{op}</option>
              ))}
            </select>
        }
    </div>
  )
}

export default ClassicInput