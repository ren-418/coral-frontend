import React from 'react'
import './HorizontalSlider.scss'

function HorizontalSlider({children}) {
  return (
    <div className="horizontal-slider">
        <div className="slider">
            {children}
        </div>
    </div>
  )
}

export default HorizontalSlider