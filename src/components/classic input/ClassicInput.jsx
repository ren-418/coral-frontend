import React, { useEffect } from 'react'
import './ClassicInput.scss'

function ClassicInput({children, type, placeholder, options}) {
  return (
    
    <div className="classic-input-container">
        <label>{children}</label>
        {type==="text" && <input placeholder={placeholder} type={type}/>}
        {type==="textarea" && <textArea placeholder={placeholder}/>}
        {type==="select" &&
            <select>
              <option value="" disabled selected>{placeholder}</option>
              {options.map((op)=>(
                <option value={op}>{op}</option>
              ))}
            </select>
        }
    </div>
  )
}

export default ClassicInput