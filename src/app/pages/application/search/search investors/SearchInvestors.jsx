import React, {useState, useEffect} from 'react'
import './SearchInvestors.scss'
import { FaSearch } from "react-icons/fa";

import Shark from '../../../../../imgs/global/shark.png'
import Whale from '../../../../../imgs/global/whale.png'
import Fish from '../../../../../imgs/global/fish.png'
import Shrimp from '../../../../../imgs/global/shrimp.png'

import Areas from '../../../../../data/areas.json'

import { MultiSelect } from "react-multi-select-component";

import Countries from '../../../../../data/countries.json'
import PopUp from '../../../../../components/popup/PopUp';
import InvestorCard from '../../../../../components/investor card/InvestorCard';


function SearchInvestors({setPage, setUserId}) {
    const [investorType, setInvestorType] = useState(-1);
    const [areaList, setAreaList] = useState([]);
    const [locationList, setLocationList] = useState([]);
    const [buttonColors, setButtonColors] = useState([]);
    const [buttonTextColor, setButtonTextColor] = useState([]);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState({});
    const [userName, setUserName] = useState("");

    const [message, setMessage] = useState({});

    const onSearch = async () => {
        try{
            const res = await fetch('http://localhost:9090/api/v1/search/investors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    investorType: investorType,
                    areas: areaList,
                    locations: locationList.map(location => location.value),
                    userName: userName
                }),
            });

            const resJson = await res.json();

            if(!res.ok){
                setNewMessage("An error has occurred", 'error');
            }
            else{
                setUsers(resJson);
            }
        }catch(error){
            setNewMessage("No investors with that filters", "error")
        }
    }
    
    function typeCheck(type){
        if(type === "shark"){
          setInvestorType(0)
        }else if(type === "whale"){
          setInvestorType(1)
        }else if(type === "fish"){
          setInvestorType(2)
        }else if(type === "shrimp"){
          setInvestorType(3)
        }
      }
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

      function setNewMessage(message, type){
        var newMessage = {}
        newMessage.text = message
        newMessage.type = type
        setMessage(newMessage);
      }

  return (
    <div className='search-investors-page'>
        {Object.keys(message).length !== 0 &&
        <PopUp buttonText='Close' close={setMessage}>{message}</PopUp>}
        <div className='searchbar'>
            <input type="text" placeholder='Search for investors' value={userName} onChange={(element)=>{setUserName(element.target.value)}}/>
            <button onClick={onSearch}><FaSearch color='white'/></button>
        </div>
        {Object.keys(users).length === 0 ? <div className='filters-container'>
            <div className='investment-type-container'>
                <label className='label-investment-type' name="type">Investor type:</label>
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
            </div>

            <div className="areas-container">
                <label className='label-areas' name="areas">Areas of interest:</label>
                <div className='areas-of-interest'>
                {Areas.map((area, index) => (
                    <div key={index} className="button-container">
                    <button key={index} style={{backgroundColor: buttonColors[index], color: buttonTextColor[index]}} className='area-button' onClick={() => areaCheck(area.name, index)}>{area.name}</button>
                    </div>
                ))}
                </div>
            </div>

            <div className='location-container'>
            <label name="location">Location:</label>
            <MultiSelect
                options={Countries}
                value={locationList}
                onChange={setLocationList}
                labelledBy="location"
            />
            </div>
        </div>
        :
        <div className="investors-container">
            {users.map((user, index) => (
            <InvestorCard key={index} investorData={user} setPage={setPage}/>
            ))}
        </div>}
        
    </div>
  )
}

export default SearchInvestors