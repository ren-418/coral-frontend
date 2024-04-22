import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CreateInvestor.scss'
import ProfilePic from '../../../imgs/global/default-pp.png'
import ClassicInput from '../../../components/classic input/ClassicInput'
import Areas from '../../../data/areas.json'

import Shark from '../../../imgs/global/shark.png'
import Whale from '../../../imgs/global/whale.png'
import Fish from '../../../imgs/global/fish.png'
import Shrimp from '../../../imgs/global/shrimp.png'

import PopUp from '../../../components/popup/PopUp';

function CreateInvestor() {

  const [typeInfo, setTypeInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [aboutMe, setAboutME] = useState('');
  const [invCritera, setInvCritera] = useState('');
  const [country, setCountry] = useState('');
  const [invMin, setInvMin] = useState(-1);
  const [invMax, setInvMax] = useState(-1);
  const [investorType, setInvestorType] = useState(-1);

  const [message, setMessage] = useState({});

  //AREAS VARIABLES
  const [areaList, setAreaList] = useState([]);
  const [buttonColors, setButtonColors] = useState([]);
  const [buttonTextColor, setButtonTextColor] = useState([]);

  const [errors, setErrors] = useState({
    name: '',
    aboutMe: '',
    criteria: '',
    country: '',
    invMin: '',
    invMax: '',
    investorType: '',
    areas: '',
    image: ''
  });

  const [imageBlob, setImageBlob] = useState(ProfilePic);
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageBlob(URL.createObjectURL(file));
            setImageUrl(reader.result);
        };
        reader.readAsDataURL(file);
    }
  };
  
  const navigate = useNavigate();

  function typeCheck(type){
    if(type === "shark"){
      setInvestorType(0)
      setTypeInfo("For agresive investors")
    }else if(type === "whale"){
      setInvestorType(1)
      setTypeInfo("For big investors")
    }else if(type === "fish"){
      setInvestorType(2)
      setTypeInfo("For small investors")
    }else if(type === "shrimp"){
      setInvestorType(3)
      setTypeInfo("For small investors")
    }
  }

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

  function hasErrors(){
    var newErrors = {};
    if (name === ""){
      newErrors.name = 'Insert a name for your account';
    }
    if (aboutMe === ""){
      newErrors.aboutMe = 'Insert a short description';
    }
    if (invCritera === ""){
      newErrors.critera = 'Insert information about the type of enterprises you want to invest in';
    }
    if (country === ""){
      newErrors.country = 'Please select a country of residence';
    }
    if (invMin === -1){
      newErrors.invMin = 'Insert the minimum amount you are willing to invest in an enterprise';
    }
    if (invMax === -1){
      newErrors.invMax = 'Insert the maximum amount you are willing to invest in an enterprise'
    }
    if (investorType === -1){
      newErrors.investorType = 'Please select an investor type'
    }
    if (areaList.length === 0){
      newErrors.areas = 'Please select at least one area of interest'
    }
    if (invMax < invMin){
      newErrors.invMax = 'Maximum investment amount cannot be lower than minimum investment amount'
    }
    if (invMax < 0){
      newErrors.invMin = 'Please insert positive numbers in the investment range'
    }
    if (invMin < 0){
      newErrors.invMax = 'Please insert positive numbers in the investment range'
    }
    if (imageBlob == ProfilePic) {
      newErrors.image = 'Please choose a profile picture'
    }

    setErrors(newErrors);

    if(Object.keys(newErrors).length === 0){
      return false;
    }
    else{
      return true;
    }
  }

  const onSubmit = async () => {

    setLoading(true)

    if(!hasErrors()){
      try {
        const res = await fetch('http://localhost:9090/api/v1/users/create-investor-profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionToken: localStorage.getItem("sessionToken"),
            profilePicture: imageUrl,
            name: name,
            description: aboutMe,
            investmentCriteria: invCritera,
            location: country,
            rangeMin: invMin,
            rangeMax: invMax,
            investorType: investorType,
            firstLogin: false,
            areas: areaList
          }),
        });
  
        const resMessage = await res.text();
    
        if (!res.ok) {
          setNewMessage(resMessage, "error");
        } else {
          //Redirect to home and save user id in local storage
          navigate('/');
        }
        setLoading(false);
      } catch (error) {
        setNewMessage("An error has occurred, please verify your connection", "error")
        setLoading(false);
      }
    }
    setLoading(false)
  };

  function setNewMessage(message, type){
    var newMessage = {}
    newMessage.text = message
    newMessage.type = type
    setMessage(newMessage);
  }

  return (
    <div className='create-investor-container'>
      {Object.keys(message).length !== 0 && 
        <PopUp buttonText='Close' close={setMessage}>{message}</PopUp>
      }
        <div className='banner'>
            <div className='image-input'>
                <img src={imageBlob}/>
                <div className="input-container">
                  <input id="profileImage" type="file" name="profile-pic" accept=".png,.jpeg,.jpg" onChange={handleImageChange}/>
                </div>
            </div>
        </div>
        <section>
          <div className="input-name">
            <ClassicInput type='text' placeholder="Full name" onChange={setName} errorMessage={errors.name}>Name*</ClassicInput>
          </div>
          <div className="input-about-me">
            <ClassicInput type='textarea' placeholder="Tell people about you" onChange={setAboutME} errorMessage={errors.aboutMe}>About me*</ClassicInput>
          </div>
          <div className="input-investment-criteria">
            <ClassicInput type='textarea' placeholder="Tell people about your investment criteria" onChange={setInvCritera} errorMessage={errors.criteria}>Investment Criteria*</ClassicInput>
          </div>
          <div className="input-country-container">
            <ClassicInput type='select' placeholder="Select your country" options={["Argentina", "Tucuman"]} onChange={setCountry} errorMessage={errors.country}>Country*</ClassicInput>
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
            {errors.areas != '' && <p>{errors.areas}</p>}
          </div>
          <div className='investment-range-container'>
            <label className='label-investment-range'>Investment range*</label>
            <p>How much are you willing to invest?</p>
              <div className='investment-inputs'>
                <ClassicInput type='number' placeholder="Min" onChange={setInvMin} errorMessage={errors.invMin} min="0">From*</ClassicInput>
                <ClassicInput type='number' placeholder="Max" onChange={setInvMax} errorMessage={errors.invMax} min="0">To*</ClassicInput>
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
            {errors.investorType != '' && <p>{errors.investorType}</p>}
          </div>
          {errors.image != '' && <p>{errors.image}</p>}
          <button disabled={loading} onClick={onSubmit} className='create-profile-button'>Create Profile</button>
        </section>
    </div>
  )
}

export default CreateInvestor