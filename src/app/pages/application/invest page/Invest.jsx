import React, {useEffect, useState} from 'react'
import './Invest.scss'
import ClassicInput from '../../../../components/classic input/ClassicInput'
import routes from '../../../../data/routes.json'

function Invest({enterpriseData, setOpenPopUp, setPage}) {
  const [investAmount, setInvestAmount] = useState(0)
  const [success, setSuccess] = useState(false)

  const invest = async () => {
    try {
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

        const resJson = await res.json();

        if(res.ok){
            console.log(resJson)
        }
        else{
            console.log("Error")
        }
    } catch (error) {
        console.log(error)
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

        { /*enterpriseData.enterpriseType === "Community" && !success &&*/
          <>
            <h2>How much do you want to invest?</h2>
            <ClassicInput label='Investment amount' type='number' placeholder='Invest amount' onChange={setInvestAmount} value={investAmount}>Invest amount</ClassicInput>
            <button onClick={invest} className='main-button'>Invest</button>
            <button onClick={close} className='close-button'>Close</button>
          </>
        }

        { success &&
          <>
            <h2>Investment successful</h2>
            <button onClick={close} className='close-button'>Close</button>
          </>
        }

        </div>
      </div>
  )
}

export default Invest