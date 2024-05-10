import React, {useEffect, useState} from 'react'
import './Invest.scss'
import ClassicInput from '../../../components/classic input/ClassicInput'

function Invest({enterpriseId}) {
  const [investAmount, setInvestAmount] = useState(0)
  const [enterpriseData, setEnterpriseData] = useState({})

  useEffect(() => {
    fetchEnterpriseData()
  }
  , [])

  const fetchEnterpriseData = async () => {
    try {
        const res = await fetch('http://localhost:9090/api/v1/users/enterprise/' + enterpriseId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sessionToken: localStorage.getItem('sessionToken')
            }),
        });

        const resJson = await res.json();

        if(res.ok){
            setEnterpriseData(resJson);
            console.log(resJson)
        }
        else{
            console.log("Error")
        }
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <>
      { enterpriseData.enterpriseType === "Custom" &&
      <div className="custom-invest">
        <ClassicInput label='Investment amount' type='number' placeholder='Invest amount' onChange={setInvestAmount} value={investAmount}>Invest amount</ClassicInput>
        <button>Invest</button>
      </div>
      }

      { enterpriseData.enterpriseType === "Community" &&
      <div className="community-invest">
        <ClassicInput label='Investment amount' type='number' placeholder='Invest amount' onChange={setInvestAmount} value={investAmount}>Invest amount</ClassicInput>
        <button>Invest</button>
      </div>
      }
    </>
    
  )
}

export default Invest