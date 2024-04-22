import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CreateEnterprise.scss'
import ProfilePic from '../../../imgs/global/default-pp.png'
import ClassicInput from '../../../components/classic input/ClassicInput'
import Areas from '../../../data/areas.json'
import PopUp from '../../../components/popup/PopUp';

function CreateEnterprise() {

  //Data
  const [name, setName] = useState('');
  const [aboutMe, setAboutME] = useState('');
  const [country, setCountry] = useState('');
  const [investmentType, setInvestmentType] = useState('');
  const [goal, setGoal] = useState();
  const [minumumInvestment, setMinimumInvestment] = useState();
  const [profitReturn, setProfitReturn] = useState();


  //AREAS VARIABLES
  const [areaList, setAreaList] = useState([]);
  const [buttonColors, setButtonColors] = useState([]);
  const [buttonTextColor, setButtonTextColor] = useState([]);

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
    areas: ''
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
            investmentType: investmentType,
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

  return (
    <div className='create-enterprise-container'>
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
            <ClassicInput type='text' placeholder="Name" onChange={setName} errorMessage={errors.name}>Enterprise name*</ClassicInput>
          </div>
          <div className="input-about-me">
            <ClassicInput type='textarea' placeholder="Tell people about your enterprise" onChange={setAboutME} errorMessage={errors.aboutMe}>Description*</ClassicInput>
          </div>
          <div className="input-country-container">
            <ClassicInput type='select' placeholder="Select country" options={["Argentina", "Tucuman"]} onChange={setCountry} errorMessage={errors.country}>Country*</ClassicInput>
          </div>
          <div className="areas-container">
            <label className='label-areas'>Areas of development*</label>
            <div className='areas-of-interest'>
              {Areas.map((area, index) => (
                <div key={index} className="button-container">
                  <button key={index} style={{backgroundColor: buttonColors[index], color: buttonTextColor[index]}} className='area-button' onClick={() => areaCheck(area.name, index)}>{area.name}</button>
                </div>
              ))}
            </div>
            {errors.areas != '' && <p>{errors.areas}</p>}
          </div>
          <button disabled={loading} onClick={onSubmit} className='create-profile-button'>Create Profile</button>
        </section>
    </div>
  )
}

export default CreateEnterprise;