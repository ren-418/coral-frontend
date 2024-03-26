import React, { useState } from 'react';
import './CreateInvestor.scss'
import ProfilePic from '../../../imgs/global/default-pp.png'
import ClassicInput from '../../../components/classic input/ClassicInput'
import Areas from '../../../data/areas.json'

function CreateInvestor() {
  //AREAS VARIABLES
  const [areaList, setAreaList] = useState([]);
  const [buttonColors, setButtonColors] = useState([]);
  const [buttonTextColor, setButtonTextColor] = useState([]);

  //Change the color of the button when clicked (area of interest)
  function areaCheck(area, index) {
    if(areaList.includes(area)) {
      const updatedList = areaList.filter(item => item !== area);
      setAreaList(updatedList);
      const updatedColors = {
        ...buttonColors,
        [index]: '#D9D9D9'
      };

      setButtonColors(updatedColors);
      const updatedTextColor = {
        ...buttonTextColor,
        [index]: 'black'
      };

      setButtonTextColor(updatedTextColor);
    }
    else {
      const updatedList = [...areaList, area];
      setAreaList(updatedList);

      const updatedColors = {
        ...buttonColors,
        [index]: '#ED4E67'
      };
      setButtonColors(updatedColors);

      const updatedTextColor = {
        ...buttonTextColor,
        [index]: 'white'
      };
      setButtonTextColor(updatedTextColor);
    }
  }

  return (
    <div className='create-investor-container'>
        <div className='banner'>
            <div className='image-input'>
                <img src={ProfilePic}/>
                <div className="input-container">
                  <input type="file" name="profile-pic" accept=".png,.jpeg,.jpg"/>
                </div>
            </div>   
        </div>
        <section>
          <div className="input-name">
            <ClassicInput type='text' placeholder="Full name">Name*</ClassicInput>
          </div>
          <div className="input-about-me">
            <ClassicInput type='textarea' placeholder="Tell people about you">About me*</ClassicInput>
          </div>
          <div className="input-country-container">
            <ClassicInput type='select' placeholder="Select your country" options={["Argentina", "Tucuman"]}>Country*</ClassicInput>
          </div>
          <div className="areas-container">
            <label className='label-areas'>Areas of interest*</label>
            <div className='areas-of-interest'>
              {Areas.map((area, index) => (
                <div key={index} className="button-container">
                  <button key={index} style={{backgroundColor: buttonColors[index], color: buttonTextColor[index]}} className='area-button' onClick={() => areaCheck(area.name, index)}>{area.name}</button>
                </div>
              ))}
            </div>
          </div>
          <div className='investment-range-container'>
            <label className='label-investment-range'>Investment range*</label>
            <p>How much are you willing to invest?</p>
              <div className='investment-inputs'>
                <ClassicInput type='number' placeholder="From">From*</ClassicInput>
                <ClassicInput type='number' placeholder="To">To*</ClassicInput>
              </div>
          </div>
        </section>
    </div>
  )
}

export default CreateInvestor