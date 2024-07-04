import React, {useEffect, useState} from 'react'
import './Invest.scss'
import ClassicInput from '../../../../components/classic input/ClassicInput'
import routes from '../../../../data/routes.json'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

function Invest({enterpriseData, setOpenPopUp, setPage}) {
  initMercadoPago('APP_USR-1eafd81c-a9d1-4e87-a660-3d3d71ee4d8b');
  const [investAmount, setInvestAmount] = useState()
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [preferenceId, setPreferenceId] = useState()
  const [privacity, setPrivacity] = useState(true)

  const createPreference = async () => {
    if(investAmount<enterpriseData.minimumInvestment || investAmount === undefined || investAmount === ""){
      setMessage("Invest amount should be greater than minimum investment")
      return;
    }
    if(investAmount > enterpriseData.goal - enterpriseData.totalCollected){
      setMessage("Invest amount should be less than the remaining amount")
      return;
    }
    try {
      const res = await fetch('http://localhost:9090/api/v1/users/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionToken: localStorage.getItem('sessionToken'),
          enterpriseId: enterpriseData.userId,
          title: enterpriseData.name,
          price: investAmount,
          quantity: 1,
          isPublic: privacity
        }),
      });
      const preference = await res.json();
      if(res.ok){
        return preference.id;
      }
    } catch (error) {
      console.log(error.message)
      return null;
    }
  }

  const set_preference = async () => {
    const preferenceId = await createPreference();
    if(preferenceId !== null){
      setPreferenceId(preferenceId);
    }
  }

  const goToChat = () => {
    setPage(routes.chat, enterpriseData.userId)
  }

  const close = () => {
    setOpenPopUp(false)
  }

  const togglePrivacity = () => {
    setPrivacity(!privacity)
  }


  return (
    <div className="invest-pop-up">
      <div className="box">
        { enterpriseData.enterpriseType === "Custom" && !success &&
          <>
              <h2>To invest in a custom enterprise you should contact with the enterprise</h2>
              <button onClick={goToChat} className='main-button'>Send a message</button>
              <button onClick={close} className='close-button'>Close</button>
          </>
        }

        { enterpriseData.enterpriseType === "Community" && !success &&
          <>
            <h2>How much do you want to invest?</h2>
            <p>Minimum invest: ${enterpriseData.minimumInvestment}</p>
            <p style={{marginTop: '10px'}}>Max invest: ${enterpriseData.goal - enterpriseData.totalCollected}</p>
            <ClassicInput label='Investment amount' type='number' placeholder={"$" + enterpriseData.minimumInvestment} onChange={setInvestAmount} value={investAmount} disabled={loading}>Invest amount</ClassicInput>
            {message !== "" && <p style={{color: 'red'}}>{message}</p>}
            <div className="row">
              <p>Notify other investors?</p>
              <div className='toggle-bg' onClick={togglePrivacity}>
                <div className={!privacity ? "toggle-button off" : "toggle-button on"}></div>
              </div>
            </div>
            {!preferenceId && <button onClick={set_preference} className='main-button' disabled={loading}>Invest</button>}
            {preferenceId &&
            <div className='mp-btn'>
              <Wallet initialization={{ preferenceId: preferenceId, redirectMode: "self"}} customization={{ texts:{ valueProp: 'smart_option'}}} />
            </div> }
            <button onClick={close} className='close-button'>Close</button>
          </>
        }
        </div>
      </div>
  ) 
}

export default Invest