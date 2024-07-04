import React, { useEffect, useState } from 'react'
import { jsPDF } from 'jspdf';
import { BiSolidFileExport } from "react-icons/bi";

import './GeneratePdf.scss'

function GeneratePdf({fromDate, toDate}) {
    const [message, setMessage] = useState("")

    const getUsers = async () => {
        try {
            const res = await fetch('http://localhost:9090/api/v1/users/get-activity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionToken: localStorage.getItem('sessionToken'),
                    from: fromDate,
                    to: toDate
                }),
            });

            const resJson = await res.json();

            if(res.ok){
                return resJson;
            }
            else{
                return [];
            }
        } catch (error) {
          return [];
        }
    }


    const generatePdf = async () => {
        getUsers().then((usersFetch) => {
          const usersData = usersFetch.investmentInfo;
          if(usersData.length === 0){
              setMessage("No data to export");
              return;
          }
          else{
            
          }
          console.log(usersData)
          const doc = new jsPDF();
          let total = 0;
          doc.text("REPORT FROM: " + fromDate + " TO: " + toDate, 10, 10)

          for(let i = 0; i < usersData.length; i++){
              doc.text(usersData[i].name + " - US$" + usersData[i].amount, 10, 30 + (i*10))
              total += usersData[i].amount;
          }
          doc.text("TOTAL INVESTED: US$" + total, 10, 40 + (usersData.length*10))
          // Guarda el PDF con el nombre especificado
          doc.save("Coral - Investments report.pdf");
      })};
    
      return (
        <>
          <button className='export' onClick={generatePdf}>Export data</button>
          {message && <p style={{marginTop:0, color: 'red'}}>{message}</p>}
        </>
      );
}

export default GeneratePdf