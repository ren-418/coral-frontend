import React, { useState } from 'react';
import './CreateInvestor.scss'
import ProfilePic from '../../../imgs/global/default-pp.png'
import ClassicInput from '../../../components/classic input/ClassicInput'
import Areas from '../../../data/areas.json'

import Shark from '../../../imgs/global/shark.png'
import Whale from '../../../imgs/global/whale.png'
import Fish from '../../../imgs/global/fish.png'
import Shrimp from '../../../imgs/global/shrimp.png'

function CreateInvestor() {

  const [typeInfo, setTypeInfo] = useState('');

  function typeCheck(type){
    if(type === "shark"){
      setTypeInfo("For agresive investors")
    }else if(type === "whale"){
      setTypeInfo("For big investors")
    }else if(type === "fish"){
      setTypeInfo("For small investors")
    }
    else if(type === "shrimp"){
      setTypeInfo("For small investors")
    }
  }

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
          <div className="input-investment-criteria">
            <ClassicInput type='textarea' placeholder="Tell people about your investment criteria">Investment Criteria*</ClassicInput>
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
                <ClassicInput type='number' placeholder="Min">From*</ClassicInput>
                <ClassicInput type='number' placeholder="Max">To*</ClassicInput>
              </div>
          </div>
          <div className='investment-type-container'>
            <label className='label-investment-type'>Investor type*</label>
            <div className='investment-type-checks'>
              <div className='check-container'>
                <div className="img-container">
                  <img src={Shark}/>
                </div>
                <input type='radio' name='type' value='shark' onClick={(event) => typeCheck(event.target.value)}/>
              </div>
              <div className='check-container'>
                <div className="img-container">
                  <img src={Whale}/>
                </div>
                <input type='radio' name='type' value='whale' onClick={(event) => typeCheck(event.target.value)}/>
              </div>
              <div className='check-container'>
                <div className="img-container">
                  <img src={Fish}/>
                </div>
                <input type='radio' name='type' value='fish' onClick={(event) => typeCheck(event.target.value)}/>
              </div>
              <div className='check-container'>
                <div className="img-container">
                  <img src={Shrimp}/>
                </div>
                <input type='radio' name='type' value='shrimp' onClick={(event) => typeCheck(event.target.value)}/>
              </div>
            </div>
            <p className='info'>{typeInfo}</p>
          </div>
          <button className='create-profile-button'>Create Profile</button>
        </section>
    </div>
  )
}

export default CreateInvestor