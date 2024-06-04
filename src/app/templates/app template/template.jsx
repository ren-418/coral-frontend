import { useEffect } from 'react'
import Header from '../../../components/header/Header'
import Footer from '../../../components/footer/Footer'
import './template.scss'

function Template({ children, title, selected, setPage, userType}) {

  useEffect(()=>{
    //Line to prevent keeping the scroll across diferent routes
    window.scrollTo(0,0);
  }, [children])

  return (
    <>
        <Header/>
        <main className='app-main'>
          {children}
        </main>
        <Footer selected={selected} setPage={setPage} userType={userType}/>
    </>
  )
}

export default Template