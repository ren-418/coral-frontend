import { useEffect } from 'react'
import Header from '../../../components/header/Header'
import Footer from '../../../components/footer/Footer'
import './template.scss'

function Template({ children, selected, setPage, userType, hasNotificationsToRead}) {

  useEffect(()=>{
    //Line to prevent keeping the scroll across diferent routes
    window.scrollTo(0,0);
  }, [children])

  return (
    <>
        <Header setPage={setPage} userType={userType} hasNotificationsToRead={hasNotificationsToRead}/>
        <main className='app-main'>
          {children}
        </main>
        <Footer selected={selected} setPage={setPage} userType={userType}/>
    </>
  )
}

export default Template