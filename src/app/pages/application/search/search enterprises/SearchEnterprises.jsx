import React, {useState, useEffect} from 'react'
import './SearchEnterprises.scss'
import { FaSearch } from "react-icons/fa";
import Areas from '../../../../../data/areas.json';
import { MultiSelect } from "react-multi-select-component";

import Countries from '../../../../../data/countries.json'
import PopUp from '../../../../../components/popup/PopUp';
import EnterpriseCard from '../../../../../components/enterprise card/EnterpriseCard';
import routes from '../../../../../data/routes.json'

function SearchEnterprises({setPage}) {

    const [areaList, setAreaList] = useState([]);
    const [locationList, setLocationList] = useState([]);
    const [buttonColors, setButtonColors] = useState([]);
    const [buttonTextColor, setButtonTextColor] = useState([]);
    const [users, setUsers] = useState({});
    const [userName, setUserName] = useState("");
    const [enterpriseType, setEnterpriseType] = useState("");

    const [message, setMessage] = useState({});

    const onSearch = async () => {
        try{
            const res = await fetch('http://localhost:9090/api/v1/search/enterprises', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    enterpriseType: enterpriseType,
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
            setNewMessage("No enterprises with that filters", "error")
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
    <div className='search-enterprises-page'>
        {Object.keys(message).length !== 0 &&
        <PopUp buttonText='Close' close={setMessage}>{message}</PopUp>}
        <div className='searchbar'>
            <input type="text" placeholder='Search for enterprises' value={userName} onChange={(element)=>{setUserName(element.target.value)}}/>
            <button onClick={onSearch}><FaSearch color='white'/></button>
        </div>
        {Object.keys(users).length === 0 ?
        <div className='filters-container'>
            <div className="enterprise-type">
                <div className='check-container'>
                    <div className='input'>
                        <input type="radio" value="Community" checked={enterpriseType === "Community"} onClick={() => setEnterpriseType("Community")} onChange={()=>{}}/>
                        <label>Community Pool</label>
                    </div>
                    <p>Join others in investing on an ever-growing coral</p>
                </div>
                <div className='check-container'>
                    <div className='input'>
                        <input type="radio" value="Custom" checked={enterpriseType === "Custom"} onClick={() => setEnterpriseType("Custom")} onChange={()=>{}}/>
                        <label>Custom Deals</label>
                    </div>
                    <p>Invest big on your dream coral</p>
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
        <div className="enterprises-container">
            {users.map((user, index) => (
                <EnterpriseCard setPage={setPage} key={index} enterpriseData={user}/>
            ))}
        </div>}
    </div>
  )
}

export default SearchEnterprises