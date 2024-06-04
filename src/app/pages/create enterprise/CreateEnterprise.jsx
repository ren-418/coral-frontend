import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CreateEnterprise.scss'
import ProfilePic from '../../../imgs/global/default-pp.png'
import ClassicInput from '../../../components/classic input/ClassicInput'
import Areas from '../../../data/areas.json'
import Countries from '../../../data/countries.json'
import PopUp from '../../../components/popup/PopUp';
import routes from '../../../data/routes.json'

function CreateEnterprise({enterpriseData={name:null, description:null, location:null, enterpriseType:null, goal:null, minimumInvestment:null, totalProfitReturn:null, areas:null, profileImage:null}, firstLogin, setPage}) {

  // SLIDER
  const [slider, setSlider] = useState(false);

  //Data
  const [name, setName] = useState(enterpriseData.name ? enterpriseData.name : '');
  const [aboutMe, setAboutME] = useState(enterpriseData.description ? enterpriseData.description : '');
  const [country, setCountry] = useState(enterpriseData.location ? enterpriseData.location : '');
  const [investmentType, setInvestmentType] = useState(enterpriseData.enterpriseType ? enterpriseData.enterpriseType : '');

  const [goal, setGoal] = useState(enterpriseData.goal >=0 ? enterpriseData.goal : -1);
  const [minumumInvestment, setMinimumInvestment] = useState(enterpriseData.minimumInvestment >=0 ? enterpriseData.minimumInvestment : -1);
  const [profitReturn, setProfitReturn] = useState(enterpriseData.totalProfitReturn >=0 ? enterpriseData.totalProfitReturn : -1);


  //AREAS VARIABLES
  const [areaList, setAreaList] = useState(enterpriseData.areas ? enterpriseData.areas : []);
  const [buttonColors, setButtonColors] = useState([]);
  const [buttonTextColor, setButtonTextColor] = useState([]);

  // MESSAGE
  const [message, setMessage] = useState({});

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
  
//Image Section

  const [imageBlob, setImageBlob] = useState(enterpriseData.profileImage ? enterpriseData.profileImage : ProfilePic);
  const [imageUrl, setImageUrl] = useState(enterpriseData.profileImage);

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

  //Mesage Section

  function setNewMessage(message, type){
    var newMessage = {}
    newMessage.text = message
    newMessage.type = type
    setMessage(newMessage);
  }

  //Errors Section

  const [errors, setErrors] = useState({
    name: '',
    aboutMe: '',
    country: '',
    areas: '',
    goal: '',
    minimumInvestment: '',
    profitReturn: '',
    image: ''
  });

  function hasErrors(){
    var newErrors = {};
    if (name === ""){
      newErrors.name = 'Insert the name of your enterprise';
    }
    if (aboutMe === ""){
      newErrors.aboutMe = 'Insert a short description for your enterprise';
    }
    if (country === ""){
      newErrors.country = 'Please select the country of the enterprise';
    }
    if (areaList.length === 0){
      newErrors.areas = 'Please select at least one area of interest'
    }
    if(investmentType === ""){
      newErrors.investmentType = 'Please select an investment type'
    }
    if(investmentType === "Community"){
      if (goal == -1){
        newErrors.goal = 'Please insert an investment goal'
      }
      if (goal <= 0 ){
        newErrors.goal = 'Please insert positive numbers in the investment goal'
      }
      if (minumumInvestment < 0){
        newErrors.minimumInvestment = 'Please insert positive numbers in minimum investment'
      }
      if (minumumInvestment == -1){
        newErrors.minimumInvestment = 'Please insert the minimum amount required to invest in your enterprise'
      }
      if (profitReturn < 0){
        newErrors.profitReturn = 'Please insert positive numbers in total profit Return'
      }
      if (profitReturn == -1){
        newErrors.profitReturn = 'Please insert the total profit return for investors'
      }
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

  // Upload Section

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async () => {

    setLoading(true)

    if(!hasErrors()){
      try {
        const res = await fetch('http://localhost:9090/api/v1/users/create-enterprise-profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionToken: localStorage.getItem("sessionToken"),
            profileImage: imageUrl,
            name: name,
            description: aboutMe,
            location: country,
            firstLogin: false,
            areas: areaList,
            enterpriseType: investmentType,
            goal: goal,
            minimumInvestment: minumumInvestment,
            totalProfitReturn: profitReturn
          }),
        });
  
        const resMessage = await res.text();
    
        if (!res.ok) {
          setNewMessage(resMessage, "error");
        } else {
          //Redirect to home and save user id in local storage
          if(firstLogin === true){
            navigate('/');
          }else{
            setPage(routes.profile)
          }
        }
        setLoading(false);
      } catch (error) {
        setNewMessage("An error has occurred, please verify your connection", "error")
        setLoading(false);
      }
    }
    setLoading(false)
  };

  // Investment Types
  const [typeInfo, setTypeInfo] = useState('');

  function typeCheck(type){
    console.log(type)
    if(type === "Community"){
      setInvestmentType("Community")
      setSlider(true)
      setTypeInfo("Get investment from many small investors who contribute to a final investment goal")
    }else if(type === "Custom"){
      setInvestmentType("Custom")
      setSlider(false)
      setTypeInfo("Arrange custom deals with each individual investor")
    }
  }

  const goBack = () => {
    console.log('go back')
    setPage(routes.profile)
}

  return (
    <div className='create-enterprise-container'>
      {Object.keys(message).length !== 0 && 
        <PopUp buttonText='Close' close={setMessage}>{message}</PopUp>
      }
        <div className='banner'>
            {firstLogin === false && <a className='back-button' onClick={goBack}>{'< Back'}</a>}
            <div className='image-input'>
            <img src={imageBlob}/>
                <div className="input-container">
                  <input id="profileImage" type="file" name="profile-pic" accept=".png,.jpeg,.jpg" onChange={handleImageChange}/>
                </div>
            </div>   
        </div>
        <section>
          <div className="input-name">
            <ClassicInput type='text' value={name} placeholder="Name" onChange={setName} errorMessage={errors.name}>Enterprise name*</ClassicInput>
          </div>
          <div className="input-about-me">
            <ClassicInput type='textarea' value={aboutMe} placeholder="Tell people about your enterprise" onChange={setAboutME} errorMessage={errors.aboutMe}>Description*</ClassicInput>
          </div>
          <div className="input-country-container">
            <ClassicInput type='select' value={country} placeholder="Select country" options={Countries.map(country => country.label)} onChange={setCountry} errorMessage={errors.country}>Country*</ClassicInput>
          </div>
          {firstLogin && <div className="areas-container">
            <label className='label-areas'>Areas of development*</label>
            <div className='areas-of-interest'>
              {Areas.map((area, index) => (
                <div key={index} className="button-container">
                  <button key={index} style={{backgroundColor: buttonColors[index], color: buttonTextColor[index]}} className='area-button' onClick={() => areaCheck(area.name, index)}>{area.name}</button>
                </div>
              ))}
            </div>
            {errors.areas != '' && <p className='error-message'>{errors.areas}</p>}
          </div>}
          {firstLogin && <div className='investment-type-container'>
            <div className='investment-type-checks'>
              <p>Comunity Investment</p>
              <div className='check-container'>
                <input type='radio' name='type' value='Community' onClick={(event) => typeCheck(event.target.value)}/>
              </div>
              <p>Custom Investment</p>
              <div className='check-container'>
                <input type='radio' name='type' value='Custom' onClick={(event) => typeCheck(event.target.value)}/>
              </div>
            </div>
          </div>}
          {firstLogin && <p className='info'>{typeInfo}</p>}
          {slider && firstLogin &&
          <div className='community-values'>
            <ClassicInput type='number' placeholder="$USD0" onChange={setGoal} errorMessage={errors.goal} min="0">Goal*</ClassicInput>
            <ClassicInput type='number' placeholder="$USD0" onChange={setMinimumInvestment} errorMessage={errors.minimumInvestment} min="0">Minimum Investment*</ClassicInput>
            <ClassicInput type='number' placeholder="0%" onChange={setProfitReturn} errorMessage={errors.profitReturn} min="0">Total Profit Return for Investors*</ClassicInput>
          </div>
          }
          {errors.image != '' && <p className='error-message'>{errors.image}</p>}
          <button disabled={loading} onClick={onSubmit} className='create-profile-button'>{ firstLogin ? "Create Profile" : "Edit profile"}</button>
        </section>
    </div>
  )
}

export default CreateEnterprise;