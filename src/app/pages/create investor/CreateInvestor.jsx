import React from 'react'
import './CreateInvestor.scss'
import ProfilePic from '../../../imgs/global/default-pp.png'
import ClassicInput from '../../../components/classic input/ClassicInput'

function CreateInvestor() {
  return (
    <div className='create-investor-container'>
        <div className='banner'>
            <div className='image-input'>
                <img src={ProfilePic}/>
                <div className="input-container">
                  <input type="file" name="profile-pic" id="profilePic" />
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
          <ClassicInput type='select' placeholder="Select your country*" options={["Argentina", "Tucuman"]}>Country*</ClassicInput>
          </div>
        </section>
    </div>
  )
}

export default CreateInvestor