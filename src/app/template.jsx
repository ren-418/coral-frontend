import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'

import './template.scss'
import { useEffect } from 'react'

export default function Template({ children }) {

  useEffect(()=>{
    //Line to prevent keeping the scroll across diferent routes
    window.scrollTo(0,0);
  }, [children])

  return (
    <>
        <Header/>
        <main>
          {children}
        </main>
        <Footer/>
    </>
  )
}