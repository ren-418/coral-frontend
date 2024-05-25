import React, {useEffect, useState} from 'react'
import './Invest.scss'
import ClassicInput from '../../../../components/classic input/ClassicInput'
import routes from '../../../../data/routes.json'

function Invest({enterpriseData, setOpenPopUp, setPage}) {
  const [investAmount, setInvestAmount] = useState()
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const invest = async () => {
    if(investAmount<enterpriseData.minimumInvestment){
      setMessage("Invest amount should be greater than minimum investment")
      return;
    }
    try {
      setLoading(true)
      setMessage("Loading...")
        const res = await fetch('http://localhost:9090/api/v1/users/invest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sessionToken: localStorage.getItem('sessionToken'),
                enterpriseId: enterpriseData.userId,
                amount: investAmount,
            }),
        });

        if(res.ok){
          setMessage("You have invested $" + investAmount + " in " + enterpriseData.name)
        }
        else{
          setMessage("An error ocurred")
        }
        setLoading(false)
    } catch (error) {
      setLoading(false)
      setMessage("An error ocurred")
    }
  }

  const goToChat = () => {
    setPage(routes.chat)
  }

  const close = () => {
    setOpenPopUp(false)
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
            <ClassicInput label='Investment amount' type='number' placeholder={"$" + enterpriseData.minimumInvestment} onChange={setInvestAmount} value={investAmount} disabled={loading}>Invest amount</ClassicInput>
            {message !== "" && <p>{message}</p>}
            <button onClick={invest} className='main-button' disabled={loading}>Invest</button>
            <button onClick={close} className='close-button'>Close</button>
          </>
        }
        </div>
      </div>
  )
}

export default Invest